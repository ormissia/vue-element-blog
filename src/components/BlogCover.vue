<!--博客封面-->
<template>
  <div class="blog-cover">
    <!--添加背景透明度的div-->
    <div class="background-transparency">
      <!--内容主体区域-->
      <div class="cover-content">
        <!--头像-->
        <img src="../assets/image/EVE.png" class="head-portrait" alt="安红豆">
        <!--头像下的链接-->
        <div>
          <btn-with-num tag-name="按钮" number="3" @btnClick="loadHeadPortrait"
                        style="width: 50px;height: 50px;background: yellow;margin: 1px;float: left;text-align: center">
          </btn-with-num>
          <router-link to="/index"
                       style="width: 50px;height: 50px;background: yellow;margin: 1px;float: left;text-align: center">
            博客
          </router-link>
          <div style="width: 50px;height: 50px;background: yellow;margin: 1px;float: left">2</div>
          <div style="width: 50px;height: 50px;background: yellow;margin: 1px;float: left">3</div>
          <div style="width: 50px;height: 50px;background: yellow;margin: 1px;float: left">4</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCover',
  methods: {
    loadHeadPortrait () {
      console.log('加载头像')
    }
  },
  // 在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
  created () {
    this.loadHeadPortrait()
  },
  // 在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.blog-cover {
  height: 100%;
  // 背景图片
  background-image: url('../assets/image/background-blog-cover.jpg');

  .background-transparency {
    height: 100%;
    //背景透明度
    background-color: rgba(255, 255, 255, 0.2);

    .cover-content {
      // 主体区域内边距
      padding: 100px 0 0 100px;

      .head-portrait {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        //边缘2px
        border: 2px solid pink;
      }
    }
  }
}
</style>
