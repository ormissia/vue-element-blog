<!--博客页面右侧的推荐文章列表-->
<template>
  <el-card shadow="always"
           :body-style="{ padding: '0 20px 20px 20px' }"
           style="padding: 20px 20px 0 20px"
           class="card-list">
    <!--分割线-->
    <el-divider>
      <h3 class="list-title">最新推荐</h3>
    </el-divider>
    <ul class="list">
      <li v-for="i in articleList" :key="i.articleId">
        <el-card shadow="hover"
                 @click.native="openArticleDetail(i.ID)"
                 class="card-article-title">
          <h4 class="article-title">
            {{ i.title }}
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
      // 用于获取博客列表的参数对象
      queryInfo: {
        // 搜索框的内容
        queryStr: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据，推荐文章默认显示6条
        pageSize: 5,
        // 向后端发送请求携带的参数，查询发布状态的博客，1;查询未删除的博客，2
        isPublished: 1,
        isDeleted: 2,
        // 查询推荐的文章
        isRecommend: 1
      },
      // 博客列表
      articleList: []
    }
  },
  methods: {
    openArticleDetail (index) {
      this.$router.push('/articleDetail/' + index)
    },
    // 按照页面分页获取推荐博客列表
    async selectArticleByPage () {
      const { data: res } = await this.$http.post('article/selectArticleByPage', this.$qs.parse(this.queryInfo))
      this.articleList = res.data.articles
    }
  },
  created () {
    this.selectArticleByPage()
  }
}
</script>

<style lang="less" scoped>
.card-list {

  .list-title {
    margin: 0;
  }

  .list {
    // 去掉li前面的点
    list-style: none;
    padding-inline-start: 0;

    .card-article-title {
      // 鼠标指针样式
      cursor: pointer;

      .article-title {
        margin: 0;
      }
    }
  }
}
</style>
