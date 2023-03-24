<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: item?.path}"  v-for="item in  navList" :key="item">homepage</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { defineProps } from 'vue'
const props = defineProps({
  navList: Array
})
const navList = props.navList
</script>
