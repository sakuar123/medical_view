<template>
  <div id="bodys">
    <h1>新增文章</h1>
    <div id="box-card">
      <el-form :model="entity" ref="ruleForm" :rules="rules" label-width="100px">
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input v-model="entity.articleTitle"></el-input>
        </el-form-item>
        <el-form-item label="上传缩略图">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :file-list="fileList"
            :auto-upload="false"
            :http-request="uploadFile"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="作者" prop="articleAuthor">
          <el-input v-model="entity.articleAuthor"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="articleContent">
          <el-input type="textarea" v-model="entity.articleContent"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="entity.articleState"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="上传时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="entity.articleUploadTime"
                          style="width: 100%;"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('ruleForm')">保存</el-button>
          <el-button @click="jumpTo()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {create, get, update} from "@/api/article-info";

export default {
  name: "article_edit",
  data() {
    return {
      value1: "",
      imageUrl: '',
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      entity: {
        articleTitle: "",
        articleAuthor: "",
        articleContent: "",
        articleState: "",
        articleUploadTime: "",
        articleThumbnailFile: "",
      },
      value: true,
      rules: {
        articleTitle: [{required: true, message: '请输入公告标题', trigger: 'blur'}],
        articleAuthor: [{required: true, message: '请输入公告内容', trigger: 'change'}],
        articleContent: [{required: true, message: '请输入公告内容', trigger: 'change'}],
      },
    }
  },
  created() {
    this.get(this.$route.query.id);
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          update(this.entity).then(res => {
            this.$alert(res.data);
            this.jumpTo();
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    jumpTo() {
      this.$router.push("article_index");
    },
    get(id) {
      get(id).then(res => {
        this.entity = res.data;
        this.imageUrl = res.data.articleThumbnail;
      }).catch(err => {
        console.log(err);
      })
    },
  },
}
</script>

<style scoped>
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
  width: 480px;
}

#bodys {
  width: 80%;
  margin: 0px auto;
}

#box-card {
  width: 30%;
}
</style>
