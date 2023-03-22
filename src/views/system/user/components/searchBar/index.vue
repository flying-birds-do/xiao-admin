<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="用户昵称">
      <el-input v-model="formInline.name" placeholder="用户昵称" />
    </el-form-item>
    <!-- <el-form-item label="权限字符">
      <el-input v-model="formInline.roles" placeholder="权限字符" />
    </el-form-item> -->
    <el-form-item label="角色">
      <el-select v-model="formInline.roles" placeholder="角色">
        <el-option label="管理员" value="管理员" />
        <el-option label="超级管理员" value="超级管理员" />
        <el-option label="普通员工" value="普通员工" />
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
  name: '',
  roles: ''
})

const onSubmit = () => {
  console.log('submit!')
  emits('onSubmit', formInline.value)
}
const resetSubmit = () => {
  formInline.value = {
    name: '',
    roles: ''
  }
  emits('resetSubmit', formInline.value)
}
</script>
<style lang="scss" scoped>
.demo-form-inline .el-form--inline .el-form-item {
  margin-right: 12px;
}
.demo-form-inline  {
  text-align: left;
}

:deep .el-form-item {
  margin-right: 10px;
}
.top-button-warp .mr10 {
  margin-right: 12px !important;
}
</style>
