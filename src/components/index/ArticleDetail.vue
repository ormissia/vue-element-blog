<template>
  <el-card shadow="always" class="article-card">
    <h2>{{ $route.params.blogId }}</h2>
    <h4>文章内容</h4>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleDetail'
}
</script>

<style lang="less" scoped>
.article-card {
}
</style>
