import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx({})],
  server: {
    proxy: {
      '/curflow': {
        target: 'http://localhost:8080/api/workflow', // 目标服务器地址
        changeOrigin: true, // 是否改变请求头中的源地址
        rewrite: path => path.replace(/^\/curflow/, '') // 将请路径从 /curflow 开始转换为目标服务器上的路径
      }
    }
  }
})
