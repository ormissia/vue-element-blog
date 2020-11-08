<!--类型页面-->
<template>
  <div>
    <tag-card :transferTagIds="tagIds" @getData="getData" class="card-top"></tag-card>
    <blog-list :transferTagIds="tagIds"></blog-list>
  </div>
</template>

<script>
// 导入博客列表组件
import blogList from '@/components/index/BlogList'
import TagCard from '@/components/index/TagCard'

export default {
  name: 'Tag',
  components: {
    'blog-list': blogList,
    'tag-card': TagCard
  },
  data () {
    return {
      // 标签Id数组，可以多选标签进行筛选
      tagIds: -1
    }
  },
  methods: {
    getData (data) {
      this.tagIds = data
    }
  },
  created () {
    // 获取tagId并强转成数字类型
    const tagId = Number(this.$route.params.tagId)
    console.log(tagId)
    if (tagId !== -1) {
      this.tagIds = tagId
    }
  }
}
</script>

<style lang="less" scoped>
.card-top {
  margin: 20px 0;
}
</style>
