<!-- 封装消息提示插件 -->
<template>
  <Transition enter-active-class="animate__animated animate__backInDown"
    leave-active-class="animate__animated animate__backInDown">
    <div v-if="isShow" class="message">{{ tipText }}</div>
  </Transition>
</template>
 
<script setup lang='ts'>
import { ref, reactive } from 'vue';
let isShow = ref<boolean>(false)
let tipText = ref<string | number>('默认提示内容')
const show = (str: string | number, time: number = 3000) => {
  tipText.value = str
  isShow.value = true
  // 2 秒后自动关闭
  setTimeout(() => {
    isShow.value = false
  }, time);
}
const hide = () => isShow.value = false
// 将组件内部的方法导出，方便外部访问
defineExpose({
  show,
  hide
})
</script>
 
<style lang='scss' scoped>
.message {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  border-radius: 5px;
  background-color: rgba(200, 217, 217, 0.5);
  position: fixed;
  text-align: center;
  top: 50%;
  left: 50%;
  // transform: translateX(-50%);
}
</style>