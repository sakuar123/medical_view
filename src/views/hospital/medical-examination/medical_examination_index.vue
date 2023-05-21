<template>
  <div id="index_body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>体检项目管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpTo()">新增项目信息</el-button>
        <div style="width: 30%;margin: 20px 0px">
          <el-input placeholder="请输入套餐名称" v-model="keyWorld" class="input-with-select">
            <el-button slot="append" @click="search()" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="projectCode"
            label="项目ID" width="150">
          </el-table-column>
          <el-table-column
            prop="examinationName"
            label="项目名称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="comboName"
            label="所属套餐">
          </el-table-column>
          <el-table-column
            prop="examinationPrice"
            label="项目价格（元）">
          </el-table-column>
          <el-table-column
            prop="examinationDesc"
            label="项目介绍"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="examinationNote"
            label="注意事项">
          </el-table-column>
          <el-table-column
            label="项目状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.examinationState"
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
      </div>

    </el-card>
  </div>
</template>

<script>
import {remove, search} from "@/api/medical-examination-info";

export default {
  name: "medical_examination_index",
  created() {
    this.search();
  },
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      tableData: [],
      keyWorld: "",
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    search() {
      search({page: this.page, size: this.size}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch(err => {
        console.error(err);
      });
    },
    remove(row) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
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
    handleClick(row) {
      this.$router.push({path: "medical_examination_edit", query: {id: row.id}});
    },
    jumpTo() {
      this.$router.push("medical_examination_save");
    },
  },
}
</script>

<style scoped>
#index_body {
  width: 100%;
  margin: 0px auto;
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
  width: 100%;
}
</style>
