<template>
  <section class="side-left-warp">
    	<!-- element-plus 组件 -->
    <el-menu
      :default-active="activeNav"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      class="el-menu-vertical-demo"
    
       router
      unique-opened
    >
      <MenuItem :menuList="routes" />
    </el-menu>
  </section>
</template>
<script lang="ts" setup>
import { ref ,onMounted} from 'vue'
import {
  useRouter, useRoute} from 'vue-router';
import MenuItem from './MenuItem.vue'
let router = useRouter()
let route = useRoute()
const routes = router.options.routes
// 默认打开的菜单
let activeNav:any = ref('')
onMounted(() => {
  activeNav.value =route.path 
})
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
