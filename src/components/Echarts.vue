<template>
  <div ref="echarts"></div>
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
      default: true,
    },
    // options里面的参数
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series,
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
      if (isAxisChart) {
        this.axisOptions.xAxis.data = this.chartData.xData;
        this.axisOptions.series = this.chartData.series;
      } else {
        // 饼状图
        this.pieOptions.series = this.chartData.series;
      }
    },
  },
  data() {
    return {
      axisOptions: {
        title: {
          text: "2019年度手机月销量",
          // left: "center",
          textStyle: {
            fontWeight: "bold",
            fontSize: 15,
            // fontFamily: "楷书",
            color: "red",
          },
        },
        tooltip: {
          trigger: "axis", // axis item none三个值
        },
        //x轴数据
        xAxis: {
          data: xAxis_Data,
          name: "日期", //x轴
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 16,
          },
        },
      },
      pieOptions: {
        title: {
          text: "手机销量占比分析(2019)",
          textStyle: {
            color: "red",
            fontSize: 14,
          },
        },
        series: [
          {
            data: data.videoData,
            type: "pie",
            center: ["60%", "50%"], //pie chart的位置信息，第一个：左右。第二个:上下
          },
        ],
        legend: {
          orient: "vertical", //布局horizontal' ¦ 'vertical'
          x: "-15px", //水平安放位置，默认left
          y: "center", //垂直安放位置,默认top
          //把百分比弄出来
          formatter: function (name) {
            let data = pieOptions.series[0].data;
            let total = 0;
            let value = 0;
            // let length = data.length;
            for (let i = 0; i < data.length; i++) {
              // console.log(data[i].value);
              total += data[i].value;
              if (data[i].name == name) {
                value = data[i].value;
              }
            }
            // console.log(total);
            let percent = ((value / total) * 100).toFixed(2);
            console.log(percent);
            return name + ":" + percent + "%";
          },
        },
        //bar/fan一般为item.formatter用来标准化展示内容
        tooltip: { trigger: "item", formatter: "{b} : {c} ({d}%)" },
      },
      //   用于初始化echart时,判断是否已经渲染
      echart: null,
    };
  },
  computed: {
    //   判断是柱状图、折线图还是饼状图
    options() {
      return this.isAxisChart ? this.axisOptions : this.pieOptions;
    },
  },
};
</script>

<style>
</style>