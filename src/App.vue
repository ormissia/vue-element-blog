<template>
  <div id="app">
    <!--路由占位符-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    // 全局引入阿里图标库
    importIconfont () {
      const element = document.createElement('script')
      element.src = 'http://at.alicdn.com/t/font_2099105_8b3nzdwarwk.js'
      document.body.append(element)
    }
  },
  mounted () {
    this.importIconfont()
  }
}
</script>

<style>
</style>
