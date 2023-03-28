<template>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>
<script lang="ts" setup>
import { ref, defineEmits,defineProps } from 'vue'
const emit = defineEmits(['pageChange', 'currentChange'])
const props = defineProps({
  total: {
    type: Number,
    default:400
  }
})
const currentPage = ref(4)
const pageSize = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  emit('pageChange',val)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
   emit('currentChange',val)
}
</script>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>