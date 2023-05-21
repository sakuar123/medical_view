<template>
  <div id="body_save">
    <div style="margin: 30px 0px"><h3>新增套餐信息</h3></div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>编辑套餐信息</span>
        </div>
        <div>
          <el-form ref="ruleForm" :rules="rules" :model="entity" label-width="80px">
            <el-form-item label="项目名称" prop="examinationName">
              <el-input v-model="entity.examinationName"></el-input>
            </el-form-item>
            <el-form-item label="所属套餐">
              <combo :value="entity.comboId" @changeClik="changeClik"></combo>
            </el-form-item>

            <el-form-item label="项目价格">
              <el-input type="number" v-model="entity.examinationPrice"></el-input>
            </el-form-item>
            <el-form-item label="项目介绍" prop="examinationDesc">
              <el-input style="width:30%" type="textarea" v-model="entity.examinationDesc"></el-input>
            </el-form-item>
            <el-form-item label="注意事项" prop="examinationNote">
              <el-input style="width:30%" type="textarea" v-model="entity.examinationNote"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="entity.examinationState"
                :active-value="0"
                :inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
              <el-button @click="jumpTo()">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {create} from "@/api/medical-examination-info";
import Combo from "@/components/Combo/index.vue";

export default {
  name: "medical_examination_save",
  components: {Combo},
  data() {
    return {
      entity: {
        comboId: 0,
        projectCode: "MNOP",
        examinationName: "",
        examinationDesc: "",
        examinationNote: "",
        examinationPrice: 0.00,
        examinationState: 0,
      },
      rules: {
        examinationName: [{required: true, message: '类型名称不能为空', trigger: 'blur'}],
        examinationDesc: [{required: true, message: '项目介绍不能为空', trigger: 'blur'}],
        examinationNote: [{required: true, message: '注意事项不能为空', trigger: 'blur'}],
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.entity.examinationPrice <= 0) {
            this.$message({type: "error", message: "请输入正确的数字!"});
            return false;
          }
          console.log(this.entity.comboId);
          if (this.entity.comboId === 0) {
            this.$message({type: "error", message: "请选择一项套餐!"});
            return false;
          }
          create(this.entity).then(res => {
            this.$message({type: "success", message: res.message});
            this.jumpTo();
          }).catch(err => {
            this.$message({type: "error", message: err.message});
            return false;
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    changeClik(val) {
      this.entity.comboId = val;
    },
    jumpTo() {
      this.$router.back();
    }
  }
}
</script>

<style scoped>
#body_save {
  width: 85%;
  margin: 0 auto;
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

.el-card /deep/ .el-card__header {
  background-color: rgb(242, 242, 242);
}

.clearfix:after {
  clear: both
}

.el-input {
  width: 20%;
}
</style>
