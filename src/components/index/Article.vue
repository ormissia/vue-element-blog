<template>
  <el-row :gutter="20">
    <!--左侧文章列表-->
    <el-col :span="16">
      <!--文章列表整体的Card，阴影总是显示-->
      <el-card shadow="always">
        <div class="infinite-list-wrapper" style="overflow:visible">
          <ul class="list" v-infinite-scroll="loadMoreArticle" infinite-scroll-disabled="disabled">
            <!--遍历articleList生成文章列表-->
            <li v-for="i in articleList" :key="i.articleName" class="list-item">
              <!--文章的Card，当鼠标移入时显示Card-->
              <el-card shadow="hover">
                <div @click="openArticleDetail(i.articleName)">
                  {{ i.articleName }}
                </div>
                <div>
                  {{ i.articleContent }}
                </div>
              </el-card>
            </li>
          </ul>
          <p v-if="loading">正在用力加载中 *。*</p>
          <p v-if="noMore">加载太多啦,嘤嘤嘤~~~</p>
        </div>
      </el-card>
    </el-col>
    <!--右侧推荐区域-->
    <el-col :span="8" style="background-color: yellow">
      <h3>右侧</h3>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      // 默认加载数量
      count: 10,
      // 默认加载10条文章内容
      articleList: [{
        articleName: '标题1',
        articleContent: '内容内容'
      }, {
        articleName: '标题2',
        articleContent: '内容内容'
      }, {
        articleName: '标题3',
        articleContent: '内容内容'
      }, {
        articleName: '标题4',
        articleContent: '内容内容'
      }, {
        articleName: '标题5',
        articleContent: '内容内容'
      }, {
        articleName: '标题6',
        articleContent: '内容内容'
      }, {
        articleName: '标题7',
        articleContent: '内容内容'
      }, {
        articleName: '标题8',
        articleContent: '内容内容'
      }, {
        articleName: '标题9',
        articleContent: '内容内容'
      }, {
        articleName: '标题10',
        articleContent: '内容内容'
      }],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count > 50
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    loadMoreArticle () {
      this.loading = true
      this.count += 1
      this.articleList.push({
        articleName: '标题' + this.count,
        articleContent: '内容内容'
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    openArticleDetail (index) {
      this.$router.push('/articleDetail/' + index)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  // 页面高度设置
  height: 100%;

  .el-col {
    height: 100%;
    cursor: pointer;

    .list {
      // 去掉li前面的点
      list-style: none;
      padding-inline-start: 0;

      .list-item {
        list-style: none;
      }
    }
  }
}
</style>
