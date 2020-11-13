<!--博客封面-->
<template>
  <div class="blog-cover">
    <!--按钮主体区域-->
    <!--第一行-->
    <div class="cover-content-one">
      <!--链接-->
      <div class="button-float-container">
        <router-link to="/index" class="button-float button-one">
          <svg class="icon icon-blog" aria-hidden="true">
            <use xlink:href="#iconblog"></use>
          </svg>
        </router-link>
      </div>
      <div class="button-float-container">
        <a href="http://ormissia.com:13881" target="_blank" class="button-float button-two">
          <svg class="icon icon-jenkins" aria-hidden="true">
            <use xlink:href="#iconjenkins"></use>
          </svg>
        </a>
      </div>
      <div class="button-float-container">
        <a href="https://github.com/Ormissia" target="_blank" class="button-float button-three">
          <svg class="icon icon-github" aria-hidden="true">
            <use xlink:href="#icongithub"></use>
          </svg>
        </a>
      </div>
      <div class="button-float-container">
        <a href="https://ormissia.com:13101" target="_blank" class="button-float button-four">
          <svg class="icon icon-esxi" aria-hidden="true">
            <use xlink:href="#iconesxi"></use>
          </svg>
        </a>
      </div>
    </div>
    <!--第二行-->
    <div class="cover-content-two"></div>
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
  background-color: #fff7f3;

  // 第一行
  .cover-content-one {
    padding-top: 15%;
    display: flex;

    .button-float-container {
      width: 25%;
      height: 300px;
      position: relative;
      border: 1px solid #ba9f93;

      .button-float {
        width: 95%;
        height: 95%;
        position: absolute;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          animation-play-state: paused;
        }
      }

      .button-one {
        background-color: #b13460;
        animation: horizontal 1s linear 0s infinite alternate, vertical 1.1s linear 0s infinite alternate;

        .icon-blog {
          fill: pink;
        }
      }

      .button-two {
        background-color: #f0d6b7;
        animation: horizontal 1.1s linear 0s infinite alternate, vertical 1s linear 0s infinite alternate;

        .icon-jenkins {
          fill: #d33833;
        }
      }

      .button-three {
        background-color: #24292e;
        animation: horizontal 1.05s linear 0s infinite alternate, vertical 1.15s linear 0s infinite alternate;

        .icon-github {
          fill: #ffffff;
        }
      }

      .button-four {
        background-color: #408ecc;
        animation: horizontal 1.15s linear 0s infinite alternate, vertical 1.05s linear 0s infinite alternate;

        .icon-esxi {
          fill: #ffd24f;
        }
      }
    }
  }

  //第二行
  .cover-content-two {
    display: flex;
  }

}

@keyframes horizontal {
  0% {
    left: 0;
  }
  100% {
    left: 5%;
  }
}

@keyframes vertical {
  0% {
    top: 0;
  }
  100% {
    top: 5%;
  }
}
</style>
