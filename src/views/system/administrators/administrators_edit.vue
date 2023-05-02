<template>
  <div id="bodys">
    <h1>修改管理员</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="administratorName">
          <el-input v-model="entity.administratorName"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="administratorAccount">
          <el-input v-model="entity.administratorAccount"></el-input>
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="roleId" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="administratorPhone">
          <el-input v-model="entity.administratorPhone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="administratorPassword">
          <el-input type="password" :disabled="true" v-model="entity.administratorPassword"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="value"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949">
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
import {get, update} from "@/api/administrators-info";
import {getRoleList} from "@/api/role-info";

export default {
  name: "administrators_save",
  data() {
    return {
      entity: {
        administratorName: "",
        administratorAccount: "",
        roleId: "",
        administratorPhone: "",
        administratorPassword: "",
        administratorStatus: "",
      },
      options: [],
      roleId: "",
      value: false,
      rules: {
        administratorName: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        administratorAccount: [{required: true, message: '请输入账号', trigger: 'change'}],
        administratorPassword: [{required: true, message: '请输入密码', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getRoleList();
    this.get(this.$route.query.id);
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }
        if (this.roleId === null || this.roleId === '' || this.roleId === undefined) {
          this.$message({type: "error", message: "请选择至少一名角色"});
          return false;
        }
        this.entity.administratorStatus = this.value;
        this.entity.roleId = this.roleId;
        update(this.entity).then(res => {
          this.$alert(res.data);
          this.jumpTo();
        });
      });
    },
    jumpTo() {
      this.$router.push("administrators");
    },
    get(id) {
      get(id).then(res => {
        this.entity = res.data;
        this.value = this.entity.administratorStatus;
        this.roleId = this.entity.roleId;
      }).catch(err => {
        console.log(err);
      })
    },
    getRoleList() {
      getRoleList().then(res => {
        console.log(res.data);
        this.options = res.data;
      }).catch(err => {
        console.log(err);
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
