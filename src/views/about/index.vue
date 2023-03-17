<template>
  <section class="analysis-warp animated zoomIn fadeOutUpBig">
    <el-card class="box-card">
    Xiao Admin 是一个基于 Vue3、Vite、Element-plus、TypeScript 的中后台解决方案，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你。
  </el-card>
    <div>
      <button @click="isShow = !isShow">显示/隐藏</button></div>
    <transition enter-active-class="animate__animated animate__fadeInDown"
                leave-active-class="animate__animated animate__flipInY">
      <h2 class="title" v-if="isShow">Hello World</h2>
    </transition>
  </section>
</template>
<script lang="ts" setup>
import {ref , onMounted} from 'vue'
import 'animate.css/animate.min.css'
const isShow = ref(true)
const animatateChange = () => {
  setTimeout(() => {
    isShow.value = true;
  },2000)
}
onMounted(() => {
  animatateChange()
})
</script>
<style>
 .title {
    display: inline-block;
    transform: translateX(100px)
  }

  .animate__flipInY {
    animation-direction: alternate-reverse;
  } 
  </style>