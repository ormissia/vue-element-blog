<!--博客封面-->
<template>
  <div class="blog-cover">
    <!--头像-->
    <img src="../assets/image/EVE.png" class="head-portrait"/>
    <!--标题-->
    <h1 class="title">Hi, I'm Ormissia.</h1>
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
  name: 'BlogCover',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.blog-cover {
  // 高度和宽度填满整个页面
  width: 100%;
  height: 100%;
  // 内边距
  padding: 150px 100px;
  //宽高100%加入padding会出现滚动条，此样式会消除滚动条
  box-sizing: border-box;
  background-image: linear-gradient(155deg, rgb(209, 130, 130) 1%, rgb(88, 119, 168) 70%);

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
