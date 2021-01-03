<!--历程页面-->
<template>
  <div class="container">
    <div style="width: 100%;height: 100%" v-for="item in items" :key="item.index">
      <div id="calendar" ref="calendar" style="width: 45%;height: 40%"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeLine',
  data () {
    return {
      dataList: [],
      items: [
        {
          index: 1,
          content: 1
        },
        {
          index: 2,
          content: 2
        },
        {
          index: 3,
          content: 3
        },
        {
          index: 4,
          content: 4
        },
        {
          index: 5,
          content: 5
        },
        {
          index: 6,
          content: 6
        },
        {
          index: 7,
          content: 7
        }
      ]
    }
  },
  mounted () {
    this.initDate()
    this.initCalendar()
  },
  methods: {
    initDate () {
      this.dataList = this.getVirtulData(2017)
    },
    getVirtulData (year) {
      year = year || '2017'
      const echarts = require('echarts')
      var date = +echarts.number.parseDate(year + '-01-01')
      var end = +echarts.number.parseDate((+year + 1) + '-01-01')
      var dayTime = 3600 * 24 * 1000
      var data = []
      for (var time = date; time < end; time += dayTime) {
        data.push([
          echarts.format.formatTime('yyyy-MM-dd', time),
          Math.floor(Math.random() * 1000)
        ])
      }
      return data
    },
    initCalendar () {
      const echarts = require('echarts')
      var myChart = echarts.init(document.getElementById('calendar'))
      // 绘制图表
      const option = {
        tooltip: {
          position: 'top'
        },

        visualMap: [
          {
            type: 'continuous',
            min: 0,
            max: 1000,
            calculable: true,
            seriesIndex: [0],
            orient: 'vertical',
            top: 150,
            right: 20
          }
        ],

        calendar: [
          {
            orient: 'vertical',
            yearLabel: {
              margin: 40
            },
            monthLabel: {
              margin: 20
            },
            cellSize: 45,
            top: 100,
            left: 100,
            range: '2017-02'
          }
        ],

        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            brushType: 'stroke', // 波纹的绘制方式
            symbol: 'circle', // 此处甚至可以用图片，如：'image://http://xxx.xxx.xxx/a/b.png'
            symbolSize: function (val) {
              return val[1] / 40
            },
            data: this.dataList
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
