<template>
  <el-dialog
    :title="'修改密码'"
    :visible="dialogFormVisible"
    width="500px"
    @close="closeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="100px"
      class="form"
      :rules="rules"
    >
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          placeholder="请输入旧密码"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          placeholder="请输入新密码"
          style="width: 300px"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          placeholder="请输入新密码"
          style="width: 300px"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submits()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    dialogFormVisible: Boolean,
  },
  data() {
    const validateConfirmPassword = (rule, value, callback) => {
      if (this.form.newPassword !== value) {
        callback('确认密码与新密码不一致')
      } else {
        callback()
      }
    }
    const validateNewPassword = (rule, value, callback) => {
      const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
      if (!reg.test(value)) {
        callback('密码长度大于8位且包含字母数字和特殊字符')
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur', },
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur', },
          { validator: validateNewPassword, trigger: 'blur', },
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur', },
          { validator: validateConfirmPassword, trigger: 'blur', },
        ],
      },
    }
  },
  methods: {
    closeDialog(config) {
      this.form = {
        vin: '',
        imei: '',
      }
      this.$refs['form'].resetFields()
      this.$emit('closeDialog', config)
    },
    submits() {
      const parmas = this.form
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.$emit('submitData', parmas)
        }
      })
    },
  },
}
</script>

<style scoped>

</style>
