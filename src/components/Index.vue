<template>
  <el-container class="index-container">
    <!--头部区域-->
    <el-header>
      <!--使用layout布局分割头部区域-->
      <el-row>
        <el-col :span="2" :offset="6">
          <router-link to="/">
            <img class="logo" src="../assets/logo.png" alt="ormissia">
          </router-link>
        </el-col>
        <el-col :span="8">
          <!--头部菜单-->
          <el-menu
            mode="horizontal"
            text-color="#fff"
            active-text-color="#ffd04b"
            background-color="#545c64"
            :default-active="activeIndex"
            @select="handleSelect">
            <el-menu-item index="0">首页</el-menu-item>
            <el-menu-item index="1">文章</el-menu-item>
            <el-menu-item index="2">分类</el-menu-item>
            <el-menu-item index="3">历程</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="login">登录</el-button>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
    </el-header>
    <!--主体区域-->
    <el-main>
      <!--需要实现根据顶部导航栏的跳转实现内容的替换-->
      Main
    </el-main>
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
    // 导航栏菜单点击事件
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    login () {
      console.log(123)
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
}

.el-header {
  background-color: #545c64;
  text-align: center;
  line-height: 60px;
  padding: 0;

  .el-row {
    .logo {
      height: 50px;
      border-radius: 50%;
      margin-top: 5px;
      float: right;
      margin-right: 20px;
    }
  }
}

.el-menu-item {
  width: 150px;
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
