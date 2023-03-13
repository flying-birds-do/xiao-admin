<template>
  <div :class="classObj" class="app-wrapper">
      <div class="fixed-header">
        <div class="header-left-warp">
           <img src="../assets/images/head-img.jpg" alt="头像" class="head-img">
            <p class="title">
          微型vue3 + vite + ts 后台管理系统
        </p>
        </div>
        <p class="quit">退出</p>
      </div>
      <div class="content-warp">
      <Sidebar class="sidebar-container" />
      <div class="main-container">
       <RouterView></RouterView>
      <!-- <AppMain></AppMain> -->
      </div>
      </div>

  </div>
</template>
<script setup lang="ts">
import { ref,computed } from 'vue';
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
const classObj = computed(() => { })
const fixedHeader = ref({})
</script>

<style lang="scss" scoped>
.fixed-header {
  height: 60px;
  background: #fafafa;
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  .header-left-warp {
    display: flex;
  }
  .title {
    font-weight: bolder;
    font-size: 16px;
  }
  p {
    line-height: 60px;
    margin: 0;
    padding: 0 20px;
  }
  .head-img {
    width: 60px;
    height:60px;
  }
}
.sidebar-container {
  width: 200px;

}
.content-warp {
  display: flex;
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  .main-container {
    flex: 1;
    padding: 20px 20px 20px 220px;
    overflow-y: auto;
   min-height: calc(100vh - 60px);
  }
}
</style>
