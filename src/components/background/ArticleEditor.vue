<!--博客编辑页面组件-->
<template>
  <el-card shadow="always" class="article-editor-container">
    <el-input placeholder="起个漂亮的名字吧"
              v-model="articleForm.title"
              class="input-title">
      <template slot="prepend">标题</template>
    </el-input>
    <el-input placeholder="来个首图"
              v-model="articleForm.topImage"
              class="input-title">
      <template slot="prepend">首图</template>
    </el-input>
    <!--markdown编辑器-->
    <editor @blur="onEditorBlur"
            ref="toastUiEditor"
            :initialValue='articleForm.content'
            :options="viewerOptions"
            height="750px"
            class="editor"/>
    <el-row :gutter="20">
      <!--      <el-col :span="6">-->
      <!--        <el-upload class="upload-img" drag-->
      <!--                   accept=""-->
      <!--                   action="http://127.0.0.1:8085/api/private/uploadImage"-->
      <!--                   :limit="1"-->
      <!--                   :before-upload="beforeImageUpload"-->
      <!--                   :on-success="handleImageSuccess"-->
      <!--                   :show-file-list="true">-->
      <!--          &lt;!&ndash;上传后的图片展示&ndash;&gt;-->
      <!--          <img v-if="this.temporaryImage" :src="this.temporaryImage" class="img-success" alt="博客首图">-->
      <!--          &lt;!&ndash;上传控件提示信息&ndash;&gt;-->
      <!--          <div v-else>-->
      <!--            <i class="el-icon-upload"></i>-->
      <!--            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
      <!--            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!--          </div>-->
      <!--        </el-upload>-->
      <!--      </el-col>-->
      <el-col :span="24">
        <!--博客简介-->
        <el-input
          type="textarea"
          :autosize="{ minRows: 1 }"
          maxlength="120"
          show-word-limit
          placeholder="请输入简介"
          v-model="articleForm.description"
          class="description">
        </el-input>
      </el-col>
    </el-row>
    <div class="selector">
      <!--博客类型的选择器-->
      <el-select v-model="articleForm.type"
                 value-key="ID"
                 style="width: 50%;margin-right: 10px"
                 :filterable="true"
                 :allow-create="true"
                 :default-first-option="true"
                 placeholder="请选择文章类型">
        <el-option
          v-for="item in typeList"
          :key="item.ID"
          :label="item.typeName"
          :value="item">
        </el-option>
      </el-select>
      <!--博客标签的选择器-->
      <el-select
        v-model="articleForm.tags"
        value-key="ID"
        style="width: 50%;margin-left: 10px"
        :multiple="true"
        :filterable="true"
        :allow-create="false"
        :default-first-option="true"
        placeholder="请选择文章标签">
        <el-option
          v-for="item in tagList"
          :key="item.ID"
          :label="item.tagName"
          :value="item">
        </el-option>
      </el-select>
    </div>
    <div class="switcher">
      <!--是否推荐的开关选择器-->
      <el-switch
        v-model="articleForm.isRecommend"
        :active-value=1
        :inactive-value=2
        active-color="#13ce66"
        inactive-color="#9c9c9c"
        active-text="这玩意儿太顶了，我要推荐"
        inactive-text="知识积累">
      </el-switch>
    </div>
    <!--底部按钮区域-->
    <el-row :gutter="20">
      <!--左边按钮区域-->
      <el-col :span="12">
        <!--重置按钮-->
        <el-button type="success" @click="refreshArticle">改了啥了都，还原一下</el-button>
      </el-col>
      <!--右边按钮区域-->
      <el-col :span="12">
        <div class="buttons">
          <el-tag :type="articleForm.isPublished === true ? 'success' : 'info'">
            状态：{{ articleForm.isPublished === true ? '发布' : '草稿' }}
          </el-tag>
          <!--发布和保存的按钮-->
          <el-button type="primary" @click="saveAndPublish(1)">写完了，马上发布</el-button>
          <el-button type="primary" @click="saveAndPublish(0)" :plain="true">没写完，保存草稿</el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// 导入markdown查看组件
import { Editor } from '@toast-ui/vue-editor'
// 导入markdown的toast ui样式
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
// 代码高亮
import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight'
import hljs from 'highlight.js'

