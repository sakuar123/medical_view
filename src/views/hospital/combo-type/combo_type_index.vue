<template>
  <div id="index_body">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>套餐类型管理</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="jumpTo()">新增套餐类型</el-button>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="comboName"
            label="类型名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="comboDesc"
            label="套餐描述"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
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
import {remove, search} from "@/api/combo-type-info";

export default {
  name: "combo_type_index",
  created() {
    this.search();
  },
  data() {
    return {
      page: 1,
      size: 5,
      total: 0,
      tableData: []
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
      this.$confirm('此操作将永久删除该职称, 是否继续?', '提示', {
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
      this.$router.push({path: "combo_type_edit", query: {id: row.id}});
    },
    jumpTo() {
      this.$router.push("combo_type_save");
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
