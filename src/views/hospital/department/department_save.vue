<template>
  <div id="save_body">
    <h1 style="color: #409EFF">新增科室信息</h1>
    <div id="save_form">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="color: #409EFF">编辑科室信息</span>
        </div>
        <div>
          <el-form :model="entity" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="科室名称" prop="departmentName">
              <el-input v-model="entity.departmentName" style="width: 25%"></el-input>
            </el-form-item>
            <el-form-item label="所属院区" prop="hospitalId">
              <el-select v-model="entity.hospitalId" placeholder="请选择">
                <el-option
                  v-for="item in hospitalNavigationOptions"
                  :key="item.hospitalId"
                  :label="item.hospitalName"
                  :value="item.hospitalId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上级科室" prop="parentId">
              <el-select v-model="entity.parentId" placeholder="请选择">
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="科室状态" prop="delivery">
              <el-switch
                :inactive-value="1"
                :active-value="0"
                v-model="entity.departmentState"/>
            </el-form-item>
            <el-form-item label="科室位置" prop="departmentAddress">
              <el-input type="textarea" v-model="entity.departmentAddress"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="jump()">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {create, getDepartmentInfo} from "@/api/department-info";
import {getHospitalNavigationInfo} from "@/api/hospital-navigation-info";

export default {
  name: "department_save",
  created() {
    this.getDepartmentInfo();
    this.getHospitalNavigationInfo();
  },
  data() {
    return {
      entity: {
        parentId: "",
        hospitalId: "",
        departmentAddress: "",
        departmentName: "",
        departmentState: 0
      },
      hospitalNavigationOptions: [],
      departmentOptions: [],
      rules: {
        parentId: [
          {required: true, message: '请选择上级科室', trigger: 'change'}
        ],
        departmentName: [
          {required: true, message: '请输入科室名称', trigger: 'change'}
        ],
        departmentAddress: [
          {required: true, message: '请输入科室位置', trigger: 'change'}
        ],
      }
    }
  },
  methods: {
    getDepartmentInfo() {
      getDepartmentInfo().then(res => {
        this.departmentOptions = res.data;
        this.departmentOptions.push({departmentId: "0", departmentName: "一级科室"});
      }).catch(err => {
        console.log(err);
      })
    },
    getHospitalNavigationInfo() {
      getHospitalNavigationInfo().then(res => {
        this.hospitalNavigationOptions = res.data;
      }).catch(err => {
        console.log(err);
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          console.log('error submit!!');
          return false;
        }
        this.create();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    jump() {
      this.$router.push("department_index");
    },
    create() {
      create(this.entity).then(res => {
        this.$message({message: res.message, type: "success"});
        this.jump();
      }).catch(err => {
        this.$message({message: err.message, type: "error"});
      });
    }
  },
}
</script>

<style scoped>
#save_body {
  width: 85%;
  margin: 0px auto;
}

#save_form {
}

.el-card /deep/ .el-card__header {
  background-color: rgb(242, 242, 242);
}

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
  width: auto;
}
</style>
