<template>
  <el-row :gutter="20">
    <!--左侧文章列表-->
    <el-col :span="16" class="col-left">
      <!--文章列表整体的Card，阴影总是显示-->
      <el-card shadow="always" class="card-list">
        <div class="infinite-list-wrapper" style="overflow:visible">
          <ul class="list" v-infinite-scroll="loadMoreBlog" infinite-scroll-disabled="disabled">
            <!--遍历blogList生成文章列表-->
            <li v-for="i in blogList" :key="i.blogName" class="list-item">
              <!--文章的Card，当鼠标移入时显示Card-->
              <el-card shadow="hover" class="card-blog">
                <el-row>
                  <!--左侧文章相关信息的布局-->
                  <el-col :span="16">
                    <!--标题-->
                    <!--点击跳转到对应的博客页面-->
                    <div @click="openBlogDetail(i.blogName)">
                      <h1 class="blog-title">{{ i.blogName }}</h1>
                    </div>
                    <!--简介-->
                    <div @click="openBlogDetail(i.blogName)">
                      <p>{{ i.blogContent }}</p>
                    </div>
                    <!--底部-->
                    <div style="bottom: 0">
                      <!--时间戳-->
                      <div style="float: left">
                        时间戳
                      </div>
                      <!--标签-->
                      <div style="float: right">
                        标签
                      </div>
                    </div>
                  </el-col>
                  <!--左侧文章相关信息的布局-->
                  <el-col :span="8">
                    <img :src="i.blogImg" alt="博客首图" @click="openBlogDetail(i.blogName)"/>
                  </el-col>
                </el-row>
              </el-card>
            </li>
          </ul>
          <p v-if="loading">正在用力加载中 *。*</p>
          <p v-if="noMore">加载太多啦,嘤嘤嘤~~~</p>
        </div>
      </el-card>
    </el-col>
    <!--右侧推荐区域-->
    <el-col :span="8" style="background-color: yellow">
      <h3>右侧</h3>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Blog',
  data () {
    return {
      // 默认加载数量
      count: 10,
      // 默认加载10条文章内容
      blogList: [{
        blogName: '标题1',
        blogContent: '内容内容',
        // 开发时候应使用webpack编译后的文件名
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题2',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题3',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题4',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题5',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题6',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题7',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题8',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题9',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }, {
        blogName: '标题10',
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      }],
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count > 50
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    loadMoreBlog () {
      this.loading = true
      this.count += 1
      this.blogList.push({
        blogName: '标题' + this.count,
        blogContent: '内容内容',
        blogImg: 'img/background-index.c5c5c93f.jpg'
      })
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    openBlogDetail (index) {
      this.$router.push('/blogDetail/' + index)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  // 页面高度设置
  height: 100%;

  .col-left {
    height: 100%;
    cursor: pointer;

    .card-list {

      .list {
        // 去掉li前面的点
        list-style: none;
        padding-inline-start: 0;

        .list-item {
          // 去掉li前面的点
          list-style: none;

          .card-blog {
            // 文字左对齐
            text-align: left;

            .blog-title {
              // 去掉标题标签<h1>的上边距
              margin-top: 0;
            }
          }
        }
      }
    }
  }
}
</style>
