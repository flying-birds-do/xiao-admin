<template>
  <section class="side-left-warp">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
      text-color="#fff" @open="handleOpen" @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>仪表盘</span>
        </template>
        <el-menu-item index="analysis">分析页</el-menu-item>
        <el-menu-item index="works">工作台</el-menu-item>
      </el-sub-menu>
       <el-sub-menu index="2">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>文档</span>
        </template>
        <el-menu-item index="2-1">vue文档</el-menu-item>
        <el-menu-item index="2-2">vite文档</el-menu-item>
        <el-menu-item index="2-3">typescript文档</el-menu-item>
      </el-sub-menu>
       <el-sub-menu index="3">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>组件示例</span>
        </template>
        <el-menu-item index="3-1">按钮</el-menu-item>
        <el-menu-item index="3-2">卡片</el-menu-item>
        <el-menu-item index="3-3">表格</el-menu-item>
      </el-sub-menu>
         <el-sub-menu index="4">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>插件示例</span>
        </template>
       <el-menu-item-group title="图表">
            <el-menu-item index="4-1">地图</el-menu-item>
            <el-menu-item index="4-2">视频</el-menu-item>
            <el-menu-item index="4-3">音频</el-menu-item>
          </el-menu-item-group>
            <el-menu-item-group title="编辑器">
            <el-menu-item index="4-1">富文本编辑器</el-menu-item>
            <el-menu-item index="4-2">markdown编辑器</el-menu-item>
          </el-menu-item-group>
           <el-menu-item index="4-1">剪切板</el-menu-item>
           <el-menu-item index="4-1">图标</el-menu-item>
           <el-menu-item index="4-1">打印</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="1-1">权限管理</el-menu-item>
        <el-menu-item index="1-2">角色管理</el-menu-item>
         <el-menu-item index="1-2">路由管理</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>关于我们</span>
      </el-menu-item>

    </el-menu>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
interface sideBar {
  path: string,
  title: string,
  icon: string
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
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
  height: calc(100vh - 40px);
  background: #545c64;

}
</style>
