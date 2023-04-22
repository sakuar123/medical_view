<template>
  <div id="body">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <h2>职称管理</h2>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <div id="button">
            <el-row>
              <el-button type="primary" icon="el-icon-edit" @click="jumoTo()">新增</el-button>
              <el-button type="danger" icon="el-icon-delete">删除</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div id="search">
      <el-input placeholder="请输入内容" v-model="input2">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div id="tables">
      <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="handleSelectionChange"
          highlight-current-row
      >
        <el-table-column align="center" width="55" label="选择">
          <template slot-scope="scope">
            <!-- 可以手动的修改label的值，从而控制选择哪一项 -->
            <el-radio class="radio" v-model="templateSelection" :label="scope.row.id">&nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="id" label="编号" width="250"></el-table-column>
        <el-table-column align="center" prop="title" label="日期" width="250"></el-table-column>
        <el-table-column align="center" prop="userName" label="姓名" width="250"></el-table-column>
        <el-table-column align="center" prop="duration" label="地址" width="250"></el-table-column>
      </el-table>
      <el-pagination
          small
          layout="prev, pager, next"
          :total="total"
          style="float: right"
          :current-page.sync="pageNum" :page-sizes="[10, 15, 20]" :page-size="pageSize" @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getTableData} from "@/api/test";

export default {
  name: "index.vue",
  data() {
    return {
      input2: "",
      templateSelection: "",
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageable: {getPageNumber: 1, getPageSize: 10},
      pageNum: 1,
      pageSize: 2,
    }
  },
  created() {
    this.loads();
  },
  methods: {
    loads() {
      getTableData().then(res => {
        this.tableData = res.result.list;
      });
    },
    handleSelectionChange(rows) {
      // alert(rows.id);
    },
    handleSizeChange(pageSize) {
      alert(pageSize);
    },
    handleCurrentChange(pageNum) {
      alert(pageNum);
    },
    jumoTo() {
      this.$router.push("professional_save");
    },
  }
}
</script>

<style scoped>
#body {
  width: 80%;
  margin: 0px auto;
  height: 80%;
}

#button {
  margin-top: 15px;
  float: right;
}

#search {
  width: 20%;
  float: left;
  margin: 30px 0px;
}
</style>