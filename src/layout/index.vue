<template>
  <div :class="classObj" class="app-wrapper">
      <div class="fixed-header">
        <div class="header-left-warp">
           <img src="../assets/images/head-img.jpg" alt="头像" class="head-img">
            <p class="title">
          <!-- Xiao-Admin系统 -->
        </p>
        </div>
        <p class="quit" @click="quit">退出</p>
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
import Sidebar from './components/Sidebar/index.vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter()
const classObj = computed(() => { })
const quit = () => {
  localStorage.removeItem('user');
  router.push('/login')
}
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
.quit {
  cursor: pointer;
}
.content-warp {
  display: flex;
  padding-top: 60px;
  min-height: calc(100vh - 60px);
  // overflow: hidden;
  .main-container {
    flex: 1;
    padding: 20px 20px 20px 240px;
    overflow-y: auto;
   min-height: calc(100vh - 60px);
    //  overflow: hidden;
  }
}
.main-container {
  overflow: hidden;
}
</style>
