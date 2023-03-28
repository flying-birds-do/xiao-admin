<template>
  <template v-for="(item, index) in menuList" :key="index">
    <!-- 如果当前菜单有下级,循环下级 -->
    <el-sub-menu
      v-if="item?.children && item?.meta?.hidden && item?.children?.length > 0 && !item?.meta?.needMenu "
      :index="item?.path"
    >
      <template #title>
        <el-icon class="menu-icon">
        <!-- 遍历icon -->
          <component :is="item?.meta?.icon"></component>
        </el-icon>
        <span>{{ item?.meta?.title }}</span>
      </template>
    
    <!-- 递归调用自身 -->
      <MenuItem :menuList="item?.children" :index="item?.path"> </MenuItem>
    </el-sub-menu>
    <!-- 没有下级 -->
    <template  v-else>
    <el-menu-item :index="item?.path" v-if="item?.meta?.hidden">
      <component :is="item?.meta?.icon" class="menu-icon"></component>
      <template #title>{{ item?.meta?.title  }}</template>
    </el-menu-item>
    </template>
  </template>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import {
  Document,
  UserFilled,
  Location,
  Setting,
  HomeFilled,
  Management,
  Menu as IconMenu,
} from '@element-plus/icons-vue';
export default defineComponent({
  name: 'MenuItem',
  props: ['menuList'],

  components: {
    Location,
    Setting,
    IconMenu,
    Document,
    Management,
    HomeFilled,
    UserFilled,
  },
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.menuList)
    const secondMenuClick = (item:any) => {
      console.log(item)
    }
    return {
      secondMenuClick
    }
  }
});

onMounted(() => {
  })
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu-icon{
  width: 24px;
  height: 24px;
}
</style>
