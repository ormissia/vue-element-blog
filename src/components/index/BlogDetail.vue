<!--博客文章页面-->
<template>
  <el-card shadow="always" class="blog-card">
    <h2>{{ $route.params.blogId }}</h2>
    <div>
      <viewer :initialValue='markdownContent'
              :options="viewerOptions"
              class="viewer"/>
      <div>=======================</div>
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
      // 要显示在页面上的markdown内容
      markdownContent: '```js\n' +
        'console.log(\'foo\')\n' +
        '```\n' +
        '```javascript\n' +
        'console.log(\'bar\')\n' +
        '```\n' +
        '```html\n' +
        '<div id="editor"><span>baz</span></div>\n' +
        '```\n' +
        '```wrong\n' +
        '[1 2 3]\n' +
        '```\n' +
        '```clojure\n' +
        '[1 2 3]\n' +
        '```' +
        '\n' +
        '![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)\n' +
        '\n' +
        '# Awesome Editor!\n',
      // markdown Viewer的设置属性对象
      viewerOptions: {
        usageStatistics: false,
        plugins: [
          [codeSyntaxHightlight, { hljs }]
        ]
      }
    }
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
