<!--类型页面-->
<template>
  <blog-list :transferTagIds="tagIds"></blog-list>
</template>

<script>
// 导入博客列表组件
import blogList from '@/components/index/BlogList'

export default {
  name: 'Tag',
  components: {
    'blog-list': blogList
  },
  data () {
    return {
      // 标签Id数组，可以多选标签进行筛选
      tagIds: []
    }
  },
  methods: {},
  created () {
    // 获取tagId并强转成数字类型
    const tagId = Number(this.$route.params.tagId)
    if (tagId !== -1) {
      this.tagIds.push(tagId)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
