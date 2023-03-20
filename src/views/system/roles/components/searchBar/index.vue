<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="角色名称">
      <el-input v-model="formInline.name" placeholder="角色名称" />
    </el-form-item>
    <!-- <el-form-item label="权限字符">
      <el-input v-model="formInline.roles" placeholder="权限字符" />
    </el-form-item> -->
    <el-form-item label="状态">
      <el-select v-model="formInline.status" placeholder="状态">
        <el-option label="正常" value="1" />
        <el-option label="停用" value="0" />
      </el-select>
    </el-form-item>
       <el-form-item label="创建时间">
      <el-date-picker
          v-model="formInline.date"
          type="date"
          placeholder="请选择创建时间"
          style="width: 100%"
        />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
       <el-button  @click="resetSubmit">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive,defineEmits } from 'vue'
const emits = defineEmits(['onSubmit','resetSubmit'])
let formInline = reactive({
  name: '',
  roles: '',
  date: '',
  status:''
  
})

const onSubmit = () => {
  console.log('submit!')
  emits('onSubmit',formInline)
}
const resetSubmit = () => {
  console.log('resetSubmit!')
  formInline = reactive({
  name: '',
  roles: '',
  date: '',
  status:''
})
  emits('resetSubmit')
}
</script>
<style lang="scss">
.demo-form-inline .el-form--inline .el-form-item {
  margin-right: 12px;
}
</style>
