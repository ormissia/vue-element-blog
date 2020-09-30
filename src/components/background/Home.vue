<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/')
      // TODO
      // 向后端发送等出请求
      // 登录成功
      // TODO 修改退出登录提示信息为返回值里的信息
      this.$rootMessage({
        showClose: true,
        message: '已退出登录',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
