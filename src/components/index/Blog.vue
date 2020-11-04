<!--博客页面-->
<template>
  <el-row :gutter="20">
    <!--左侧文章列表-->
    <el-col :span="16" class="col-left">
      <!--文章列表整体的Card，阴影总是显示-->
      <blog-list></blog-list>
    </el-col>
    <!--右侧推荐区域-->
    <el-col :span="8">
      <recommend-card></recommend-card>
      <tag-card class="card-right"></tag-card>
    </el-col>
  </el-row>
</template>

<script>
// 将文章列表以组件的方式引入
import blogList from './BlogList'
import recommendCard from './RecommendCard'
import TagCard from '@/components/index/TagCard'

export default {
  name: 'Blog',
  components: {
    'blog-list': blogList,
    'recommend-card': recommendCard,
    'tag-card': TagCard
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
