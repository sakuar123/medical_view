<template>
  <div id="index-body">
    <div id="index-header">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple"><h1>健康百科</h1></div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content-bg-purple-light">
            <el-button type="primary" @click="remove()" plain>删除</el-button>
            <el-button type="primary" @click="jumpToSave()">新增文章</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div id="index-search">
      <el-input placeholder="请输入标题" v-model="keyWorld" class="input-with-select">
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
            prop="articleTitle"
            label="文章标题"
            width="350"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="略缩图"
            width="250">
            <template slot-scope="scope">
              <el-popover placement="top-start" title="" trigger="hover">
                <img :src="scope.row.articleThumbnail" alt="" style="width: 150px;height: 150px">
                <img slot="reference" :src="scope.row.articleThumbnail" style="width: 30px;height: 30px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="articleAuthor"
            label="作者"
            width="250">
          </el-table-column>
          <el-table-column
            label="操作时间">
            <template slot-scope="scope">
              {{ parseTime(scope.row.articleUploadTime) }}
            </template>
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
import {search} from "@/api/article-info";
import alert from "element-ui/packages/alert";
import {reomve} from "@/api/test";
import {parseTime} from "@/utils";

export default {
  name: "article_index",
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
      search({page: this.pageNum, size: this.pageSize, keyWorld: this.keyWorld}).then(res => {
        this.tableData = res.data.records;
        // console.log(this.tableData);
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
      this.$router.push({path: 'article_edit', query: {id: rowId}})
    },
    handleSelectionChange(rows) {
      // this.$alert(rows.id);
      this.rowsId = rows.id;
    },
    jumpToSave() {
      this.$router.push("article_save");
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
    },
    parseTime(createDate) {
      return parseTime(createDate, "");
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
