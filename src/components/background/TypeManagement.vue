<!--类型管理组件-->
<template>
  <el-card shadow="always" class="management-card">
    <!--面包屑导航区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/typeManagement' }">后台</el-breadcrumb-item>
      <el-breadcrumb-item>博客</el-breadcrumb-item>
      <el-breadcrumb-item>类型管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--顶部搜索框区域-->
    <el-row :gutter="20">
      <el-col :span="18">
        <!--搜索框-->
        <el-input placeholder="请输入内容" v-model="queryInfo.queryStr">
          <template slot="prepend">搜索</template>
          <el-button slot="append" icon="el-icon-search" @click="selectTypeByPage"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!--创建新的Type，打开一个Dialog而不是打开新页面-->
        <el-button type="primary"
                   :plain="false"
                   class="btn-add-type">
          添加新类型
        </el-button>
      </el-col>
    </el-row>
    <!--类型列表-->
    <el-table :data="typeList"
              :stripe="true"
              :border="true"
              style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="typeName" label="类型名称"></el-table-column>
      <el-table-column prop="typeName" label="博客数量"></el-table-column>
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
                       @click="openTypeEditor(scope.row.typeId)">
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
                       @click="deleteTypeByTypeId(scope.row.typeId)">
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
  name: 'TypeManagement',
  data () {
    return {
      // 用于查询类型列表的参数对象
      queryInfo: {
        // 搜索框的内容
        queryStr: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 向后端发送请求携带的参数，查询未删除的博客，false
        isDeleted: false
      },
      // 一共多少条数据
      total: 0,
      typeList: []
    }
  },
  methods: {
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      // 把改变后的pageSize保存到对应变量中
      this.queryInfo.pageSize = newSize
      // 每页数据改变后重新发起请求获取当前页数据
      this.selectTypeByPage()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPageNum) {
      this.queryInfo.pageNum = newPageNum
      // 页码值改变后重新发起请求来获取当前页面数据
      this.selectTypeByPage()
    },
    // 按照页面分页获取博客列表
    async selectTypeByPage () {
      const { data: res } = await this.$http.post('selectTypeByPage', this.$qs.parse(this.queryInfo))
      this.typeList = res.data.typeList
      // 给分页控件的总条数赋值
      this.total = res.data.total
    }
  },
  created () {
    // 页面加载前按照默认分页获取博客列表
    this.selectTypeByPage()
  }
}
</script>

<style lang="less" scoped>
.management-card {
  // 高度设置成100会出现滚动条，就很奇怪
  height: 99%;

  .btn-add-type {
    float: right;
  }
}
</style>
