<!--带数字标签的按钮组件-->
<template>
  <div @click="btnClick">
    <!--左边文字标签部分-->
    <div>{{ tagName }}</div>
    <!--右边数字部分-->
    <div>{{ number }}</div>
  </div>
</template>

<script>
export default {
  name: 'BtnWithNum',

  props: {
    // 按钮左边文字
    tagName: String,
    // 按钮右边数字
    number: String
  },

  methods: {
    btnClick () {
      // 当select事件触发后，自动触发showCityName事件
      this.$emit('btnClick', this.tagName)
    }
  }
}
</script>

<style scoped>

</style>
