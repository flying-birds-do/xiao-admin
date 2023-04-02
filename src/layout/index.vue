<template>
  <div :class="classObj" class="app-wrapper">
      <div class="fixed-header">
        <div class="header-left-warp">
           <!-- <img src="../assets/images/11.png" alt="头像" class="head-img"> -->
            <p class="title-sytle">
          Xiao-Admin
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
    padding: 0 10px;
  }
  .head-img {
    width: 80px;
    // height:40px;
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
    padding: 20px 20px 20px 220px;
    overflow-y: auto;
   min-height: calc(100vh - 60px);
    //  overflow: hidden;
  }
}
.main-container {
  overflow: hidden;
}
.title-sytle {
  background-image: linear-gradient(to right, #00C6FF, #b901af);
  -webkit-background-clip: text; /* 背景被裁剪成文字的前景色 */
-webkit-text-fill-color: transparent; /* 文字填充颜色变透明 */ 
font-family:"Trebuchet MS", Arial, Helvetica, sans-serif;
font-size: 34px;  
font-weight: bolder;
}
</style>
