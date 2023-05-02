<template>
  <div id="bodys">
    <h1>修改密码</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="entity.newPwd" placeholder="请输入内容" type="password"/>
        </el-form-item>
        <el-form-item label="密码确认" prop="checkPwd">
          <el-input v-model="entity.checkPwd" placeholder="请输入内容" type="password"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {updatePwd} from "@/api/update_pwd";

export default {
  name: "update_pwd",
  data() {
    return {
      entity: {
        newPwd: "",
        checkPwd: "",
      },
      rules: {
        newPwd: [{required: true, message: '请输入新密码', trigger: 'blur'}],
        checkPwd: [{required: true, message: '请确认密码', trigger: 'change'}],
      },
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }
        if (this.entity.newPwd !== this.entity.checkPwd) {
          this.$message({type: "error", message: "两次输入的密码不一致"});
          return false;
        }
        updatePwd(this.entity.newPwd).then(res => {
          this.$alert("修改密码成功,请重新登录");
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        }).catch(err => {
          console.log(err);
        })
      });
    },
  },
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}

#bodys {
  width: 80%;
  margin: 0px auto;
}

#box-card {
  width: 30%;
}
</style>
