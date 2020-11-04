<!--博客页面右侧标签卡片-->
<template>
  <el-card shadow="always"
           style="padding: 0 20px 20px 20px"
           class="card-list">
    <!--分割线-->
    <el-divider>
      <h3 class="list-title">标签</h3>
    </el-divider>
    <!--遍历查询到的tagList-->
    <div v-for="i in tagList" :key="i.tagName">
      <div style="float: left;margin: 3px 5px; cursor: pointer;">
        <!--标签名字-->
        <el-tag>{{ i.tagName }}</el-tag>
        <!--标签包含博客数量-->
        <el-tag type="success">{{ i.totalBlogNum }}</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TagCard',
  data () {
    return {
      // 标签列表
      tagList: []
    }
  },
  methods: {
    // 按照页面分页获取博客列表
    async selectTagByPage () {
      const { data: res } = await this.$http.get('public/selectTagCountBlog')
      this.tagList = res.data
    }
  },
  created () {
    this.selectTagByPage()
  }
}
</script>

<style scoped>
.list-title {
  margin: 0;
}
</style>
