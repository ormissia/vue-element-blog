<!--博客管理组件-->
<template>
  <div>博客管理组件
    <el-button type="primary"
               :plain="false"
               @click="openBlogEditor('new')">
      又有新知识了
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'BlogManagement',
  methods: {
    openBlogEditor (index) {
      this.$router.push('/blogEditor/' + index)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
