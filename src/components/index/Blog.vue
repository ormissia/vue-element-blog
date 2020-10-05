<template>
  <el-row :gutter="20">
    <!--左侧文章列表-->
    <el-col :span="16">
      <!--文章列表整体的Card，阴影总是显示-->
      <el-card shadow="always">
        <div class="infinite-list-wrapper" style="overflow:visible">
          <ul class="list" v-infinite-scroll="loadMoreBlog" infinite-scroll-disabled="disabled">
            <!--遍历blogList生成文章列表-->
            <li v-for="i in blogList" :key="i.blogName" class="list-item">
              <!--文章的Card，当鼠标移入时显示Card-->
              <el-card shadow="hover">
                <div @click="openBlogDetail(i.blogName)">
                  {{ i.blogName }}
                </div>
                <div>
                  {{ i.blogContent }}
                </div>
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
        blogContent: '内容内容'
      }, {
        blogName: '标题2',
        blogContent: '内容内容'
      }, {
        blogName: '标题3',
        blogContent: '内容内容'
      }, {
        blogName: '标题4',
        blogContent: '内容内容'
      }, {
        blogName: '标题5',
        blogContent: '内容内容'
      }, {
        blogName: '标题6',
        blogContent: '内容内容'
      }, {
        blogName: '标题7',
        blogContent: '内容内容'
      }, {
        blogName: '标题8',
        blogContent: '内容内容'
      }, {
        blogName: '标题9',
        blogContent: '内容内容'
      }, {
        blogName: '标题10',
        blogContent: '内容内容'
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
        blogContent: '内容内容'
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

  .el-col {
    height: 100%;
    cursor: pointer;

    .list {
      // 去掉li前面的点
      list-style: none;
      padding-inline-start: 0;

      .list-item {
        list-style: none;
      }
    }
  }
}
</style>
