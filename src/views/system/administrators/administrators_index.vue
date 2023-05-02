<template>
  <div id="index-body">
    <div id="index-header">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple"><h1>管理员管理</h1></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-bg-purple-light">
            <el-button type="primary" @click="remove()" plain>删除</el-button>
            <el-button type="primary" @click="jumpToSave()">新增管理员</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="index-search">
      <el-input placeholder="请输入账号" v-model="keyWorld" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
      </el-input>
    </div>
    <div id="index-table">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          @row-click="handleSelectionChange">
          <el-table-column align="center" width="55" label="选择">
            <template slot-scope="scope">
              <!-- 可以手动的修改label的值，从而控制选择哪一项 -->
              <el-radio class="radio" v-model="templateSelection" :label="scope.row.id">&nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="administratorName"
            label="用户名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="administratorAccount"
            label="账号"
            width="250">
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色"
            width="150">
          </el-table-column>
          <el-table-column
            prop="administratorPhone"
            label="手机号码">
          </el-table-column>
          <el-table-column
            prop="announcementContent"
            label="是否启用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.administratorStatus"
                         :active-value="0"
                         :inactive-value="1">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="添加时间">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClickEdit(scope.row.id)" type="text" size="small">查看</el-button>
              <el-button @click="handleClickEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <div id="index-table-page">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="total"
          style="float: right"
          :current-page.sync="pageNum"
          :page-sizes="[10, 15, 20]"
          :page-size="pageSize"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {reomve, search} from "@/api/administrators-info";

export default {
  name: "administrators_index",
  data() {
    return {
      // 搜索关键字
      keyWorld: "",
      // 总页数
      total: 0,
      templateSelection: "",
      pageNum: 1,
      pageSize: 2,
      tableData: [],
      rowsId: "",
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      search({page: this.pageNum, size: this.pageSize, announcementTitle: this.keyWorld}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.search();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },
    handleClickEdit(rowId) {
      // this.$alert(rowId);
      this.$router.push({path: 'administrators_edit', query: {id: rowId}})
    },
    handleSelectionChange(rows) {
      // this.$alert(rows.id);
      this.rowsId = rows.id;
    },
    jumpToSave() {
      this.$router.push("administrators_save");
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
          reomve(this.rowsId).then(res => {
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
    }
  },
}
</script>

<style scoped>
#index-body {
  width: 90%;
  margin: 0px auto;
}

.grid-content-bg-purple-light {
  margin: 20px 0px;
  float: right;
}

#index-search {
  width: 30%;
  float: left;
  margin: 30px 0px;
}

#index-table-page {
  float: right;
}
</style>
