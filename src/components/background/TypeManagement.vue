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
        <el-input placeholder="请输入内容"
                  v-model="queryInfo.typeName"
                  @change="selectTypeByPage"
                  clearable>
          <template slot="prepend">搜索</template>
          <el-button slot="append" icon="el-icon-search" @click="selectTypeByPage"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <!--创建新的Type，打开一个Dialog而不是打开新页面-->
        <el-button type="primary"
                   :plain="false"
                   @click="openDialogCreateNewType"
                   class="open-dialog">
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
                       @click="openTypeEditor(scope.row)">
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
                       @click="openDeleteDialog(scope.row.ID)">
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
      layout="total, sizes, prev, pager, next, jumper"
      class="pagination">
    </el-pagination>
    <!--添加新类型的dialog-->
    <el-dialog title="添加新类型" width="30%" :visible.sync="dialogVisible">
      <!--添加新类型表单区-->
      <el-form :model="typeForm" :rules="typeFormRules">
        <!--类型名输入框-->
        <el-form-item prop="typeName">
          <el-input placeholder="请输入要创建的类型名" v-model="typeForm.typeName" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item class="create-new-type">
          <el-button type="primary" @click="createNewType">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: 'TypeManagement',
  data () {
    return {
      // 登录Dialog打开关闭的标记
      dialogVisible: false,
      // 创建新类型的form表单
      typeForm: {
        ID: 0,
        typeName: '',
        isDeleted: 0
      },
      // 创建新类型的表单验证
      typeFormRules: {
        typeName: [{
          required: true,
          message: '请输入要创建的类型名称',
          trigger: 'blur'
        }]
      },
      // 用于查询类型列表的参数对象
      queryInfo: {
        // 搜索框的内容
        typeName: '',
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 10,
        // 向后端发送请求携带的参数，查询未删除的类型，2
        isDeleted: 2
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
    // 打开添加新类型的Dialog
    openDialogCreateNewType () {
      // 重置对象的初始值，防止添加之前修改过类型对象值导致对象变量内的值不为初始值
      this.typeForm.ID = 0
      this.typeForm.typeName = ''
      // 打开弹窗
      this.dialogVisible = true
    },
    // 打开确认删除确认的Dialog
    openDeleteDialog (typeId) {
      this.$confirm('真的要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 调用发起删除请求的方法
        this.deleteTypeById(typeId)
      }).catch(() => {
        this.$rootMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 调用修改的接口，修改isDeleted字段的值
    async deleteTypeById (typeId) {
      const articleType = {
        ID: typeId,
        isDeleted: 1
      }
      try {
        const { data: res } = await this.$http.post('type/saveType', this.$qs.parse(articleType))
        if (res.code === 200) {
          this.$rootMessage({
            type: 'success',
            message: res.msg
          })
        }
      } catch (e) {
        // 保存失败，输出错误提示
        this.$rootMessage({
          showClose: true,
          message: e,
          type: 'error'
        })
      }
      // 无论是否删除成功，刷新页面
      this.selectTypeByPage()
    },
    openTypeEditor (row) {
      // 获取当前行的类型信息
      this.typeForm.ID = row.ID
      this.typeForm.typeName = row.typeName
      // 打开弹窗
      this.dialogVisible = true
    },
    // 发起创建新类型的http请求
    async createNewType () {
      try {
        const { data: res } = await this.$http.post('type/saveType', this.$qs.parse(this.typeForm))
        // 根据返回值判断是否保存成功
        if (res.code === 200) {
          this.$rootMessage({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          // 返回成功之后关闭Dialog
          this.dialogVisible = false
        }
      } catch (e) {
        // 保存失败，输出错误提示
        this.$rootMessage({
          showClose: true,
          message: e,
          type: 'error'
        })
      }
      // 添加成功后刷新列表
      await this.selectTypeByPage()
    },
    // 按照页面分页获取博客列表
    async selectTypeByPage () {
      try {
        const { data: res } = await this.$http.post('type/selectTypeByPage', this.$qs.parse(this.queryInfo))
        this.typeList = res.data.dataList
        // 给分页控件的总条数赋值
        this.total = res.data.total
      } catch (e) {
        // 保存失败，输出错误提示
        this.$rootMessage({
          showClose: true,
          message: e,
          type: 'error'
        })
      }
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
  //分页控件的样式
  .pagination {
    margin-top: 15px;
    position: static;
    transform: translate(0, 0)
  }

  // 打开Dialog按钮的样式
  .open-dialog {
    float: right;
  }

  // 发起添加新类型http请求的按钮样式
  .create-new-type {
    display: flex;
    justify-content: flex-start;
  }
}
</style>
