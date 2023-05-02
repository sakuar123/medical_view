<template>
  <div id="bodys">
    <h1>修改消息公告</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="标题" prop="announcementTitle">
          <el-input v-model="entity.announcementTitle"></el-input>
        </el-form-item>
        <el-form-item label="上传人" prop="uploadPerson">
          <el-input v-model="entity.uploadPerson"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="announcementContent">
          <el-input type="textarea" v-model="entity.announcementContent"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="entity.uploadDate"
                          style="width: 100%;"/>
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
import {create, get, update} from "@/api/announcement";

export default {
  name: "announcement_save",
  data() {
    return {
      value1: "",
      entity: {
        id: "",
        announcementTitle: "",
        uploadPerson: "",
        announcementContent: "",
        announcementStatus: "",
        uploadDate: "",
      },
      value: true,
      rules: {
        announcementTitle: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
        announcementContent: [{required: true, message: '请输入公告内容', trigger: 'change'}],
      },
    }
  },
  created() {
    this.get(this.$route.query.id);
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.entity.announcementStatus = this.value ? 0 : 1;
          update(this.entity).then(res => {
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
      this.$router.push("announcement_index");
    },
    get(id) {
      get(id).then(res => {
        this.entity = res.data;
        this.value = this.entity.announcementStatus === 0;
      }).catch(err => {
        console.log(err);
      })
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
