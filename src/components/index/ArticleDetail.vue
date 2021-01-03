<!--博客文章页面-->
<template>
  <el-card shadow="always" class="article-card">
    <!--博客首图-->
    <el-image alt="博客首图" class="image-top" fit="cover"
              :src="imgUrl + this.articleForm.topImage"></el-image>
    <h1>{{ this.articleForm.title }}</h1>
    <!--分割线-类型-->
    <el-divider>{{ this.articleForm.typeName }}</el-divider>
    <!--标签-->
    <el-tag v-for="i in articleForm.articleTags" :key="i.tagId">{{ i }}</el-tag>
    <!--分割线-创建日期-->
    <el-divider>{{ this.articleForm.CreatedAt }}</el-divider>
    <div>
      <viewer ref="toastUiEditor"
              :options="viewerOptions"
              class="viewer"/>
    </div>
    <!--分割线-->
    <el-divider>就这么多了，要不看点别的？</el-divider>
  </el-card>
</template>

<script>
// 导入markdown查看组件
import { Viewer } from '@toast-ui/vue-editor'
// 导入markdown的toast ui样式
import '@toast-ui/editor/dist/toastui-editor-viewer.css'
// TODO 代码高亮不生效
// toast ui的代码高亮组件
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight'
// 代码高亮
import hljs from 'highlight.js'

import { pathway } from '@/assets/js/global'

export default {
  name: 'ArticleDetail',
  components: {
    // markdown viewer的组件
    viewer: Viewer
  },
  data () {
    return {
      // 从全局变量获取配置的imageUrl
      imgUrl: pathway.imgUrl,
      // 博客保存表单的绑定对象
      articleForm: {
        // 博客Id
        ID: 0,
        // 标题
        title: '',
        // 创建时间
        CreatedAt: '',
        // 最后修改时间
        UpdatedAt: '',
        // 博客首图
        topImage: '',
        // 页面上的markdown内容
        content: '',
        // 博客简介
        description: '',
        // 当前博客类型
        typeName: '',
        // 当前博客标签
        articleTags: [],
        // 是否推荐
        isRecommend: false,
        // 是否发布
        isPublished: false,
        // 用户Id
        userId: ''
      },
      // markdown Viewer的设置属性对象
      viewerOptions: {
        usageStatistics: false,
        plugins: [
          [codeSyntaxHightlight, { hljs }]
        ]
      }
    }
  },
  methods: {
    // 设置编辑器的内容
    setMarkdown () {
      this.$refs.toastUiEditor.invoke('setMarkdown', this.articleForm.content, false)
    },
    // 通过博客Id查询博客信息
    async selectArticleById (articleId) {
      const { data: res } = await this.$http.post('article/selectArticleById', this.$qs.stringify({ articleId: articleId }))
      // 判断返回结果状态值，如果成功获取博客信息，则将博客信息分别赋值给articleForm和oldArticle（用于页面恢复数据）
      if (res.code === 200) {
        this.articleForm.ID = res.data.ID
        this.articleForm.CreatedAt = res.data.CreatedAt
        this.articleForm.UpdatedAt = res.data.UpdatedAt
        this.articleForm.topImage = res.data.topImage
        this.articleForm.title = res.data.title
        this.articleForm.content = res.data.content
        this.articleForm.description = res.data.description
        this.articleForm.userId = res.data.user.userId
        // 判断type和tags是否为空，如果为空时不加判断会报错
        if (res.data.type !== null) {
          this.articleForm.typeName = res.data.type.typeName
        }
        if (res.data.tags.length >= 0) {
          for (let i = 0; i < res.data.tags.length; i++) {
            this.articleForm.articleTags.push(res.data.tags[i].tagName)
          }
        }
        this.articleForm.isRecommend = res.data.recommend
        this.articleForm.isPublished = res.data.published

        // 刷新编辑器内容
        this.setMarkdown()
      }
    }
  },
  created () {
    // 获取跳转参数博客Id
    const articleId = this.$route.params.articleId
    // 通过博客Id获取博客信息，并赋值给双向绑定的数据对象中
    this.selectArticleById(articleId)
  }
}
</script>

<style lang="less" scoped>
.article-card {
  // 博客首图
  .image-top {
    width: 100%;
    height: 500px;
  }

  // 标签
  .el-tag {
    margin: 0 5px;
  }

  // Markdown查看器
  .viewer {
    text-align: start;
  }
}
</style>
