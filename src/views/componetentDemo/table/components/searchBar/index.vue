<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="仓库名称">
      <el-input v-model="formInline.storeName" placeholder="用户昵称" />
    </el-form-item>
    <!-- <el-form-item label="权限字符">
      <el-input v-model="formInline.roles" placeholder="权限字符" />
    </el-form-item> -->
    <el-form-item label="商品状态">
      <el-select v-model="formInline.status" placeholder="商品状态">
        <el-option label="出库中" value="出库中" />
        <el-option label="成功" value="成功" />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="创建时间">
      <el-date-picker v-model="formInline.date" type="date" placeholder="请选择创建时间" style="width: 100%" />
    </el-form-item> -->
    <el-form-item class="mr10">
      <el-button type="primary" @click="onSubmit">查询</el-button>
      <el-button @click="resetSubmit">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
const emits = defineEmits(['onSubmit', 'resetSubmit'])
let formInline = ref({
  storeName: '',
  status: ''
})

const onSubmit = () => {
  console.log('submit!')
  emits('onSubmit', formInline.value)
}
const resetSubmit = () => {
  formInline.value = {
    storeName: '',
    status: ''
  }
  emits('resetSubmit', formInline.value)
}
</script>
<style lang="scss" scoped>
.demo-form-inline {
  text-align: left;
}
.demo-form-inline .el-form--inline .el-form-item {
  margin-right: 12px;
}

.demo-form-inline :deep .el-form-item {
  margin-right: 12px;
}
.top-button-warp .mr10 {
  margin-right: 12px !important;
}
</style>
