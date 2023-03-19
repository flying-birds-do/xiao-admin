<template>
  <section class="add-warp">
      <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
     :before-close="handleClose"
     draggable
  >
   <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="时间" prop="date">
      <el-date-picker
            v-model="ruleForm.date"
            type="date"
            label="添加时间"
            placeholder="请选择时间"
            style="width: 100%"
          />
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="ruleForm.address"  type="textarea" />
    </el-form-item>
    <el-form-item label="排序" prop="order">
      <el-input v-model="ruleForm.order" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
      <el-button @click="resetForm(ruleFormRef)">取消</el-button>
    </el-form-item>
  </el-form>
  </el-dialog>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref , Ref, computed, watch} from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import User from '../class/User'

const props = defineProps({
  isShow: Boolean,
  info: User,
  title: String
})
const dialogVisible = computed(() => props.isShow)
const emits = defineEmits(['closeAdd', 'sucess'])
const handleClose = () => {
  emits('closeAdd')
}
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      emits('sucess','新增成功')
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
   emits('closeAdd')
}
watch(() => props.info, (newInfo) => {
  if (newInfo) {
    ruleForm.value = newInfo
  }
})
const ruleFormRef = ref<FormInstance>()
const ruleForm:Ref<User> = ref<User>({
  id: '',
  address: '',
  name:'',
  order: 0,
  date: ''
  
})
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  address: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  order: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ]

})


</script>