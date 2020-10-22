<!--带数字标签的按钮组件-->
<template>
  <div class="btn-container" @click="btnClick">
    <!--左边文字标签部分-->
    <div class="btn-name">{{ tagName }}</div>
    <!--右边数字部分-->
    <div class="btn-number">{{ number }}</div>
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
      // 当select事件触发后，自动触发btnClick事件
      this.$emit('btnClick', this.tagName)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-container {
  border: 1px solid #ba9f93;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;

  .btn-name {
    width: 70%;
    text-align: center;
  }

  .btn-number {
    width: 30%;
    text-align: center;
  }
}
</style>
