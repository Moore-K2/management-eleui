<template>
  <div ref="echart"></div>
</template>

<script>
// 引入echarts
import * as echarts from "echarts";
export default {
  name: "Echarts",
  props: {
    // 判断是否有x轴。line/bar chart有轴，pie chart无轴
    isAxisChart: {
      type: Boolean,
      default: true, // 默认值
    },
    // options里面的参数
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  //   监听chartData.有数据以后,初始化echart
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.initChart();
      },
    },
  },
  methods: {
    //  初始化chart
    initChart() {
      // 初始化chart的数据
      this.initChartData();
      // 根据echart存不存在来判断是否渲染
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        // 需要初始化echart对象
        this.echart = echarts.init(this.$refs.echart);
        // 根据配置项和数据进行渲染
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      // 判断图类型
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        // 饼状图
        this.pieOption.series = this.chartData.series;
      }
    },
  },
  data() {
    return {
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        title: {
          text: "2019年度手机月销量",
          textStyle: {
            fontWeight: "bold",
            fontSize: 15,
            color: "red",
          },
        },
        tooltip: {
          // axis item none三个值
          trigger: "axis",
        },
        grid: {
          containLabel: true,
        },
        //x轴数据
        xAxis: {
          data: [],
          type: "category", // 类目轴
          axisLable: {
            interval: 0,
            rotate: 0,
          },
          name: "日期",
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 16,
          },
        },
        // y轴数据，每条折线的名称
        yAxis: [
          {
            name: "销量",
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 16,
            },
            type: "value",
            axisLine: {
              lineStyle: {
                // color: "#17b3a3",
              },
            },
          },
        ],
        series: [],
      },
      pieOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      //   用于初始化echart时,判断是否已经渲染
      echart: null,
    };
  },
  computed: {
    //   判断是柱状图、折线图还是饼状图
    options() {
      return this.isAxisChart ? this.axisOption : this.pieOption;
    },
  },
};
</script>

<style>
</style>