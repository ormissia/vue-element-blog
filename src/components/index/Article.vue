<!--博客页面-->
<template>
  <el-row :gutter="20">
    <!--左侧文章列表-->
    <el-col :span="16" class="col-left">
      <!--文章列表整体的Card，阴影总是显示-->
      <article-list></article-list>
    </el-col>
    <!--右侧推荐区域-->
    <el-col :span="8">
      <recommend-card></recommend-card>
      <tag-card class="card-right"></tag-card>
      <record-info class="card-right"></record-info>
    </el-col>
  </el-row>
</template>

<script>
// 将文章列表以组件的方式引入
import ArticleList from './ArticleList'
import RecommendCard from './RecommendCard'
import TagCard from '@/components/index/TagCard'
import RecordInfo from '@/components/index/RecordInfo'

export default {
  name: 'Article',
  components: {
    'article-list': ArticleList,
    'recommend-card': RecommendCard,
    'tag-card': TagCard,
    'record-info': RecordInfo
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.el-row {
  // 页面高度设置
  height: 100%;

  .col-left {
    height: 100%;
  }

  .card-right{
    margin-top: 20px;
  }
}
</style>
