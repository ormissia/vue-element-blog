<!--博客页面右侧的推荐文章列表-->
<template>
  <el-card shadow="always"
           :body-style="{ padding: '0 20px 20px 20px' }"
           class="card-list">
    <div slot="header">
      <h3 class="list-title">推荐文章</h3>
    </div>
    <ul class="list">
      <li v-for="i in recommendBlogList" :key="i.blogName">
        <el-card shadow="hover"
                 @click.native="openBlogDetail(i.blogName)"
                 class="card-blog-title">
          <h4 class="blog-title">
            {{ i.blogName }}
          </h4>
        </el-card>
      </li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'RecommendList',
  data () {
    return {
      recommendBlogList: [
        {
          blogName: '标题1',
          blogContent: '内容内容',
          // 开发时候应使用webpack编译后的文件名
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }, {
          blogName: '标题2',
          blogContent: '内容内容',
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }, {
          blogName: '标题3',
          blogContent: '内容内容',
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }, {
          blogName: '标题4',
          blogContent: '内容内容',
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }, {
          blogName: '标题5',
          blogContent: '内容内容',
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }, {
          blogName: '标题6',
          blogContent: '内容内容',
          blogImg: 'img/background-index.c5c5c93f.jpg'
        }
      ]
    }
  },
  methods: {
    openBlogDetail (index) {
      this.$router.push('/blogDetail/' + index)
    }
  }
}
</script>

<style lang="less" scoped>
.card-list {

  .list-title{
    margin: 0;
  }

  .list {
    // 去掉li前面的点
    list-style: none;
    padding-inline-start: 0;

    .card-blog-title {
      // 鼠标指针样式
      cursor: pointer;

      .blog-title {
        margin: 0;
      }
    }
  }
}
</style>
