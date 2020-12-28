<!--博客列表卡片-->
<template>
  <!--文章列表整体的Card，阴影总是显示-->
  <el-card shadow="always" class="card-list">
    <!--搜索框-->
    <el-input placeholder="请输入内容" v-model="queryInfo.title">
      <template slot="prepend">搜索</template>
      <el-button slot="append" icon="el-icon-search" @click="searchArticle"></el-button>
    </el-input>
    <div class="infinite-list-wrapper" style="overflow:visible">
      <ul v-infinite-scroll="loadMoreArticle"
          infinite-scroll-disabled="disabled"
          class="list">
        <!--遍历articleList生成文章列表-->
        <li v-for="i in articleList" :key="i.articleId" class="list-item">
          <!--文章的Card，当鼠标移入时显示阴影-->
          <el-card shadow="hover" class="card-article">
            <el-row>
              <!--左侧文章相关信息的布局-->
              <el-col class="col-left" :span="16">
                <!--标题-->
                <!--点击跳转到对应的博客页面-->
                <div @click="openArticleDetail(i.articleId)">
                  <h1 class="article-title">{{ i.title }}</h1>
                </div>
                <!--简介-->
                <div class="div-description"
                     @click="openArticleDetail(i.articleId)">
                  <p>{{ i.description }}</p>
                </div>
                <!--底部-->
                <div class="div-bottom">
                  <!--时间戳-->
                  <div style="float: left">
                    {{ i.UpdatedAt }}
                  </div>
                  <!--类型,判断是否为空，不为空时显示-->
                  <el-tag v-if="i.type != null">
                    {{ i.type.typeName }}
                  </el-tag>
                </div>
              </el-col>
              <!--右侧文章首图的布局-->
              <el-col class="col-right" :span="8">
                <el-image alt="博客首图" class="right-img" fit="cover"
                          :src="imgUrl + i.topImage"></el-image>
              </el-col>
            </el-row>
          </el-card>
        </li>
      </ul>
      <p v-if="!noMore"
         v-loading="!noMore"
         element-loading-text="系统正在拼命加载中"
         class="loadingTips">
      </p>
      <p v-if="noMore">----------看到底啦，你要负责----------</p>
    </div>
  </el-card>
</template>

<script>
// 导入全局变量
import { pathway } from '@/assets/js/global'

export default {
  name: 'ArticleList',
  data () {
    return {
      // 从全局变量获取配置的imageUrl
      imgUrl: pathway.imgUrl,
      // 用于获取博客列表的参数对象
      queryInfo: {
        // 搜索框的内容
        title: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 标签筛选的数组
        tagIds: this.transferTagIds,
        // tagIds: [25, 28],
        // 向后端发送请求携带的参数，查询未删除的博客，0;查询推荐的博客-1（代表全部）;查询发布状态的博客1;
        isDeleted: 0,
        isRecommend: -1,
        isPublished: 1
      },
      // 博客列表
      articleList: [],
      // 博客总数
      total: 0,
      // 加载状态，true为忙碌
      loading: false,
      // 继续加载时每次加载的数量
      // 必须使首次加载的pageSize是该值的整数倍
      loadPageSize: 2
    }
  },
  // 监听父组件传过来的值的变化
  watch: {
    // 如果选中的tagId发生变化，则重新发起获取博客列表的HTTP请求
    transferTagIds (val, oldVal) {
      this.selectArticleByPage()
    }
  },
  // 父组件传过来的值，主要用于标签页面根据标签筛选博客
  props: {
    // 传输的tagId数组
    transferTagIds: Number
  },
  computed: {
    // 判断是否还有没加载出来的博客
    noMore () {
      return this.total <= this.queryInfo.pageNum * this.queryInfo.pageSize
    },
    // 是否继续加载
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    loadMoreArticle () {
      // 开始加载时将状态置为true标识忙碌
      this.loading = true

      // 修改查询参数并发起查询
      // 首次加载10篇，则后续加载应该从第三页开始
      if (this.queryInfo.pageNum === 1) {
        // 当pageNum等于1时，为第一次连续加载，将pageNum置为3
        this.queryInfo.pageNum = this.queryInfo.pageSize / this.loadPageSize + 1
        this.queryInfo.pageSize = this.loadPageSize
      } else {
        // 其他情况不是第一次连续加载，则pageNum连续+1
        this.queryInfo.pageNum += 1
      }

      // 调用发起请求的方法
      this.loadMoreArticleByPage()
    },
    // 搜索需要将页面加载参数重置为默认
    searchArticle () {
      // 新建变量保存title
      const titleCache = this.queryInfo.title
      // this.$options.data()   将变量重置为初始值
      this.queryInfo = this.$options.data().queryInfo
      // 将表单重置中的查询参数pageSize，pageNum重置为为默认后将title的值放回去
      this.queryInfo.title = titleCache
      // 发起查询请求
      this.selectArticleByPage()
    },
    // 按照页面分页获取博客列表
    // 首次打开页面时调用
    async selectArticleByPage () {
      const { data: res } = await this.$http.post('article/selectArticleByPage', this.$qs.parse(this.queryInfo))
      this.articleList = res.data.articles
      this.total = res.data.total
    },
    // 连续加载时调用
    async loadMoreArticleByPage () {
      const { data: res } = await this.$http.post('article/selectArticleByPage', this.$qs.parse(this.queryInfo))
      // 当返回值中articleList长度不为0时，添加到this.articleList后面
      if (res.data.dataList.length !== 0) {
        this.articleList = this.articleList.concat(res.data.dataList)
      }

      // 获取返回值之后将状态改为不繁忙忙碌
      this.loading = false
    },
    // 根据博客Id打开博客详情页面
    openArticleDetail (index) {
      this.$router.push('/articleDetail/' + index)
    }
  },
  created () {
    // 页面加载前按照默认分页获取博客列表
    this.selectArticleByPage()
  }
}
</script>

<style lang="less" scoped>
.card-list {

  .list {
    // 去掉li前面的点
    list-style: none;
    padding-inline-start: 0;

    .list-item {
      // 去掉li前面的点
      list-style: none;
      // 鼠标指针样式
      cursor: pointer;

      .card-article {
        // 文字左对齐
        text-align: left;

        .col-left {
          // 内容的右边距
          padding-right: 20px;

          .article-title {
            // 去掉标题标签<h1>的上边距
            margin-top: 0;
          }

          .div-description {
            height: 80px;
          }

          .div-bottom {
            // 垂直居中
            display: flex;
            align-items: center;

            .el-tag {
              // flex内元素居右显示
              margin-left: auto;
            }
          }
        }

        .col-right {

          .right-img {
            width: 100%;
            // 图片高度需要改成card高度
            height: 150px;
          }
        }
      }
    }
  }

  // 加载中提示的控件样式
  .loadingTips {
    height: 30px;
  }
}
</style>
