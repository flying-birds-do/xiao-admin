<template>
  <section class="side-left-warp">
    	<!-- element-plus 组件 -->
    <el-menu
      default-active="1"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
       router
      unique-opened
    >
      <MenuItem :menuList="routes" />
    </el-menu>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import MenuItem from './MenuItem.vue'
let router = useRouter()
const routes = router.options.routes
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  router.push({name:key})
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const sideBarNavList = ref([
  {
    path: '/',
    title: '仪表盘',
    icon: 'icon-date',
    children: [
      {
        path: '/',
        title: '分析页',
        icon: 'icon-date',
      },
      {
        path: '/',
        title: '工作台',
        icon: 'icon-date',
      }
    ]
  }
])
</script>
<style scoped lang="scss">
.side-left-warp {
  background: #545c64;
  position: fixed;
  left: 0;
  top:60px;
  height: 100%;
  width: 200px;

}
</style>
