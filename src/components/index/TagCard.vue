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
    <div v-for="i in tagList" :key="i.tagName" @click="filterTags(i.tagId)">
      <el-button>
        <!--标签名字-->
        <el-tag :type="tagIsSelect(i.tagId)">{{ i.tagName }}</el-tag>
        <!--标签包含博客数量-->
        <el-tag type="success">{{ i.totalBlogNum }}</el-tag>
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TagCard',
  data () {
    return {
      // 标签列表
      tagList: [],
      // 选中的tag
      selectTagId: this.transferTagIds
    }
  },
  // 父组件传过来的值，主要用于标签页面根据标签筛选博客
  props: {
    // 传输的tagId数组
    transferTagIds: Number
  },
  methods: {
    tagIsSelect (tagId) {
      if (tagId === this.selectTagId) {
        return 'warning'
      }
      return ''
    },
    // 跳转到标签筛选界面
    filterTags (tagId) {
      this.selectTagId = tagId
      this.$emit('getData', this.selectTagId)
      this.$router.push('/tag/' + tagId)
    },
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

<style lang="less" scoped>
.list-title {
  margin: 0;
}

// 按钮样式
.el-button {
  float: left;
  cursor: pointer;
  padding: 0;
  margin: 3px 5px;

  // 标签圆角置为0
  .el-tag {
    border-radius: 0
  }
}
</style>