export default {
  name: 'ArticleEditor',
  components: {
    // markdown viewer的组件
    editor: Editor
  },
  data () {
    return {
      // 图片临时路径
      temporaryImage: '',
      // 博客保存表单的绑定对象
      articleForm: {
        // 博客Id
        ID: 0,
        // 首图
        topImage: '',
        // 标题
        title: '',
        // 页面上的markdown内容
        content: '',
        // 博客简介
        description: '',
        // 当前博客类型
        typeId: 0,
        typeName: '',
        type: {},
        // 当前博客标签
        tags: [],
        // 是否推荐
        isRecommend: 2,
        // 是否发布
        isPublished: 2,
        // 是否删除
        isDeleted: 2,
        // 用户Id
        userId: 0
      },
      // 编辑之前的article信息
      oldArticle: {
        // 博客Id
        ID: 0,
        // 首图
        topImage: '',
        // 标题
        title: '',
        // 页面上的markdown内容
        content: '',
        // 博客简介
        description: '',
        // 当前博客类型
        typeId: 0,
        typeName: '',
        type: {},
        // 当前博客标签
        tags: [],
        // 是否推荐
        isRecommend: 2,
        // 是否发布
        isPublished: 2,
        // 是否删除
        isDeleted: 2,
        // 用户Id
        userId: 0
      },

      // 用于查询所有类型标签列表的参数对象
      queryInfo: {
        // 当前页数
        pageNum: 1,
        // 当前每页显示多少条数据
        pageSize: 9999
      },
      // 所有类型
      typeList: [],
      // 所有标签
      tagList: [],

      // markdown Viewer的设置属性对象
      viewerOptions: {
        usageStatistics: false,
        language: 'zh-CN',
        plugins: [
          [codeSyntaxHightlight, { hljs }]
        ],
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'code',
          'codeblock',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider'
        ]
      }
    }
  },
  methods: {
    // 文件上传之前
    beforeImageUpload (file) {
      // 判断文件类型
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$rootMessage.error('只能上传图片!')
      }
    },
    // 文件上传成功
    handleImageSuccess (res, file) {
      // 上传成功
      if (res.code === 200) {
        this.$rootMessage({
          showClose: true,
          message: res.msg,
          type: 'success'
        })
        // 给图片控件赋值
        this.temporaryImage = URL.createObjectURL(file.raw)
        // 将返回的图片路径保存到图片对象中
        this.articleForm.topImage = res.data
      } else {
        // 上传失败
        this.$rootMessage({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      }
    },
    refreshArticle () {
      this.articleForm = JSON.parse(JSON.stringify(this.oldArticle))
      this.setMarkdown()
    },
    // 发布按钮传true，保存草稿按钮传0
    async saveAndPublish (isPublished) {
      // 将发布状态赋值到对象中
      this.articleForm.isPublished = isPublished
      // 将类型信息赋值到对象中
      this.articleForm.typeId = this.articleForm.type.ID
      // 需要在页面上做校验是否有必须输入的内容
      try {
        const { data: res } = await this.$http.post('article/saveArticle', this.$qs.parse(this.articleForm))
        // 根据返回值判断是否保存成功，若成功则跳到ArticleManagement页面
        if (res.code === 200) {
          this.$rootMessage({
            showClose: true,
            message: res.msg,
            type: 'success'
          })
          // 跳转到博客管理页面
          await this.$router.push('/background/articleManagement/')
        }
      } catch (e) {
        // 保存失败，输出错误提示
        this.$rootMessage({
          showClose: true,
          message: e,
          type: 'error'
        })
      }
    },
    onEditorBlur () {
      // 当编辑器失去焦点时获取Editor的值
      this.articleForm.content = this.$refs.toastUiEditor.invoke('getMarkdown')
    },
    // 设置编辑器的内容
    setMarkdown () {
      this.$refs.toastUiEditor.invoke('setMarkdown', this.articleForm.content, false)
    },
    // 通过博客Id查询博客信息
    async selectArticleById (articleId) {
      const { data: res } = await this.$http.post('article/selectArticleById', this.$qs.stringify({ articleId: articleId }))
      // 判断返回结果状态值，如果成功获取博客信息，则将博客信息分别赋值给articleForm和oldArticle（用于页面恢复数据）
      if (res.code === 200) {
        this.articleForm.ID = res.data.ID
        this.articleForm.title = res.data.title
        this.articleForm.topImage = res.data.topImage
        this.articleForm.content = res.data.content
        this.articleForm.description = res.data.description
        this.articleForm.userId = res.data.user.userId
        // 判断type和tags是否为空，如果为空时不加判断会报错
        if (res.data.type !== null) {
          this.articleForm.type = res.data.type
        }
        if (res.data.tags.length >= 0) {
          this.articleForm.tags = res.data.tags
        }
        this.articleForm.isRecommend = res.data.isRecommend
        this.articleForm.isPublished = res.data.isPublished

        // 同时将原始值保存到oldArticle中
        this.oldArticle = JSON.parse(JSON.stringify(this.articleForm))

        // 刷新编辑器内容
        this.setMarkdown()
      }
    },
    // 按照页面分页获取类型列表
    async selectTypeByPage () {
      const { data: res } = await this.$http.post('type/selectTypeByPage', this.$qs.parse(this.queryInfo))
      this.typeList = res.data.dataList
    },
    // 按照页面分页获取标签列表
    async selectTagByPage () {
      const { data: res } = await this.$http.post('tag/selectTagByPage', this.$qs.parse(this.queryInfo))
      this.tagList = res.data.dataList
    }
  },
  created () {
    // 页面加载时查询所有类型和标签
    this.selectTypeByPage()
    this.selectTagByPage()
    const articleId = this.$route.params.articleId
    // 通过当articleId不等-1时，即为修改文章
    if (articleId !== '-1') {
      this.selectArticleById(articleId)
    }
  }
}
</script>

<style lang="less" scoped>
.article-editor-container {

  .input-title {
    margin: 10px 0;
  }

  .editor {
    margin: 10px 0;
  }

  .upload-img {
    margin-top: 10px;

    .img-success {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .description {
    margin: 10px 0;
  }

  .selector {
    margin: 10px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .switcher {
    margin: 10px 0;
  }

  .buttons {
    // 垂直居中水平居右
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .el-button {
      float: right;
      margin-left: 10px;
    }
  }
}
</style>
