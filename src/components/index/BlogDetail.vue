<!--博客文章页面-->
<template>
  <el-card shadow="always" class="blog-card">
    <h2>{{ this.blogForm.blogTitle }}</h2>
    <div>
      <viewer ref="toastUiEditor"
              :options="viewerOptions"
              class="viewer"/>
      <div>看到底啦，你要负责</div>
    </div>
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

export default {
  name: 'ArticleDetail',
  components: {
    // markdown viewer的组件
    viewer: Viewer
  },
  data () {
    return {
      // 博客保存表单的绑定对象
      blogForm: {
        // 博客Id
        blogId: '',
        // 标题
        blogTitle: '',
        // 页面上的markdown内容
        blogContent: '',
        // 博客简介
        description: '',
        // 当前博客类型
        blogType: '',
        // 当前博客标签
        blogTags: [],
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
      this.$refs.toastUiEditor.invoke('setMarkdown', this.blogForm.blogContent, false)
    },
    // 通过博客Id查询博客信息
    async selectBlogByBlogId (blogId) {
      const { data: res } = await this.$http.post('selectBlogByBlogId', this.$qs.stringify({ blogId: blogId }))
      // 判断返回结果状态值，如果成功获取博客信息，则将博客信息分别赋值给blogForm和oldBlog（用于页面恢复数据）
      if (res.code === 200) {
        this.blogForm.blogId = res.data.blogId
        this.blogForm.blogTitle = res.data.blogTitle
        this.blogForm.blogContent = res.data.blogContent
        this.blogForm.description = res.data.description
        this.blogForm.userId = res.data.user.userId
        // 判断type和tags是否为空，如果为空时不加判断会报错
        if (res.data.type !== null) {
          this.blogForm.blogType = res.data.type.typeName
        }
        if (res.data.tags.length >= 0) {
          for (let i = 0; i < res.data.tags.length; i++) {
            this.blogForm.blogTags.push(res.data.tags[i].tagName)
          }
        }
        this.blogForm.isRecommend = res.data.recommend
        this.blogForm.isPublished = res.data.published

        // 刷新编辑器内容
        this.setMarkdown()
        console.log(this.blogForm)
      }
    }
  },
  created () {
    // 获取跳转参数博客Id
    const blogId = this.$route.params.blogId
    // 通过博客Id获取博客信息，并赋值给双向绑定的数据对象中
    this.selectBlogByBlogId(blogId)
  }
}
</script>

<style lang="less" scoped>
.blog-card {
  .viewer {
    text-align: start;
  }
}
</style>
