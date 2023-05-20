<template>
  <div id="save_body">
    <h1 style="color: #409EFF">新增医生信息</h1>
    <div id="save_form">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="color: #409EFF">编辑医生信息</span>
        </div>
        <div>
          <el-form ref="formName" :model="entity" :rules="rules" label-width="80px">
            <el-form-item label="医生姓名" style="width: 35%" prop="doctorName">
              <el-input v-model="entity.doctorName"></el-input>
            </el-form-item>
            <el-form-item label="上传照片">
              <uploadFile @userUploadFile="userUploadFile"></uploadFile>
            </el-form-item>
            <el-form-item label="所属院区" style="width: 25%" prop="hospitalId">
              <el-select v-model="entity.hospitalId" placeholder="请选择">
                <el-option
                  v-for="item in hospitalOptions"
                  :key="item.hospitalId"
                  :label="item.hospitalName"
                  :value="item.hospitalId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属科室" style="width: 25%" prop="departmentId">
              <el-select v-model="entity.departmentId" placeholder="请选择">
                <el-option
                  v-for="item in departmentOptions"
                  :key="item.departmentId"
                  :label="item.departmentName"
                  :value="item.departmentId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="医生职称" style="width: 25%" prop="professionalId">
              <el-select v-model="entity.professionalId" placeholder="请选择">
                <el-option
                  v-for="item in professionalTitleOptions"
                  :key="item.professionalTitleInfoId"
                  :label="item.professionalTitleInfoName"
                  :value="item.professionalTitleInfoId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="医生标签" style="width: 30%">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in doctorLables"
                  :key="item.code"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="挂号费用" style="width: 25%">
              <el-input v-model="entity.registrationFee" type="Number" placeholder="请输入挂号费0.00"></el-input>
            </el-form-item>
            <el-form-item label="诊察费用" style="width: 25%">
              <el-input v-model="entity.examinationFee" type="Number" placeholder="请输入挂号费0.00"></el-input>
            </el-form-item>
            <el-form-item label="医师简介" style="width: 45%">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="entity.doctorDesc">
              </el-input>
            </el-form-item>
            <el-form-item label="医师简介" style="width: 45%">
              <el-switch
                v-model="entity.doctorState"
                :active-value="0"
                :inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('formName')">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import UploadFile from '@/components/Upload/upload.vue'
import {getHospitalNavigationInfo} from "@/api/hospital-navigation-info";
import {getDepartmentInfo} from "@/api/department-info";
import {getProfessionalTitleInfos} from "@/api/test";
import {create, getDoctorLables} from "@/api/doctors_info";

export default {
  name: "doctor_save",
  components: {UploadFile},
  data() {
    return {
      value1: [],
      hospitalOptions: [],
      departmentOptions: [],
      professionalTitleOptions: [],
      doctorLables: [],
      entity: {
        doctorName: "",
        doctorImgFile: "",
        hospitalId: "",
        departmentId: "",
        professionalId: "",
        doctorLable: "",
        registrationFee: 0,
        examinationFee: 0,
        doctorDesc: "",
        doctorState: 0
      },
      value: true,
      rules: {
        doctorName: [{required: true, message: '请输入医生名称', trigger: 'blur'}],
        hospitalId: [{required: true, message: '请选择所属院区', trigger: 'change'}],
        departmentId: [{required: true, message: '请选择所属科室', trigger: 'change'}],
        professionalId: [{required: true, message: '请选择医生职称', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getHospitalNavigationInfo();
    this.getDepartmentInfo();
    this.getProfessionalTitleInfo();
    this.getDoctorLables();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.entity.examinationFee === 0) {
            this.$message({type: "error", message: "诊察费用不能为0"});
            return false;
          }
          if (this.entity.registrationFee === 0) {
            this.$message({type: "error", message: "挂号费用不能为0"});
            return false;
          }
          if (this.value1.length === 0) {
            this.$message({type: "error", message: "请选择标签"});
            return false;
          }
          this.entity.doctorLable = this.value1.join(",");
          create(this.entity).then(res => {
            this.$message({type: "success", message: res.message});
            this.jumpTo();
          }).catch(err => {
            this.$message({type: "error", message: err.message});
          })
          return false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getHospitalNavigationInfo() {
      getHospitalNavigationInfo().then(res => {
        this.hospitalOptions = res.data;
      }).catch(err => {
        console.error(err);
      })
    },
    getDepartmentInfo() {
      getDepartmentInfo().then(res => {
        this.departmentOptions = res.data;
      }).catch(err => {
        console.error(err);
      })
    },
    getProfessionalTitleInfo() {
      getProfessionalTitleInfos().then(res => {
        this.professionalTitleOptions = res.data;
      }).catch(err => {
        console.error(err);
      })
    },
    getDoctorLables() {
      getDoctorLables().then(res => {
        this.doctorLables = res.data;
      }).catch(err => {
        console.error(err);
      })
    },
    jumpTo() {
      this.$router.push("doctor_index");
    },
    userUploadFile(val) {
      console.log("parentFile:" + val);
      this.entity.articleThumbnailFile = val;
    },
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

.el-form-item {
  margin-top: 30px;
}
</style>
