<!--博客页面右侧的推荐文章列表-->
<template>
  <ul class="list">
    <li v-for="i in recommendBlogList" :key="i.blogName">
      {{ i.blogName }}
    </li>
  </ul>
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
        }
      ]
    }
  }
}
// TODO 列表样式
</script>

<style lang="less" scoped>

</style>
