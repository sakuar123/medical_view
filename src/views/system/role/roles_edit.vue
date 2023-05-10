<template>
  <div id="bodys">
    <h1>编辑角色</h1>
    <div id="box-card">
      <div>
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
          <template>
            <el-tree
              :data="options"
              show-checkbox
              node-key="permissionSign"
              :default-checked-keys="checkedKeys"
              @check="handleCheckChange"
              :props="defaultProps">
            </el-tree>
          </template>
          <el-form-item style="margin-top: 20px">
            <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
            <el-button @click="jumpTo()">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {get, update} from "@/api/roles-info";
import {getPermissionList, getPermissions} from "@/api/permissions-info";

export default {
  name: "roles_save",
  data() {
    return {
      entity: {
        id: "",
        roleName: "",
        roleDesc: "",
        roleStatus: "",
        permissions: "",
      },
      rules: {
        roleName: [{required: true, message: '请输入角色名称', trigger: 'blur'}],
        roleDesc: [{required: true, message: '请输入角色描述', trigger: 'blur'}],
      },
      options: [],
      checkedKeys: [],
      userCheckedKeys: [],
      defaultProps: {
        children: 'permissionsInfoList',
        label: 'permissionDesc'
      }
    }
  },
  created() {
    this.get(this.$route.query.id);
    this.getPermissions(this.$route.query.id);
    this.getPermissionList();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }
        this.entity.permissions = this.userCheckedKeys.join(",");
        update(this.entity).then(res => {
          this.$alert(res.data);
          this.jumpTo();
        });
      });
    },
    jumpTo() {
      this.$router.push("roles_info");
    },
    get(id) {
      get(id).then(res => {
        this.entity.id = res.data.id;
        this.entity.roleName = res.data.roleName;
        this.entity.roleDesc = res.data.roleDesc;
        this.entity.roleStatus = res.data.roleStatus;
      }).catch(err => {
        console.log(err);
      })
    },
    getPermissionList() {
      getPermissionList().then(res => {
        console.log(res.data);
        this.options = res.data;
      }).catch(err => {
        console.log(err)
      });
    },
    getPermissions(id) {
      getPermissions(id).then(res => {
        this.checkedKeys = res.data.permissions;
      }).catch(err => {
        console.log(err);
      });
    },
    handleCheckChange(nodeObj, SelectedObj) {
      console.log("这是选中的节点的key数组" + SelectedObj.checkedKeys)   // 这是选中的节点的key数组
      this.userCheckedKeys = SelectedObj.checkedKeys;
      // console.log(JSON.stringify(this.userCheckedKeys));
    }
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
