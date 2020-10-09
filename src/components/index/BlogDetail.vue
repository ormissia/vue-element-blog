<template>
  <el-card shadow="always" class="blog-card">
    <h2>{{ $route.params.blogId }}</h2>
    <h4>文章内容</h4>
    {{ markdownContent }}
    <div>
      <viewer :viewer="viewer"/>
    </div>
  </el-card>
</template>

<script>
import { Viewer } from '@toast-ui/vue-editor'
import '@toast-ui/editor/dist/toastui-editor-viewer.css'

export default {
  name: 'ArticleDetail',
  components: {
    viewer: Viewer
  },
  data () {
    return {
      markdownContent: '# your markdown content\n',
      viewer: Viewer({
        el: document.querySelector('#viewer'),
        height: '600px',
        initialValue: '# hello'
      })
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
