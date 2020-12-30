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
        <el-tag type="success">{{ i.articles.length }}</el-tag>
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
      selectTagId: this.transferTagIds,
      // 用于查询标签列表的参数对象
      queryInfo: {
        // 搜索框的内容
        queryStr: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 9999,
        // 向后端发送请求携带的参数，查询未删除的标签，false
        isDeleted: false
      }
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
      const { data: res } = await this.$http.post('tag/selectTagByPage', this.$qs.parse(this.queryInfo))
      // TODO 错误处理
      this.tagList = res.data.dataList
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
