<template>
  <div id="body_index">
    <div style="margin: 30px 0px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>体检套餐管理</span>
          <el-button @click="jumpTo" style="float: right; padding: 3px 0" type="text">新增套餐信息</el-button>
        </div>
        <div id="table_body">
          <div id="table_search" style="width: 50%;float: left;margin: 10px 0px">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple">
                  <combo :value="value" @changeClik="changeClik"></combo>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light">
                  <el-input
                    placeholder="请输入套餐名称"
                    v-model="comboName"
                    clearable
                    class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="margin:20px 0px">
            <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="comboCode"
                  label="套餐ID"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="comboName"
                  label="套餐名称"
                  width="200">
                </el-table-column>
                <el-table-column
                  label="套餐图片"
                  width="100">
                  <template slot-scope="scope">
                    <el-popover placement="top-start" title="" trigger="hover">
                      <img :src="scope.row.comboImg" alt="" style="width: 150px;height: 150px">
                      <img slot="reference" :src="scope.row.comboImg" style="width: 30px;height: 30px">
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="comboTypeName"
                  label="套餐类型"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="hospitalName"
                  label="适用院区"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="comboPrice"
                  label="套餐价格（元）"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="examinationName"
                  label="套餐项目">
                </el-table-column>
                <el-table-column
                  label="套餐状态"
                  width="150">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.comboState"
                      :active-value="0"
                      :inactive-value="1"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      disabled>
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" @click="remove(scope.row)" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="float: right"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[2, 5, 10]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </template>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import Combo from "@/components/Combo/index.vue";
import {remove, search} from "@/api/medical-combo-info";

export default {
  name: "medical_combo_table",
  components: {Combo},
  data() {
    return {
      value: "",
      comboName: "",
      comboTypeId: 0,
      page: 1,
      size: 5,
      total: 0,
      tableData: []
    }
  },
  created() {
    this.search();
  },
  methods: {
    changeClik(val) {
      this.comboTypeId = val;
    },
    search() {
      search({page: this.page, size: this.size, comboName: this.comboName, comboTypeId: this.comboTypeId}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch(err => {
        console.error(err);
      });
    },
    remove(row) {
      this.$confirm('此操作将永久删除该套餐, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'demo1',
        type: 'warning'
      }).then(() => {
        remove(row.id).then(res => {
          this.$message.success(res.message);
          this.search();
        }).catch(err => {
          this.$message.error(err.message);
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSizeChange(val) {
      this.size = val;
      this.search();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.search();
    },
    handleClick(row) {
      this.$router.push({path: "medical_examination_edit", query: {id: row.id}});
    },
    jumpTo() {
      this.$router.push("medical_combo_save");
    },
  }
}
</script>

<style scoped>
#body_index {
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
</style>
