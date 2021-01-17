<!--博客页面右侧的推荐文章列表-->
<template>
  <el-card shadow="always"
           :body-style="{ padding: '0 20px 20px 20px' }"
           style="padding: 20px 20px 0 20px"
           class="card-list">
    <el-divider>
      <a href="https://beian.miit.gov.cn"
         target="_blank"
         style="text-decoration:none;font-size: smaller;white-space:nowrap;">
        鲁ICP备20008823号
      </a>
    </el-divider>
  </el-card>
</template>

<script>
export default {
  name: 'RecordInfo'
}
</script>

<style lang="less" scoped>
.card-list {
}
</style>
