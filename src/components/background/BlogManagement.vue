<!--博客管理组件-->
<template>
  <el-card shadow="always" class="management-card">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/blogManagement' }">后台</el-breadcrumb-item>
      <el-breadcrumb-item>博客</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--顶部搜索框区域-->
    <el-row :gutter="20">
      <el-col :span="18">
        <!--搜索框-->
        <el-input placeholder="请输入内容" v-model="queryInfo.queryStr">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!--跳转到新建博客页面的按钮-->
        <el-button type="primary"
                   :plain="false"
                   @click="openBlogEditor('-1')"
                   class="btn-add-blog">
          奇怪的知识又增加了（新建博客）
        </el-button>
      </el-col>
    </el-row>
    <!--博客列表-->
    <el-table :data="blogList"
              :stripe="true"
              :border="true"
              style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="blogTitle" label="标题"></el-table-column>
      <el-table-column prop="createDate" label="创建时间"></el-table-column>
      <el-table-column prop="lastEditDate" label="修改时间"></el-table-column>
      <el-table-column prop="type.typeName" label="类型"></el-table-column>
      <el-table-column prop="tags" label="标签"></el-table-column>
      <el-table-column label="状态">
        <!--通过作用域插槽将boolean值变成控件的开关状态-->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.published"
                     active-text="发布"
                     inactive-text="草稿"
                     @change="saveBlog(scope.row.blogId,scope.row.published)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!--通过作用域插槽添加操作按钮-->
        <template slot-scope="scope">
          <!--修改按钮-->
          <el-tooltip effect="dark"
                      content="总感觉不得劲，得改下"
                      placement="top"
                      :enterable="false">
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="small"
                       @click="openBlogEditor(scope.row.blogId)">
            </el-button>
          </el-tooltip>
          <!--删除按钮-->
          <el-tooltip effect="dark"
                      content="不要了，删掉"
                      placement="top"
                      :enterable="false">
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="small"
                       @click="deleteBlogByBlogId(scope.row.blogId)">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--分页区域-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-size="queryInfo.pageSize"
        :page-sizes="[3, 5, 10, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'BlogManagement',
  data () {
    return {
      // 用于获取博客列表的参数对象
      queryInfo: {
        // 搜索框的内容
        queryStr: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      // 一共多少条数据
      total: 0,
      blogList: []
    }
  },
  methods: {
    openBlogEditor (index) {
      this.$router.push('/background/blogEditor/' + index)
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // 把改变后的pageSize保存到对应变量中
      this.queryInfo.pageSize = newSize
      // 每页数据改变后重新发起请求获取当前页数据
      this.selectBlogByPage()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPageNum) {
      this.queryInfo.pageNum = newPageNum
      // 页码值改变后重新发起请求来获取当前页面数据
      this.selectBlogByPage()
    },
    async saveBlog (blogId, isPublished) {
      const blog = {
        blogId: blogId,
        isPublished: isPublished
      }
      // 使用修改保存博客的接口，传入数据创建一个博客对象，只包含博客Id和是否发布的信息
      const { data: res } = await this.$http.post('saveBlog', this.$qs.parse(blog))
      // 根据返回值判断是否保存成功，若成功则提示修改成功的消息
      if (res.code === 200) {
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'success'
        })
      } else {
        // 当状态码不是200的时候为修改失败，提示修改失败的消息
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    // 根据博客Id发起删除博客的请求
    async deleteBlogByBlogId (blogId) {
      const { data: res } = await this.$http.delete('deleteBlogByBlogId', blogId)
      console.log(res)
    },
    // 按照页面分页获取博客列表
    async selectBlogByPage () {
      const { data: res } = await this.$http.post('selectBlogByPage', this.$qs.parse(this.queryInfo))
      this.blogList = res.data
    }
  },
  created () {
    // 页面加载前按照默认分页获取博客列表
    this.selectBlogByPage()
  }
}
</script>

<style lang="less" scoped>
.management-card {
  // 高度设置成100会出现滚动条，就很奇怪
  height: 99%;

  .btn-add-blog {
    float: right;
  }
}
</style>
