<template>
  <div class="blog-editor-container">
    <el-input placeholder="起个漂亮的名字吧"
              v-model="blogTitle"
              class="input-title">
      <template slot="prepend">标题</template>
    </el-input>
    <!--markdown编辑器-->
    <editor :initialValue='markdownContent'
            :options="viewerOptions"
            class="editor"/>
    <!--博客简介-->
    <el-input
        type="textarea"
        :autosize="{ minRows: 4 }"
        placeholder="请输入内容"
        v-model="description"
        class="description">
    </el-input>
    <div class="selector">
      <!--博客类型的选择器-->
      <el-select v-model="blogType"
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
          v-model="blogTags"
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
          v-model="blogRecommend"
          active-color="#13ce66"
          inactive-color="#9c9c9c"
          active-text="这玩意儿太顶了，我要推荐"
          inactive-text="知识积累">
      </el-switch>
    </div>
    <!--底部按钮区域-->
    <div class="buttons">
      <!--发布和保存的按钮-->
      <el-button type="primary" @click="saveAndPublish">写完了，马上发布</el-button>
      <el-button type="primary" :plain="true">没写完，保存草稿</el-button>
    </div>
  </div>
</template>

<script>
// 导入markdown查看组件
import { Editor } from '@toast-ui/vue-editor'
// 导入markdown的toast ui样式
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css'
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
      // 标题
      blogTitle: '',
      // 页面上的markdown内容
      markdownContent: '',
      // 博客简介
      description: '',
      // 当前博客类型
      blogType: '',
      // 当前博客标签
      blogTags: [],
      // 是否推荐
      blogRecommend: false,

      // 所有类型
      allTypes: [],
      // 所有标签
      allTags: [],

      // markdown Viewer的设置属性对象
      viewerOptions: {
        usageStatistics: false,
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
    saveAndPublish () {
      console.log(this.blogType)
      console.log(this.blogTags)
      console.log(this.blogRecommend)
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
