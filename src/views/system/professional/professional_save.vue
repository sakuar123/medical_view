<template>
  <!--  <router-view/>-->
  <div id="bodys">
    <h1>新增职称</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="职称名称" prop="professionalTitleName">
          <el-input v-model="entity.professionalTitleName"></el-input>
        </el-form-item>
        <el-form-item label="挂号费" prop="registrationFee">
          <el-input v-model="entity.registrationFee"></el-input>
        </el-form-item>
        <el-form-item label="职称描述" prop="professionalTitleDesc">
          <el-input v-model="entity.professionalTitleDesc"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="value"
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
import {createProfessionalTitleInfo} from "../../../api/test";

export default {
  name: "professional_save",
  data() {
    return {
      entity: {
        professionalTitleName: '',
        registrationFee: '',
        professionalTitleDesc: '',
        status: 0
      },
      value: true,
      rules: {
        professionalTitleName: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        registrationFee: [{required: true, message: '请选择活动区域', trigger: 'change'}],
        professionalTitleDesc: [{required: true, message: '请输入活动名称', trigger: 'blur'}]
      },
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entity.status = this.value ? 0 : 1;
          createProfessionalTitleInfo(this.entity).then(res => {
            this.$alert(res.data);
            this.jumpTo();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    jumpTo() {
      this.$router.push("professional_index");
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
