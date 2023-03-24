<template>
  <el-dialog
    v-model="props.dialogVisible"
    :title="Tips"
    width="30%"
    class="xy-dialog"
    :before-close="handleClose"
  >
      <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sure">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {defineEmits,defineProps } from 'vue'
const props = defineProps({ dialogVisible: Boolean ,Tips:String})
const emit = defineEmits(['cancel', 'sure'])
const cancel = () => {
  emit('cancel')
}
const sure = () => {
  emit('sure')
}
const handleClose = (done: () => void) => {
   emit('cancel')
}
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
/* .xy-dialog .el-select {
  width: 100%;
}

.xy-dialog .el-input__wrapper {
  box-sizing: border-box;
  width: 100%;
}

.xy-dialog .el-form-item,
.el-form-item__content {
  width: 100%;
} */
</style>
