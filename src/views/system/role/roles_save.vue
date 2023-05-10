<template>
  <div id="bodys">
    <h1>新增角色</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="entity.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="entity.roleDesc"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="entity.roleStatus"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
          <el-button @click="jumpTo()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {create} from "@/api/roles-info";

export default {
  name: "roles_save",
  data() {
    return {
      entity: {
        roleName: "",
        roleDesc: "",
        roleStatus: "",
      },
      rules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'}],
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
        create(this.entity).then(res => {
          this.$message({type: "success", message: res.message});
          this.jumpTo();
        }).catch(err => {
          console.log(err);
        });
      });
    },
    jumpTo() {
      this.$router.push("roles_info");
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
