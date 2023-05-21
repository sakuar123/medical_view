<template>
  <div id="body_save">
    <div style="margin: 30px 0px"><h3>新增套餐类型</h3></div>
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>编辑套餐类型</span>
        </div>
        <div>
          <el-form ref="ruleForm" :rules="rules" :model="entity" label-width="80px">
            <el-form-item label="类型名称" prop="comboName">
              <el-input v-model="entity.comboName"></el-input>
            </el-form-item>
            <el-form-item label="描述">
              <el-input style="width:30%" type="textarea" v-model="entity.comboDesc"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-switch
                v-model="entity.comboState"
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
import {create} from "@/api/combo-type-info";

export default {
  name: "combo_type_save",
  data() {
    return {
      entity: {
        comboName: "",
        comboDesc: "",
        comboState: 0,
      },
      rules: {
        comboName: [
          {required: true, message: '类型名称不能为空', trigger: 'blur'},],
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
  width: 25%;
}
</style>
