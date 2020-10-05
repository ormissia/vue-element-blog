<template>
  <el-card shadow="always" class="blog-card">
    <h2>{{ $route.params.blogId }}</h2>
    <h4>文章内容</h4>
    <markdown-it-vue class="md-body" :content="markdownContent" :options="options"/>
  </el-card>
</template>

<script>
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'

export default {
  name: 'ArticleDetail',
  components: {
    MarkdownItVue
  },
  data () {
    return {
      markdownContent: '# your markdown content\n',
      options: {
        markdownIt: {
          linkify: true
        },
        linkAttributes: {
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        }
      }

    }
  }
}
</script>

<style lang="less" scoped>
.blog-card {
  .md-body {
    text-align: start;
  }
}
</style>
