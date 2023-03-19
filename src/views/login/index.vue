<template>
  <section class="login-warp">
    <div class="login-form-warp">
      <h1 class="title">xiao Admin 系统</h1>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="70px"
    class="login-ruleForm"
    status-icon
  >
    <el-form-item label="用户名" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item class="password-comine">
        <el-checkbox label="记住密码" v-model="remberPassword" />
        <p>忘记密码?</p>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)" class="login-btn">
        登录
      </el-button>
    </el-form-item>
  </el-form>
  </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import  http from '@/api/index'
import { useRouter } from 'vue-router';
const ruleFormRef = ref<FormInstance>()
const router = useRouter()
const ruleForm = reactive({
  name: 'admin',
  password: 'admin123456'
})
const remberPassword = ref(false)
const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    },
  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      router.push('/')
      //  toLogin(ruleForm)

      localStorage.setItem('token',JSON.stringify(ruleForm))
    } else {
      console.log('error submit!', fields)
    }
  })
}
const toLogin = async (ruleForm: any) => {
  const data = await http.Login(ruleForm)
  console.log(data)
  console.log(2332)
}

</script>

<style lang="scss" scoped>
.login-warp {
  background: url('../../assets/images/login-bg.jpg') no-repeat;
  width: 100%;
  height: 100%;
  background-size: cover;
  .title {
   color: #409eff;
  }
}

.login-form-warp {
  width: 35%;
  background: rgba(255, 255, 255,0.7);
  height: 560px;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding: 30px;
  box-sizing: border-box;
 .login-btn {
  width: 100%;
 }
}
</style>
<style lang="scss">
.password-comine {
 .el-form-item__content {
     display: flex;
  justify-content: space-between;
  }
 
}
</style>