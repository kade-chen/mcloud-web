<template>
  <div>
    <h1>实时语音输入并传输到后端</h1>
    <button @click="startRecording" :disabled="isRecording">开始录音</button>
    <button @click="stopRecording" :disabled="!isRecording">停止录音</button>
    <div v-if="errorMessage" class="error">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-if="transcript">
      <h2>识别结果：</h2>
      <p>{{ transcript }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false, // 是否正在录音
      mediaRecorder: null, // MediaRecorder 实例
      audioChunks: [], // 音频片段
      socket: null, // WebSocket 连接
      transcript: '', // 保存后端返回的识别结果
      errorMessage: '', // 错误信息
    };
  },
  methods: {
    // 开始录音
    async startRecording() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);
        this.audioChunks = []; // 清空之前的音频数据
        this.isRecording = true;

        // 设置每100ms触发一次 ondataavailable
        this.mediaRecorder.start(100); // 每100ms触发一次

        // 当有音频数据可用时，将数据保存到 audioChunks
        this.mediaRecorder.ondataavailable = (event) => {
          this.audioChunks.push(event.data);
          console.log('录制到的音频数据块大小：', event.data.size);
        };

        console.log('开始录音');
        
        // 初始化 WebSocket 连接
        this.socket = new WebSocket('ws://localhost:8010/mcenter/api/v1/SpeechToTextV2/ws');
        this.socket.onopen = () => {
          console.log('WebSocket 连接成功');
          this.transcript = ''; // 清空上次的识别结果
        };
        this.socket.onerror = (error) => {
          console.error('WebSocket 错误:', error);
          this.errorMessage = 'WebSocket 连接错误，请检查服务器。';
        };
        this.socket.onclose = () => {
          console.log('WebSocket 连接关闭');
        };
        this.socket.onmessage = (event) => {
          let message = event.data;
          if (typeof message !== 'string') {
            try {
              message = new TextDecoder().decode(message);
            } catch (err) {
              console.error('WebSocket 收到非文本数据:', err);
              return;
            }
          }
          console.log('收到后端数据:', message);
          this.transcript += message; // 累加识别结果
        };
      } catch (err) {
        this.errorMessage = '无法访问麦克风，请检查权限设置。';
      }
    },

    // 停止录音并发送数据
    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
        this.mediaRecorder.stop();
        this.isRecording = false;
        console.log('停止录音');

        // 查看音频片段的大小
        console.log('音频片段总数：', this.audioChunks.length);
        console.log('音频片段大小：', this.audioChunks.reduce((acc, chunk) => acc + chunk.size, 0));

        // 合并音频数据并发送
        this.sendAudioData();
      }
    },

    // 发送音频数据给后端
    sendAudioData() {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        // 如果没有数据，返回
        if (this.audioChunks.length === 0) {
          console.log('没有音频数据可发送');
          return;
        }

        // 创建一个 Blob 对象，将音频数据传输为 WAV 格式
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });

        // 打印 Blob 对象及其大小
        console.log('音频数据（Blob）：', audioBlob);
        console.log('音频数据大小：', audioBlob.size);

        // 发送 Blob 数据
        this.socket.send(audioBlob);
      }
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
}
.error {
  color: red;
  font-weight: bold;
}
</style>