<template>
  <div class="container flex-column">
    <div class="img-list flex-row">
      <div class="img-item flex-column">
        <img ref="originRef" src="/test.png" class="img" />
        <span class="test">原图</span>
      </div>
      <div class="img-item flex-column">
        <img ref="imageRef" :src="imageUrl" class="img" />
        <span class="test">{{ imageText }}</span>
      </div>
    </div>

    <div class="btns flex-row">
      <button @click="changeStatus(true)">gray</button>
      <button @click="changeStatus(false)">beauty</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import request from './service'
import LocalCache from './utils/cache'

export default defineComponent({
  setup() {
    const originRef: Ref<HTMLImageElement | null> = ref(null)
    const imageRef: Ref<HTMLImageElement | null> = ref(null)
    const status = ref(true)
    const imageUrl = ref(LocalCache.getCache('imageUrl'))
    const imageText = ref(LocalCache.getCache('imageText'))
    const getOptions = (type: string) => {
      const json = {
        name: 'deal_img',
        version: 2,
        correlationId: 'my_deal_img_workflows',
        input: {
          name: 'test.png',
          type: type
        }
      }
      const headers = {
        'Content-Type': 'application/json' // 设置 Content-Type 请求头
      }
      const options = {
        method: 'POST',
        data: json,
        headers: headers, // 传递请求头至服务器
        accept: 'text/plain',
        validateStatus: function () {
          // 让axios接收所有状态码的响应，否则部分状态码可能会被处理异常
          return true
        }
      }
      return options
    }
    onMounted(() => {
      if (
        !LocalCache.getCache('imageUrl') ||
        !LocalCache.getCache('imageText')
      ) {
        LocalCache.setCache('imageUrl', '/test_gray.png')
        LocalCache.setCache('imageText', 'gray')
        imageUrl.value = LocalCache.getCache('imageUrl')
        imageText.value = LocalCache.getCache('imageText')
      }
    })
    const changeStatus = async (val: boolean) => {
      if (val) {
        status.value = val
        imageUrl.value = '/test_gray.png'
        imageText.value = 'gray'
        LocalCache.setCache('imageUrl', '/test_gray.png')
        LocalCache.setCache('imageText', 'gray')

        request<any>(getOptions('gray'))
          .then(data => {
            console.log(data)
            setTimeout(() => {
              location.reload()
            }, 2000)
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        status.value = val
        imageUrl.value = '/test_beauty.png'
        imageText.value = 'beauty'
        LocalCache.setCache('imageUrl', '/test_beauty.png')
        LocalCache.setCache('imageText', 'beauty')
        request<any>(getOptions('beauty'))
          .then(data => {
            console.log(data)
            setTimeout(() => {
              location.reload()
            }, 2000)
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
    return {
      status,
      imageRef,
      originRef,
      imageUrl,
      imageText,
      changeStatus
    }
  }
})
</script>

<style scoped>
.container {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-column {
  display: flex;
  flex-direction: column;
}
.img-item {
  flex: 1;
}
.img {
  height: 280px;
  padding: 10px;
  margin: 10px;
  border: 1px dashed black;
}
.btns button {
  margin: 30px 25px;
}
.btns button:foucs {
  outline: none;
}
</style>
