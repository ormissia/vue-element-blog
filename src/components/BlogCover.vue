<!--博客封面-->
<template>
  <div class="article-cover">
    <div>
      <!--日历区域-->
      <div class="calendar">
        <p id="monthName">{{ monthName }}</p>
        <p id="dayName">{{ dayName }}</p>
        <p id="dayNumber">{{ dayNumber }}</p>
        <p id="year">{{ year }}</p>
      </div>
      <!--头像标题区域-->
      <div>
        <!--头像-->
        <img src="../assets/image/EVE.png" class="head-portrait"/>
        <!--标题-->
        <h1 class="title">Hi, I'm Ormissia.</h1>
      </div>
    </div>
    <!--分割线-->
    <el-divider class="line"></el-divider>
    <!--链接按钮区域-->
    <div>
      <!--博客页面-->
      <router-link to="/index" class="button-float button-one">
        <svg class="icon icon-size-first" aria-hidden="true">
          <use xlink:href="#iconblog"></use>
        </svg>
      </router-link>
      <!--GitHub-->
      <a href="https://github.com/Ormissia" target="_blank">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#icongithub"></use>
        </svg>
      </a>
      <!--ESXI-->
      <a href="https://ormissia.com:13101" target="_blank">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#iconesxi"></use>
        </svg>
      </a>
      <!--Jenkins-->
      <a href="http://ormissia.com:13881" target="_blank">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#iconjenkins"></use>
        </svg>
      </a>
      <!--我的文件-->
      <a href="http://ormissia.com:13880/share/">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#iconwebdav"></use>
        </svg>
      </a>
      <!--emby-->
      <a href="https://github.com/Ormissia" target="_blank">
        <svg class="icon icon-size" aria-hidden="true">
          <use xlink:href="#iconemby"></use>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCover',
  data () {
    return {
      timer: '', // 定义一个定时器的变量
      monthName: new Date(),
      dayName: new Date(),
      dayNumber: new Date(),
      year: new Date()
    }
  },
  created () {
    this.initCalendar()
    const _this = this
    // 初始化日历
    setInterval(function () {
      const lang = navigator.language
      _this.dayNumber = new Date().getDate()
      _this.month = new Date().getMonth()
      _this.dayName = new Date().toLocaleString(lang, { weekday: 'long' })
      _this.monthName = new Date().toLocaleString(lang, { month: 'long' })
      _this.year = new Date().getFullYear()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
  },
  methods: {
    // 初始化日历
    initCalendar () {
      const lang = navigator.language
      this.dayNumber = new Date().getDate()
      this.month = new Date().getMonth()
      this.dayName = new Date().toLocaleString(lang, { weekday: 'long' })
      this.monthName = new Date().toLocaleString(lang, { month: 'long' })
      this.year = new Date().getFullYear()
    }
  }
}
</script>

<style lang="less" scoped>
.article-cover {
  // 高度和宽度填满整个页面
  width: 100%;
  height: 100%;
  // 内边距
  padding: 150px 100px;
  //宽高100%加入padding会出现滚动条，此样式会消除滚动条
  box-sizing: border-box;
  background-image: linear-gradient(155deg, rgb(210, 130, 130) 1%, rgb(88, 119, 168) 70%);

  .calendar {
    margin-top: 20px;
    margin-right: 200px;
    float: right;
    position: relative;
    width: 200px;
    background: #fff;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
    -webkit-box-reflect: below 2px linear-gradient(transparent, transparent, #0004);

    #monthName {
      margin: 0;
      position: relative;
      padding: 5px 10px;
      background: rgb(210, 130, 130) 1%;
      color: #fff;
      font-size: 30px;
      font-weight: 600;
    }

    #dayName {
      margin-top: 20px;
      font-size: 20px;
      font-weight: 300;
      color: #999;
    }

    #dayNumber {
      margin: 0;
      font-size: 80px;
      line-height: 1em;
      font-weight: 700;
      color: #333;
    }

    #year {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: 500;
      color: #999;
    }
  }

  // 头像的样式
  .head-portrait {
    border-radius: 50%;
    width: 240px;
    height: 240px;
  }

  // 标题的样式
  .title {
    // 字体大小
    font-size: 4em;
    // 字体粗细
    font-weight: lighter;
    // 字体颜色
    color: white;
  }

  // 分割线样式
  .line {
    width: 5%;
  }

  // 第一个图标
  .icon-size-first {
    width: 4em;
    height: 4em;
    fill: white;
  }

  // 第二个及以后的图标
  .icon-size {
    width: 4em;
    height: 2.4em;
    fill: white;
  }
}
</style>
