<template>
  <div>
    <!-- gutter:栅格间隔 -->
    <el-row class="home" :gutter="20">
      <!-- 左边的视图  span=8表示左边占8/24-->
      <el-col :span="8">
        <el-card shadow="always" style="margin-top: 40px">
          <!-- 用户信息 -->
          <div class="user">
            <img :src="userImg" />
            <div class="user-info">
              <p class="name">Administrator</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <!-- 登录地点 -->
          <div class="login-user">
            <p style="margin-bottom: 15px">
              上次登录时间：<span>2022-4-28</span>
            </p>
            <p>上次登录地点：<span>成都</span></p>
          </div>
        </el-card>
        <!-- 展示表格数据 -->
        <el-card shadow="always" style="margin: 25px 0 10px 0">
          <!-- prop可根据索引/key获取到对应的value值， label代表标签. height=value固定表头,value代表固定高度 -->
          <!-- 当el-table元素注入data数组后。在el-table-column用props属性对应对象中的键名即可填入数据 -->
          <!-- v-for="(value,key) in object" 对于对象来说就是键，对于数组来说就是索引 -->
          <el-table :data="tableData" stripe border height="390">
            <el-table-column
              v-for="(label, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="label"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右边的视图 -->
      <el-col :span="16" style="margin-top: 40px">
        <div class="order-box">
          <el-card
            v-for="(item, index) in countData"
            :key="index"
            :body-style="{ display: 'flex ' }"
          >
            <!-- 图标字体 -->
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="text">
              <p class="money">${{ item.value }}</p>
              <p class="order">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折现图，柱状图，扇形图 -->
        <div class="lineChart">
          <el-card style="height: 260px">
            <!-- 定义折线图容器 -->
            <div ref="linechart" style="height: 260px; width: auto"></div>
            <!-- Echarts组件实例化 -->
            <!-- <echarts
              :chart-data="echartData.order"
              style="height: 250px; width: auto"
            ></echarts> -->
          </el-card>
        </div>
        <div class="bar-fan-chart">
          <el-card style="height: 240px">
            <div ref="barchart" style="height: 220px; width: auto"></div>
          </el-card>
          <el-card style="height: 240px">
            <div ref="piechart" style="height: 220px; width: auto"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入axios
import { getData } from "../../../api/data.js";
//引入echarts
import * as echarts from "echarts";
// 引入Echarts组件
// import Echarts from "../../components/Echarts.vue";

