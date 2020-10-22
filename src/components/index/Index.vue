<!--前台Index主页面-->
<template>
  <el-container class="index-container">
    <!--头部区域-->
    <el-header>
      <!--使用layout布局分割头部区域-->
      <el-row>
        <el-col :span="2" :offset="4">
          <router-link to="/">
            <img class="head-portrait" src="../../assets/image/EVE.png" alt="ormissia">
          </router-link>
        </el-col>
        <el-col :span="12">
          <!--头部菜单-->
          <el-menu
              mode="horizontal"
              text-color="#fff"
              active-text-color="#ffd04b"
              background-color="#545c64"
              :router="true"
              :default-active="$route.path"
              @select="handleSelect">
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/article">文章</el-menu-item>
            <el-menu-item index="/type">分类</el-menu-item>
            <el-menu-item index="/timeline">历程</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="openLoginDialog">登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!--主体区域-->
    <el-main class="main-body">
      <!--登录的dialog-->
      <el-dialog title="登录" width="30%" :visible.sync="dialogVisible">
        <!--登录表单区-->
        <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
          <!--用户名-->
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" v-model="loginForm.password"
                      prefix-icon="el-icon-info" type="password"></el-input>
          </el-form-item>
          <!--按钮-->
          <el-form-item class="login-button">
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--使用layout布局分割内容区域-->
      <el-row class="content-row">
        <el-col :span="16" :offset="4">
          <!--内容区域-->
          <!--路由占位符-->
          <router-view></router-view>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      // 登录Dialog打开关闭的标记
      dialogVisible: false,
      // 这是登录表单的绑定对象
      loginForm: {
        username: '1',
        password: '1'
      },
      // 这是表单验证规则对象
      loginFormRules: {
        // 验证用户名是否为空
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        // 验证密码是否为空
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 导航栏菜单点击事件
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    // 打开登录Dialog
    openLoginDialog () {
      this.dialogVisible = true
    },
    // 点击登录Dialog的登录按钮
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        // 发送请求之前需要对密码加密
        const { data: res } = await this.$http.post('login', this.$qs.parse(this.loginForm))
        // console.log(res)
        if (res.code === 405) {
          // 用户不存在登录失败提示
          return this.$rootMessage({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        } else if (res.code === 201) {
          // 密码错误登录失败提示
          return this.$rootMessage({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
        // 登录成功提示
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'success'
        })
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        window.sessionStorage.setItem('userId', res.data.userId)
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        await this.$router.push('/background/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index-container {
  height: 100%;
  // 背景图片
  background-image: url('../../assets/image/background-index.jpg');

  .el-header {
    background-color: #545c64;
    text-align: center;
    line-height: 60px;
    padding: 0;

    .el-row {

      .head-portrait {
        height: 50px;
        border-radius: 50%;
        margin-top: 3px;
        float: right;
        margin-right: 20px;
        //边缘2px
        border: 2px solid pink;
        transition: all 0.4s;

        &:hover {
          transform: scale(1.1);
        }
      }

      // TODO 需要解决导航栏菜单自动换行的问题
      .el-menu {

        .el-menu-item {
          width: auto;
          margin: 0 20px;
        }
      }

      .login-button {
        display: flex;
        justify-content: flex-start;
      }
    }
  }

  .main-body {
    text-align: center;
    line-height: 100%;
    // 背景图片透明度
    background-color: rgba(255, 255, 255, 0.3);

    .content-row {
      height: 100%;
    }
  }

  .el-footer {
    background-color: #B3C0D1;
    text-align: center;
    line-height: 60px;
  }
}
</style>
