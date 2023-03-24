<template>
  <section class="toast-warp">
    <el-button @click="showToast">点击提示</el-button>
    
  </section>
</template>
<script setup>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// 使用自定义的全局消息提示插件
const showToast = () => {
instance?.proxy?.$toast.show('我是你想要的提示信息')
  
}
</script>