export default {
  // components: { Echarts },
  data() {
    return {
      userImg: require("../../assets/img/user.png"),
      // tableData: [
      //   {
      //     name: "oppo",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "苹果",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "小米",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "三星",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "魅族",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "魅族",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "魅族",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      //   {
      //     name: "魅族",
      //     todayBuy: 100,
      //     monthBuy: 300,
      //     totalBuy: 800,
      //   },
      // ],
      tableData: [],
      tableLabel: {
        name: "手机品牌",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      // countData
      countData: [
        {
          name: "今日支付订单",
          value: 123,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 345,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 4567,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 3458,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 8888,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      // 用于封装
      echartData: {
        order: { XData: [], series: [] },
        user: { XData: [], series: [] },
        sale: { series: [] },
      },
    };
  },
  mounted() {
    // 获取userData数据
    // getUserData().then((res) => console.log(res.data));
    // 获取图表数据
    getData().then((res) => {
      console.log(res.data);
      const { code, data } = res.data; // 对code与data在res的data下面解构
      if (code === 20000) {
        this.tableData = data.tableData;
        // 一、渲染折线图
        //arr：一月份的各个品牌的销量
        const arr = data.orderData.data;
        const xAxis_Data = data.orderData.date; // 折线图的横坐标
        const keyarray = Object.keys(arr[0]);
        // console.log(keyarray);
        const series_line = [];
        // forEach与map都遍历数组，都有三个参数index, item, arr；this都是指向window，
        // 2 forEach不能返回数据，不改变数据，map会分配内存空间存储数组并返回
        keyarray.forEach((key) => {
          series_line.push({
            name: key,
            type: "line",
            data: arr.map((item) => item[key]),
          });
        });
        // this.echartData.order.XData = xAxis_Data;
        // this.echartData.order.series = series_line;

        // 1 初始化
        const myLineChart = echarts.init(this.$refs.linechart);
        // 2 指定折现图表的配置项和数据
        const options = {
          title: {
            text: "2019年度手机月销量",
            // left: "center",
            textStyle: {
              fontWeight: "bold",
              fontSize: 15,
              fontFamily: "楷书",
              color: "red",
            },
          },
          tooltip: {
            trigger: "axis", // axis   item   none三个值
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
          // y轴数据，每条折线的名称
          yAxis: {
            name: "销量",
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 16,
            },
          },
          legend: { data: keyarray }, //图例
          //series:数组数据，里面是对象
          series: series_line,
        };
        // 3 根据数据项与配置渲染图
        myLineChart.setOption(options);

        // 二、渲染柱状图
        const xAxis_bar_data = data.userData.map((item) => item.date);
        const series_bar = [];
        const keyarray_bar = ["new", "active"];
        keyarray_bar.forEach((key) => {
          series_bar.push({
            name: key,
            type: "bar",
            data: data.userData.map((item) => item[key]), //对应key的数据-数组
          });
        });
        // console.log(series_bar);
        //1 基于准备好的dom，初始化echart
        const myBarChart = echarts.init(this.$refs.barchart);
        // 2 指定柱状图的配置及其数据项
        const barOptions = {
          title: {
            text: "周活跃/新增人数",
            left: 0,
            textStyle: {
              color: "red",
              fontSize: 14,
            },
          },
          legend: { data: keyarray_bar },
          xAxis: {
            data: xAxis_bar_data,
            type: "category", //类目轴
          },
          tooltip: { trigger: "item" },
          yAxis: { name: "人数" },
          series: series_bar,
        };
        //3 使用刚指定的数据和配置项显示图
        myBarChart.setOption(barOptions);
      }
      // 三、渲染饼图pie chart
      // 1 初始化
      const myPieChart = echarts.init(this.$refs.piechart);
      // 2 饼图配置与数据项
      const pieOptions = {
        // legend: {},
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
            // console.log(percent);
            return name + ":" + percent + "%";
          },
        },
        //bar/fan一般为item.formatter用来标准化展示内容
        tooltip: { trigger: "item", formatter: "{b} : {c} ({d}%)" },
      };
      //3 渲染图
      myPieChart.setOption(pieOptions);
    });
  },
};
</script>

<style lang="less" scoped>
.home {
  // margin-top: 12px;
  .user {
    display: flex; // 对user下的所有div子元素进行浮动布局
    align-items: center; // 中心对齐布局
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      margin-right: 40px;
    }
  }
  .user-info {
    .name {
      // overflow: hidden;
      margin-top: 15px;
      font-size: 28px;
    }
    .access {
      margin-top: 15px;
      margin-left: 35px;
      color: red;
    }
  }
  .order-box {
    // 让el-card进行横排列
    display: flex;
    // 让弹性盒元素在必要的时候拆行(换行)：
    flex-wrap: wrap;
    // 均匀排列-首元素起点在前，末尾在终点
    justify-content: space-between;
    .el-card {
      // 宽度是相对于所在占比的整个屏幕的宽度
      width: 32%;
      margin-bottom: 8px;
    }
    .icon {
      font-size: 32px;
      width: 50px;
      height: 50px;
      // 下面两项确认垂直居中
      line-height: 50px;
      text-align: center;
      color: #fff;
    }
    .text {
      margin-left: 15px;
      display: flex;
      // 浮动方向
      flex-direction: column;
      justify-content: center;
      .money {
        font-size: 30px;
        margin-bottom: 5px;
      }
      .order {
        font-size: 13px;
        color: #999;
      }
    }
  }
  .bar-fan-chart {
    margin-top: 10px;
    display: flex;
    // space-between：首部开始进行均匀排列
    justify-content: space-between;
    .el-card {
      // 设置el-card的宽度
      width: 49%;
    }
  }
}
</style>