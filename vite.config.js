import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/mcenter/api/v1': {
        target: 'http://127.0.0.1:8010'
      },
      // '/cc': {
      //   target: 'http://127.0.0.1:80101'
      // },
      '/mflow/api/v1/ws': {
        target: 'http://127.0.0.1:8090',
        ws: true
      },
      '/mflow/api/v1': {
        target: 'http://127.0.0.1:8090'
      },
      '/mpaas/api/v1/ws': {
        target: 'http://127.0.0.1:8080',
        ws: true
      },     
      '/mpaas/api/v1': {
        target: 'http://127.0.0.1:8080'
      }
    }
  },

  // 强制预构建插件包
  // optimizeDeps: {
  //   include: [
  //     `monaco-editor/esm/vs/basic-languages/yaml/yaml.contribution`,
  //     `monaco-editor/esm/vs/language/json/json.worker`,
  //     `monaco-editor/esm/vs/language/css/css.worker`,
  //     `monaco-editor/esm/vs/language/html/html.worker`,
  //     `monaco-editor/esm/vs/language/typescript/ts.worker`,
  //     `monaco-editor/esm/vs/editor/editor.worker`
  //   ]
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2017', // 设置目标环境
    lib: {
      entry: './src/main.js', // 入口文件
      name: 'mcloud-web', // 库名称
      formats: ['umd', 'es'] // 输出格式
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
