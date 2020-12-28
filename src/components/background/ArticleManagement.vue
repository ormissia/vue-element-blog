<!--博客管理组件-->
<template>
  <el-card shadow="always" class="management-card">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/articleManagement' }">后台</el-breadcrumb-item>
      <el-breadcrumb-item>博客</el-breadcrumb-item>
      <el-breadcrumb-item>博客管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--顶部搜索框区域-->
    <el-row :gutter="20">
      <el-col :span="18">
        <!--搜索框-->
        <el-input placeholder="请输入内容" v-model="queryInfo.queryStr">
          <template slot="prepend">搜索</template>
          <el-button slot="append" icon="el-icon-search" @click="selectArticleByPage"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!--跳转到新建博客页面的按钮-->
        <el-button type="primary"
                   :plain="false"
                   @click="openArticleEditor('-1')"
                   class="btn-add-article">
          奇怪的知识又增加了（新建博客）
        </el-button>
      </el-col>
    </el-row>
    <!--博客列表-->
    <el-table :data="articleList"
              :stripe="true"
              :border="true"
              style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="CreatedAt" label="创建时间"></el-table-column>
      <el-table-column prop="UpdatedAt" label="修改时间"></el-table-column>
      <el-table-column prop="type.typeName" label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.type != null">
            {{ scope.row.type.typeName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="visits" label="访问数量"></el-table-column>
      <el-table-column label="状态">
        <!--通过作用域插槽将值变成控件的开关状态-->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.published"
                     active-text="发布"
                     inactive-text="草稿"
                     @change="saveArticle(scope.row.articleId,scope.row.published)">
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
                       @click="openArticleEditor(scope.row.articleId)">
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
                       @click="openDeleteDialog(scope.row.articleId)">
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
  name: 'ArticleManagement',
  data () {
    return {
      // 用于获取博客列表的参数对象
      queryInfo: {
        // 搜索框的内容
        title: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 向后端发送请求携带的参数，查询未删除的博客，0;查询推荐的博客-1（代表全部）;查询发布状态的博客-1（代表全部）;
        isDeleted: 0,
        isRecommend: -1,
        isPublished: -1
      },
      // 一共多少条数据
      total: 0,
      articleList: []
    }
  },
  methods: {
    openArticleEditor (index) {
      this.$router.push('/background/articleEditor/' + index)
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // 把改变后的pageSize保存到对应变量中
      this.queryInfo.pageSize = newSize
      // 每页数据改变后重新发起请求获取当前页数据
      this.selectArticleByPage()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPageNum) {
      this.queryInfo.pageNum = newPageNum
      // 页码值改变后重新发起请求来获取当前页面数据
      this.selectArticleByPage()
    },
    async saveArticle (articleId, isPublished) {
      const article = {
        articleId: articleId,
        isPublished: isPublished
      }
      // 使用修改保存博客的接口，传入数据创建一个博客对象，只包含博客Id和是否发布的信息
      const { data: res } = await this.$http.post('article/saveArticle', this.$qs.parse(article))
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
    // 打开确认删除博客的Dialog
    openDeleteDialog (articleId) {
      this.$confirm('真的要删除这篇博客吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用发起删除请求的方法
        this.deleteArticleByArticleId(articleId)
      }).catch(() => {
        this.$rootMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 根据博客Id发起删除博客的请求
    // 调用博客修改的接口，修改isDeleted字段的值
    async deleteArticleByArticleId (articleId) {
      const { data: res } = await this.$http.delete('article/deleteArticleByArticleId/' + articleId)
      if (res.code === 200) {
        this.$rootMessage({
          type: 'success',
          message: res.message
        })
      } else {
        this.$rootMessage({
          type: 'error',
          message: '删除失败'
        })
      }
      // 无论是否删除成功，刷新页面
      this.selectArticleByPage()
    },
    // 按照页面分页获取博客列表
    async selectArticleByPage () {
      const { data: res } = await this.$http.post('article/selectArticleByPage', this.$qs.parse(this.queryInfo))
      this.articleList = res.data.articles
      // 给分页控件的总条数赋值
      this.total = res.data.total
    }
  },
  created () {
    // 页面加载前按照默认分页获取博客列表
    this.selectArticleByPage()
  }
}
</script>

<style lang="less" scoped>
.management-card {
  // 高度设置成100会出现滚动条，就很奇怪
  height: 99%;

  .btn-add-article {
    float: right;
  }
}
</style>
