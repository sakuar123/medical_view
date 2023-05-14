<template>
  <div id="index_body">
    <div id="index_header">
      <el-col :span="18">
        <div class="grid-content bg-purple"><h1>科室管理</h1></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content-bg-purple-light">
          <el-button type="primary" @click="remove()" plain>删除</el-button>
          <el-button @click="jump()" type="primary">新增科室信息</el-button>
        </div>
      </el-col>
    </div>
    <div id="index_search">
      <el-input
        placeholder="请输入科室名称"
        v-model="keyWorld"
        clearable>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <div id="index_table">
      <template>
        <el-table
          :data="tableData"
          style="width: 100%"
          row-key="id"
          @row-click="handleSelectionChange"
          :tree-props="{children: 'childDepartmentInfo'}">
          <el-table-column align="center" width="100" label="选择">
            <template slot-scope="scope">
              <!-- 可以手动的修改label的值，从而控制选择哪一项 -->
              <el-radio class="radio" v-model="templateSelection" :label="scope.row.id">&nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="科室名称"
            width="250">
          </el-table-column>
          <el-table-column
            prop="departmentAddress"
            label="科室位置"
            width="250">
          </el-table-column>
          <el-table-column
            prop="hospitalName"
            label="所属院区"
            width="250">
          </el-table-column>
          <el-table-column
            label="操作时间"
            width="150">
            <template slot-scope="scope">
              {{ parseTime(scope.row.createDate) }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button size="mini" type="primary" @click="handleClickEdit(scope.row.id)" icon="el-icon-edit"
                           circle/>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button size="mini" @click="handleClickDel(scope.row.id)" type="danger" icon="el-icon-delete"
                           circle/>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          style="float: right"
          :current-page.sync="page"
          :page-size="size"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </template>
    </div>
  </div>
</template>

<script>
import {remove, search} from "@/api/department-info";
import {parseTime} from "@/utils/index";

export default {
  name: "department_index",
  created() {
    this.search();
  },
  data() {
    return {
      keyWorld: "",
      templateSelection: "",
      page: 1,
      size: 5,
      total: 0,
      departmentId: 0,
      tableData: [],
    }
  },
  methods: {
    search() {
      search({page: this.page, size: this.size, keyWorld: this.keyWorld}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch();
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.search();
    },

    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.search();
    },

    handleSelectionChange(rows) {
      this.departmentId = rows.id;
    },

    handleClickDel(id) {
      this.departmentId = id;
    },

    handleClickEdit(id) {
      this.$router.push({path: "department_edit", query: {id: id}});
    },

    remove() {
      if (this.departmentId === 0) {
        this.$message.error("请选择要删除的数据");
        return;
      }
      this.$confirm('此操作将永久删除该职称, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        customClass: 'demo1',
        type: 'warning'
      }).then(() => {
        remove(this.departmentId).then(res => {
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

    parseTime(createDate) {
      return parseTime(createDate, null);
    },

    jump() {
      this.$router.push("department_save");
    },
  },
}
</script>

<style scoped>
#index_body {
  width: 90%;
  margin: 0px auto;
}

.grid-content-bg-purple-light {
  margin-top: 25px;
}

#index_search {
  width: 30%;
  float: left;
  margin: 30px 0px;
}
</style>
