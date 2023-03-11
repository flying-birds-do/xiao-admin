<template>
  <div id="change_pass">
    <el-dialog :close-on-click-modal="noClose" :close-on-press-escape="noClose" :show-close="noClose" :title="userCode==2 ? '初次登录，修改密码' : '修改密码'" :visible.sync="passTogg" center class="update-pass" modal>
      <el-form ref="form" :model="form" :rules="rules" class="demo-ruleForm" status-icon>
        <el-form-item v-if="userCode!=2" label="原密码：" :label-width="'200px'" prop="oldPass">
          <el-input v-model="form.oldPass" auto-complete="off" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" />
        </el-form-item>
        <el-form-item label="新密码：" :label-width="'200px'" prop="password">
          <el-input v-model="form.password" auto-complete="off" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" />
        </el-form-item>
        <el-form-item label="再次输入新密码：" :label-width="'200px'" prop="sure_password">
          <el-input v-model="form.sure_password" auto-complete="off" onkeypress="javascript:if(event.keyCode == 32)event.returnValue = false;" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitChangePass('form')">确定</el-button>
        <el-button @click="passTogg=false">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="noClose" :close-on-press-escape="noClose" :show-close="noClose" title="提示" :visible.sync="centerDialogVisible" center modal>
      <span>密码修改成功。</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    userCode: {
      type: Number,
      required: true // 必填
    }
  },
  data() {
    var oldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原始密码为空'))
      }
      callback()
    }
    var password = (rule, value, callback) => {
      var reg = /^[\S]{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!reg.test(value)) {
        callback(new Error('密码应为6-20位字符'))
      } else if (value === this.form.oldPass) {
        callback(new Error('新密码不能不与旧密码重复'))
      } else {
        if (this.form.sure_password !== '') {
          this.$refs.form.validateField('sure_password')
        }
        callback()
      }
    }
    var surePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      passTogg: false, // 控制更改密码弹出层
      centerDialogVisible: false,
      noClose: false,
      form: {
        oldPass: '',
        password: '',
        sure_password: ''
      },
      rules: {
        oldPass: [
          {
            validator: oldPass,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: password,
            trigger: 'blur'
          }
        ],
        sure_password: [
          {
            validator: surePass,
            trigger: 'blur'
          }
        ]
      } // 验证规则
    }
  },
  methods: {
    /* 修改密码 */
    submitChangePass(form) {
      this.$refs[form].validate(async valid => {
        if (valid) {
          const payload = {
            old_password: this.form.oldPass,
            new_password: this.form.password,
            extra_value: '1',
            extra_key: 'modify_code',
            first_modify_passwd: this.userCode === 2 ? 1 : 0
          }
          try {
            await this.$store.dispatch('user/modifyPassword', payload)
            this.passTogg = false
            this.centerDialogVisible = true
          } catch (err) {
            this.$message.error(err.message)
          }
        }
      })
    },
    show() {
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
      this.passTogg = true
    },
    sure() {
      this.centerDialogVisible = false
      this.passTogg = false
      this.logout()
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style>
#change_pass .el-input {
  width: 70% !important;
}

#change_pass .el-dialog__header {
  background-color: rgba(57, 179, 215, 0.25) !important;
}

#change_pass .el-dialog {
  width: 560px !important;
}
</style>
