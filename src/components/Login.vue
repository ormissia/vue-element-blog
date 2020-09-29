<template>
  <div class="login_container">
    <div class="login_box">
      <!--登录表单区-->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef" class="login_form">
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
        <el-form-item class="login_btns">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 这是登录表单的绑定对象
      loginForm: {
        username: '',
        password: ''
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
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        // 发送请求之前需要对密码加密
        const { data: res } = await this.$http.post('login', this.$qs.stringify(this.loginForm))
        // console.log(res)
        if (res.status === 405) {
          // 登录失败，用户不存在
          return this.$rootMessage({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        } else if (res.status === 201) {
          // 登录失败，密码错误
          return this.$rootMessage({
            showClose: true,
            message: res.message,
            type: 'error'
          })
        }
        // 登录成功
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'success'
        })
        // 1、将登陆成功之后的token, 保存到客户端的sessionStorage中; localStorage中是持久化的保存
        //   1.1 项目中出现了登录之外的其他API接口，必须在登陆之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2、通过编程式导航跳转到后台主页, 路由地址为：/home
        await this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>

.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #5e85a7;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.login_btns {
  display: flex;
  justify-content: flex-end;
}

</style>
