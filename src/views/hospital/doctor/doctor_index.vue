<template>
  <div id="index_body">
    <div id="index_header">
      <el-col :span="18">
        <div class="grid-content bg-purple"><h1>医生管理</h1></div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content-bg-purple-light">
          <el-button type="primary" @click="remove()" plain>删除</el-button>
          <el-button @click="jump()" type="primary">新增医生信息</el-button>
        </div>
      </el-col>
    </div>
    <div id="index_search">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-select v-model="departmentId" slot="prepend" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.departmentId"
                :label="item.departmentName"
                :value="item.departmentId">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-input
              placeholder="请输入医生名称"
              v-model="keyWorld"
              clearable
              class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
        </el-col>
      </el-row>
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
            prop="doctorName"
            label="医生姓名"
            width="150">
          </el-table-column>
          <el-table-column
            label="医生头像"
            width="100">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img :src="scope.row.doctorImg" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.doctorImg" style="width: 30px;height: 30px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="hospitalName"
            label="院区"
            width="100">
          </el-table-column>
          <el-table-column
            prop="professionalTitleName"
            label="职称"
            width="150">
          </el-table-column>
          <el-table-column
            prop="departmentName"
            label="科室"
            width="100">
          </el-table-column>
          <el-table-column
            label="标签"
            width="250">
            <template slot-scope="scope">
              <span style="margin: 0px 10px " v-for="(index,item) in scope.row.doctorLable.split(',')">
                <el-tag type="success">{{ index }}</el-tag>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="doctorDesc"
            label="医生简介"
            width="150"
            :show-overflow-tooltip="true">
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
import {getDepartmentInfo, remove} from "@/api/department-info";
import {search} from "@/api/doctors_info";
import {parseTime} from "@/utils/index";

export default {
  name: "doctor_index",
  created() {
    this.search();
    this.getDepartmentInfo();
  },
  data() {
    return {
      keyWorld: "",
      templateSelection: "",
      page: 1,
      size: 5,
      total: 0,
      departmentId: "",
      tableData: [],
      options: [],
    }
  },
  methods: {
    search() {
      search({page: this.page, size: this.size, keyWorld: this.keyWorld}).then(res => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      }).catch();
    },

    getDepartmentInfo() {
      getDepartmentInfo().then(res => {
        this.options = res.data;
      }).catch(err => {
        console.log(err);
      });
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
      this.$router.push("doctor_save");
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
  width: 35%;
  float: left;
  margin: 30px 0px;
}
</style>
