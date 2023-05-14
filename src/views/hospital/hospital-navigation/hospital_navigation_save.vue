<template>
  <div id="save_body">
    <h1 style="color: #409EFF">新增院区</h1>
    <div id="save_form">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="color: #409EFF">编辑院区信息</span>
        </div>
        <div>
          <el-form style="width: 70%" ref="ruleForm" :model="entity" label-width="80px" :rules="rules">
            <el-form-item label="院区名称" prop="hospitalName">
              <el-input v-model="entity.hospitalName" placeholder="请输入内容" style="width: 30%"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="entity.hospitalTelephone" placeholder="请输入内容" style="width: 30%"></el-input>
            </el-form-item>
            <el-form-item label="公交" style="width: 40%">
              <el-input v-model="entity.transit" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="院区地址" prop="hospitalAddress">
              <el-cascader
                v-model="value"
                :props="{value:'title', label: 'title', children: 'regionInfoList'}"
                :options="options"
                placeholder="请选择地区位置"
                @change="handleChange"/>
              <el-input v-model="entity.hospitalAddress" style="width: 70%"></el-input>
            </el-form-item>
            <el-form-item label="院内导航">
              <template>
                <el-table
                  :data="tableData"
                  style="width: 100%"
                  @cell-click="cellHandleclick">
                  <el-table-column
                    label="序号"
                    width="180">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                  </el-table-column>
                  <el-table-column
                    label="楼层"
                    width="180">
                    <template slot-scope="scope">
                      <span v-show="scope.row.isShow"> {{ scope.row.hospitalFloor }}</span>
                      <el-input @blur="onHandleEdit(scope.row)" v-model="scope.row.hospitalFloor"
                                v-show="!scope.row.isShow"/>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="楼层索引">
                    <template slot-scope="scope">
                      <span v-show="scope.row.isShow"> {{ scope.row.hospitalFloorIndex }}</span>
                      <el-input @blur="onHandleEdit(scope.row)" v-model=" scope.row.hospitalFloorIndex"
                                v-show="!scope.row.isShow"/>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">添加
                      </el-button>
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index,scope.row)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-form-item>
            <el-form-item label="院区状态">
              <el-switch
                v-model="entity.hospitalState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="0"
                :inactive-value="1"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('ruleForm')">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import {create, getRegion} from "@/api/hospital-navigation-info";
import fa from "element-ui/src/locale/lang/fa";
import {isNotBlank} from "@/utils";

export default {
  name: "hospital_navigation_save",
  created() {
    this.getRegion();
  },
  data() {
    return {
      value: [],
      options: [],
      isSubmit: false,
      entity: {
        hospitalName: "",
        hospitalTelephone: "",
        transit: "",
        hospitalAddress: "",
        hospitalState: 0,
        hospitalInsideNavigationList: []
      },
      tableData: [{
        hospitalFloor: "",
        hospitalFloorIndex: "",
        isShow: false,
        isDel: false,
      }],
      rules: {
        hospitalName: [{required: true, message: '请输入院区名称', trigger: 'blur'}],
        hospitalAddress: [{required: true, message: '请选择活动区域', trigger: 'change'}],
      }
    }
  },
  methods: {
    getRegion() {
      getRegion().then(res => {
        this.options = res.data;
      }).catch(err => {
        console.error(err);
      });
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.isSubmit) {
          this.entity.hospitalInsideNavigationList = this.tableData;
          console.log(this.entity);
          create(this.entity).then(res => {
            this.$message({message: res.message, type: "success"});
            this.$router.push('hospital_navigation_index');
          }).catch(err => {
            this.$message({message: res.message, type: "error"});
            console.error(err);
          })
        } else {
          this.$message({message: "必填项不能为空", type: "error"});
          return false;
        }
      });
    },
    handleChange(value) {
      this.entity.hospitalAddress = this.value.join(",").replaceAll(",", "");
    },
    handleEdit(index, row) {
      this.tableData.push({
        "hospitalFloor": "",
        "hospitalFloorIndex": "",
        "isShow": false,
        "isDel": true,
      });
    },
    handleDelete(index, row) {
      if (row.isDel) {
        this.tableData.splice(index, 1);
      } else {
        this.$message({message: "最低保留一条数据", type: "error"});
      }
    },
    handleCurrentChange(row) {
      row.isShow = false;
    },
    onHandleEdit(row) {
      this.isSubmit = false;
      if (isNotBlank(row.hospitalFloor)) {
        this.$message({message: "楼层不能为空", type: "error"});
        return;
      }
      if (isNotBlank(row.hospitalFloorIndex)) {
        this.$message({message: "楼层索引不能为空", type: "error"});
        return;
      }
      //这个判断不知道为什么会是false,只能用上面的那种了
      // if (isNotBlank(row.hospitalFloor) && isNotBlank(row.hospitalFloorIndex)) {
      //   this.$message({message: "楼层及索引不能为空", type: "error"});
      //   return;
      // }
      row.isShow = true;
      this.isSubmit = true;
    },
    cellHandleclick(row, column, cell, event) {
      console.log(row.index);
      row.isShow = false;
    },
  }
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
