<template>
  <el-container class="index-container">
    <!--头部区域-->
    <el-header>
      <!--头部菜单-->
      <el-menu
        class="header-menu"
        mode="horizontal"
        @select="handleSelect"
        text-color="#fff"
        active-text-color="#ffd04b"
        background-color="#545c64"
        :default-active="activeIndex">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">分类</el-menu-item>
        <el-menu-item index="3">时间轴</el-menu-item>
        <el-menu-item index="0">关于我</el-menu-item>
      </el-menu>
    </el-header>
    <!--主体区域-->
    <el-main>Main</el-main>
    <!--底部区域-->
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
}

.el-header {
  background-color: #B3C0D1;
  text-align: center;
  line-height: 60px;
  padding: 0;
}

.header-menu {
  background-color: #545c64;
  width: 100%;
}

.el-main {
  text-align: center;
  line-height: 100%;
}

.el-footer {
  background-color: #B3C0D1;
  text-align: center;
  line-height: 60px;
}
</style>
