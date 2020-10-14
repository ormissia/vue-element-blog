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
                   @click="openBlogEditor('new')"
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
      <el-table-column prop="blogName" label="标题"></el-table-column>
      <el-table-column prop="createDate" label="创建时间"></el-table-column>
      <el-table-column prop="lastEditDate" label="修改时间"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="tags" label="标签"></el-table-column>
      <el-table-column prop="isPublish" label="状态">
        <!--通过作用域插槽将boolean值变成控件的开关状态-->
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isPublish"
                     active-text="发布"
                     inactive-text="草稿">
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
                       size="small">
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
      blogList: [
        {
          blogId: 'uaidsh7868',
          blogName: '测试',
          createDate: '测试',
          lastEditDate: '测试',
          type: '测试',
          tags: '测试',
          isPublish: true
        },
        {
          blogId: 'dsfga4543',
          blogName: '测试',
          createDate: '测试',
          lastEditDate: '测试',
          type: '测试',
          tags: '测试',
          isPublish: false
        }
      ]
    }
  },
  methods: {
    openBlogEditor (index) {
      this.$router.push('/background/blogEditor/' + index)
    },
    // TODO 实现分页以及添加点击状态开关的操作
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // 把改变后的pageSize保存到对应变量中
      this.queryInfo.pageSize = newSize
      // 每页数据改变后重新发起请求获取当前页数据
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPageNum) {
      console.log(newPageNum)
      this.queryInfo.pageNum = newPageNum
    }
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
