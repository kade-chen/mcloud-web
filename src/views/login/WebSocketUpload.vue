<template>
  <div>
    <h1>上传音频并传输到后端</h1>
    <input type="file" @change="onFileChange" accept="audio/wav" />
    <button @click="sendAudioData" :disabled="!audioData">发送音频数据</button>
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
      audioData: null, // 存储音频文件数据
      socket: null, // WebSocket 连接
      transcript: '', // 保存后端返回的识别结果
      errorMessage: '', // 错误信息
      chunkSize: 1024 * 150000000 // 每个数据块的大小（8 KB）
    }
  },
  methods: {
    // 选择音频文件并读取为 ArrayBuffer
    onFileChange(event) {
      const file = event.target.files[0]
      if (file && file.type === 'audio/wav') {
        this.readFile(file)
      } else {
        this.errorMessage = '请选择一个有效的 WAV 文件'
      }
    },

    // 读取文件并处理
    readFile(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target.result
        this.audioData = new Uint8Array(arrayBuffer)
        console.log('音频数据已读取:', this.audioData)
      }
      reader.onerror = () => {
        this.errorMessage = '读取文件失败，请重试。'
      }
      reader.readAsArrayBuffer(file)
    },

    // 分块发送音频数据
    sendAudioData() {
      if (!this.audioData) {
        this.errorMessage = '请先选择音频文件。'
        return
      }

      // 如果已有 WebSocket 连接，先关闭
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.close()
        this.socket = null
      }

      // 初始化 WebSocket 连接
      this.socket = new WebSocket('ws://localhost:8010/mcenter/api/v1/SpeechToTextV2/ws')

      this.socket.onopen = () => {
        console.log('WebSocket 连接成功')
        this.transcript = '' // 清空上次的识别结果
        this.sendChunks() // 开始分块发送音频数据
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket 错误:', error)
        this.errorMessage = 'WebSocket 连接错误，请检查服务器。'
      }

      this.socket.onclose = () => {
        console.log('WebSocket 连接关闭')
      }

      this.socket.onmessage = (event) => {
        let message = event.data
        if (typeof message !== 'string') {
          try {
            message = new TextDecoder().decode(message)
          } catch (err) {
            console.error('WebSocket 收到非文本数据:', err)
            return
          }
        }
        console.log('收到后端数据:', message)
        this.transcript += message // 累加识别结果
      }
    },

    // 分块发送音频数据的方法
    sendChunks() {
      let offset = 0
      const totalSize = this.audioData.length

      const sendNextChunk = () => {
        if (offset >= totalSize) {
          console.log('所有音频数据已发送完毕')
          return
        }

        const chunk = this.audioData.slice(offset, offset + this.chunkSize)
        this.socket.send(chunk)
        offset += this.chunkSize

        console.log('发送音频数据块:', chunk)
        setTimeout(sendNextChunk, 50) // 等待 50ms 后发送下一个块
      }

      sendNextChunk() // 开始分块发送
    }
  }
}
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
