<!--博客编辑页面组件-->
<template>
  <el-card shadow="always" class="blog-editor-container">
    <el-input placeholder="起个漂亮的名字吧"
              v-model="blogForm.blogTitle"
              class="input-title">
      <template slot="prepend">标题</template>
    </el-input>
    <!--markdown编辑器-->
    <editor @blur="onEditorBlur"
            ref="toastUiEditor"
            :initialValue='blogForm.blogContent'
            :options="viewerOptions"
            class="editor"/>
    <!--博客简介-->
    <el-input
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="请输入简介"
        v-model="blogForm.description"
        class="description">
    </el-input>
    <div class="selector">
      <!--博客类型的选择器-->
      <el-select v-model="blogForm.blogType"
                 style="width: 50%;margin-right: 10px"
                 :filterable="true"
                 :allow-create="true"
                 :default-first-option="true"
                 placeholder="请选择文章类型">
        <el-option
            v-for="item in allTypes"
            :key="item.typeId"
            :value="item.typeName">
        </el-option>
      </el-select>
      <!--博客标签的选择器，可添加-->
      <el-select
          v-model="blogForm.blogTags"
          style="width: 50%;margin-left: 10px"
          :multiple="true"
          :filterable="true"
          :allow-create="true"
          :default-first-option="true"
          placeholder="请选择文章标签">
        <el-option
            v-for="item in allTags"
            :key="item.tagId"
            :value="item.tagName">
        </el-option>
      </el-select>
    </div>
    <div class="switcher">
      <!--是否推荐的开关选择器-->
      <el-switch
          v-model="blogForm.isRecommend"
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
        <el-button type="success" @click="refreshBlog">改了啥了都，还原一下</el-button>
      </el-col>
      <!--右边按钮区域-->
      <el-col :span="12">
        <div class="buttons">
          <!--发布和保存的按钮-->
          <el-button type="primary" @click="saveAndPublish(true)">写完了，马上发布</el-button>
          <el-button type="primary" :plain="true">没写完，保存草稿</el-button>
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
  name: 'BlogEditor',
  components: {
    // markdown viewer的组件
    editor: Editor
  },
  data () {
    return {
      mk: '123',
      // 博客保存表单的绑定对象
      blogForm: {
        // 博客Id
        blogId: '',
        // 标题
        blogTitle: '',
        // 页面上的markdown内容
        blogContent: '',
        // 博客简介
        description: '',
        // 当前博客类型
        blogType: '',
        // 当前博客标签
        blogTags: [],
        // 是否推荐
        isRecommend: false,
        // 是否发布
        isPublished: false,
        // 用户Id
        userId: ''
      },
      // 编辑之前的blog信息
      oldBlog: {
        // 博客Id
        blogId: '',
        // 标题
        blogTitle: '',
        // 页面上的markdown内容
        blogContent: '',
        // 博客简介
        description: '',
        // 当前博客类型
        blogType: '',
        // 当前博客标签
        blogTags: [],
        // 是否推荐
        isRecommend: false,
        // 是否发布
        isPublished: false,
        // 用户Id
        userId: ''
      },

      // 所有类型
      allTypes: [],
      // 所有标签
      allTags: [],

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
    refreshBlog () {
      this.blogForm = JSON.parse(JSON.stringify(this.oldBlog))
      this.setMarkdown(this.oldBlog.blogContent)
    },
    // 发布按钮传1，保存草稿按钮传0
    saveAndPublish: async function (isPublished) {
      // 将发布状态赋值到对象中
      this.blogForm.isPublished = isPublished
      // 需要在页面上做校验是否有必须输入的内容
      const { data: res } = await this.$http.post('saveBlog', this.$qs.parse(this.blogForm))
      // 根据返回值判断是否保存成功，若成功则跳到BlogManagement页面
      if (res.code === 200) {
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'success'
        })
        // 跳转到博客管理页面
        await this.$router.push('/background/blogManagement/')
      } else {
        // 保存失败，输出错误提示
        this.$rootMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    onEditorBlur () {
      // 当编辑器失去焦点时获取Editor的值
      this.blogForm.blogContent = this.$refs.toastUiEditor.invoke('getMarkdown')
    },
    // 设置编辑器的内容
    setMarkdown (blogContent) {
      this.$refs.toastUiEditor.invoke('setMarkdown', blogContent, false)
    },
    // 通过博客Id查询博客信息
    async selectBlogByBlogId (blogId) {
      const { data: res } = await this.$http.post('selectBlogByBlogId', this.$qs.stringify({ blogId: blogId }))
      // 判断返回结果状态值，如果成功获取博客信息，则将博客信息分别赋值给blogForm和oldBlog（用于页面恢复数据）
      if (res.code === 200) {
        this.blogForm.blogId = res.data.blogId
        this.blogForm.blogTitle = res.data.blogTitle
        this.blogForm.blogContent = res.data.blogContent
        this.blogForm.description = res.data.description
        this.blogForm.blogType = res.data.type.typeName
        this.blogForm.userId = res.data.user.userId
        if (res.data.tags.length >= 0) {
          for (let i = 0; i < res.data.tags.length; i++) {
            this.blogForm.blogTags.push(res.data.tags[i].tagName)
          }
        }
        if (res.data.recommend === true) {
          this.blogForm.isRecommend = true
        }
        if (res.data.published === true) {
          this.blogForm.isPublished = true
        }

        // 同时将原始值保存到oldBlog中
        this.oldBlog = JSON.parse(JSON.stringify(this.blogForm))

        // 刷新编辑器内容
        this.setMarkdown(this.blogForm.blogContent)
      }
    }
  },
  created () {
    const blogId = this.$route.params.blogId
    // 判断blogId是否等于-1，若相等则为新建博客，无需向后端发送请求
    if (blogId === '-1') {
      // blogId等于-1则为新建博客，需要将session中存储的userId赋值到对象中
      this.blogForm.userId = window.sessionStorage.getItem('userId')
      this.oldBlog.userId = window.sessionStorage.getItem('userId')
    } else {
      // 通过博客Id获取博客信息，并赋值给双向绑定的数据对象中
      this.selectBlogByBlogId(blogId)
    }
  }
}
</script>

<style lang="less" scoped>
.blog-editor-container {

  .input-title {
    margin: 10px 0;
  }

  .editor {
    margin: 10px 0;
    height: 800px !important;
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
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }
}
</style>
