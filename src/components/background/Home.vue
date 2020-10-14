<!--后台主页面，登录后跳转至此-->
<template>
  <el-container class="home-container">
    <!--左侧区域-->
    <el-aside width="200px">
      <el-container class="left-container">
        <el-header class="left-header">
          安红豆的后台管理
        </el-header>
        <el-main class="left-nav">
          <!--侧边栏菜单-->
          <el-menu
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="true"
              :router="true"
              :default-active="$route.path"
              class="left-menu"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
            <!--一级菜单-->
            <el-submenu v-for="item in menuItems"
                        :index="item.path"
                        :key="item.id">
              <!--一级菜单模板-->
              <template slot="title">
                <!--图标-->
                <i class="el-icon-location"></i>
                <!--文本-->
                <span>{{ item.menuName }}</span>
              </template>
              <!--二级菜单-->
              <el-menu-item v-for="subItem in item.children"
                            :index="subItem.path"
                            :key="subItem.id">
                <template slot="title">
                  <!--图标-->
                  <i class="el-icon-location"></i>
                  <!--文本-->
                  <span>{{ subItem.menuName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-main>
      </el-container>
    </el-aside>
    <!--右侧区域-->
    <el-container class="right-container">
      <el-header class="right-header">
        <div></div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-main class="right-main">
        <!--路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      // 导航栏菜单数据的对象
      menuItems: [
        {
          // 导航栏的index只接收字符串（或者使用时拼接字符串 :index="item.id+''"）
          id: '1',
          menuName: '博客',
          path: '',
          children: [
            {
              id: '101',
              menuName: '博客管理',
              path: '/background/blogManagement'
            },
            {
              id: '102',
              menuName: '类型管理',
              path: '/background/typeManagement'
            },
            {
              id: '103',
              menuName: '标签管理',
              path: '123'
            }
          ]
        },
        {
          id: '2',
          menuName: '数据',
          path: '12313',
          children: [
            {
              id: '201',
              menuName: '数据管理1',
              path: '12321321'
            },
            {
              id: '202',
              menuName: '数据管理2',
              path: '3123'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log('open', key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log('close', key, keyPath)
    },
    // 退出登录的方法
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/index')
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
.home-container {
  height: 100%;
  // 背景图片
  background-image: url('../../assets/image/background-index.jpg');

  // 左侧导航栏区域
  .el-aside {

    .left-container {
      height: 100%;

      // 导航栏区域头部
      .left-header {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        background-color: #878f9c;
      }

      // 导航栏区域主体
      .left-nav {
        background-color: #545c64;
        padding: 0;

        .left-menu {
          border-right: 0;
        }
      }
    }
  }

  // 右侧区域
  .right-container {

    // 右侧头部
    .right-header {
      padding: 0 20px 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #777f89;
    }

    // 右侧主体
    .right-main {
    }
  }
}
</style>
