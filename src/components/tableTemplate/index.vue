<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
        >
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { defineProps,ref,reactive } from 'vue'
const props = defineProps({
  tableData:Array
})
let tableData:any = ref([])
tableData.value = props.tableData
const handleClick = () => {
  console.log('click')
}

</script>
