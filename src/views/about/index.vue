<template>
  <section class="analysis-warp animated zoomIn fadeOutUpBig">
    <el-card class="box-card">
      Xiao Admin 是一个基于 Vue3、Vite、Element-plus、TypeScript
      的中后台解决方案，它使用了最新的前端技术栈，并提炼了典型的业务模型，页面，包括二次封装组件、动态菜单、权限校验、粒子化权限控制等功能，它可以帮助你快速搭建企业级中后台项目，相信不管是从新技术使用还是其他方面，都能帮助到你。
    </el-card>
    <h2>项目中使用的技术</h2>
    <transition enter-active-class="animate__animated animate__fadeInDown"
      leave-active-class="animate__animated animate__flipInY">
        <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <el-image style="width: 100px; height: 100px" :src="url" :fit="fit" />
    </div>
  </div>
    </transition>
  </section>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import 'animate.css/animate.min.css'
const isShow = ref(true)
interface ListItem {
  imgUrl: string
  name: string
}
const fits = ['vue3', 'vite','element-plus', 'pinia','vue-router','vue3-video-play','ts', 'pnpm', 'animate','aplayer','axios','echarts','高德地图','v-md-editor','vue-clipboard3']
const url =
  'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

const animatateChange = () => {
  setTimeout(() => {
    isShow.value = true;
  }, 2000)
}
onMounted(() => {
  animatateChange()
})
</script>
<style lang="scss" scoped>
.title {
  display: inline-block;
  transform: translateX(100px)
}

.animate__flipInY {
  animation-direction: alternate-reverse;
}
.analysis-warp {
  width: 100%;
  text-align: left;
  padding:20px;
}
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
  border-right: none;
  font-size: 24px;
  font-weight: bold;
  color:black;
  margin-bottom:20px;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
   color:black;
  margin-bottom: 20px;
  &:hover {
   color:red;
   cursor: pointer;
  }
}
</style>