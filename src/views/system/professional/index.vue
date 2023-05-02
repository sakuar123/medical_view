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
              <el-button type="danger" icon="el-icon-delete" @click="remove()">删除</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <div id="search">
      <el-input placeholder="请输入内容" v-model="input2">
        <el-button slot="append" @click="loads()" icon="el-icon-search"></el-button>
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
            <el-radio class="radio" v-model="templateSelection" :label="scope.row.id">&nbsp;
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="professionalTitleName" label="职称名称" width="150"></el-table-column>
        <el-table-column align="center" prop="registrationFee" label="默认挂号费（元）" width="100"></el-table-column>
        <el-table-column align="center" prop="professionalTitleDesc" label="职称描述 " width="250"></el-table-column>
        <el-table-column align="center" prop="createDate" label="添加时间" width="250"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="150">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status"
                       :active-value="0"
                       :inactive-value="1"
                       @change="changeSwitch(scope.row)">

            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClickEdit(scope.row.id)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
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
import {getTableData, test1, test2, removeProfessionalTitleInfo} from "@/api/test";
import alert from "element-ui/packages/alert";

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
      pageSize: 5,
      value: true,
      rowsId: "",
    }
  },
  created() {
    this.loads();
  },
  methods: {
    loads() {
      getTableData({page: this.pageNum, size: this.pageSize, professionalTitleName: this.input2}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    handleSelectionChange(rows) {
      this.rowsId = rows.id;
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.loads();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.loads();
    },
    jumoTo() {
      this.$router.push("professional_save");
    },
    remove() {
      if (this.rowsId === null || this.rowsId === '' || this.rowsId === undefined) {
        this.$alert("请先选择要删除的数据");
      } else {
        this.$confirm('此操作将永久删除该职称, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          customClass: 'demo1',
          type: 'warning'
        }).then(() => {
          removeProfessionalTitleInfo(this.rowsId).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loads();
          }).catch(err => {
            console.log(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    handleClick() {
      test1().then(res => {
        this.$alert(res.message);
      }).catch(err => {
      });
    },
    handleClickEdit(id) {
      // this.$router.push("professional_edit");
      console.log(id);
      this.$router.push({path: 'professional_edit', query: {id: id,}})
    },
    changeSwitch(rows) {
      this.$confirm("是否更改此职称的状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        alert("已更改" + rows.status);
      }).catch(() => {
        alert("已取消" + rows.status);
      });
    }
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
