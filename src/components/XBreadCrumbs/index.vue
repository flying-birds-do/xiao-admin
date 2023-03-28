<script lang="ts" setup name="Bread">
import { ArrowRight } from '@element-plus/icons-vue'
import { inject } from 'vue'
defineProps({
  to: {
    type: String,
  },
})

const BreadList = inject('BreadList')

// 为底层组件提供数据
</script>
<template>
  <div class="bread-crumbs">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="item.path" v-for="(item,index) in BreadList" :key="index">{{ item.title }}</el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>
<style scoped lang="scss">
.bread-crumbs {
  text-align: left;
  font-size: 20px;
  .el-breadcrumb {

  }
}
</style>
