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
          <el-table :data="tableData" stripe border height="280">
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
          <el-card style="height: 180px"></el-card>
        </div>
        <div class="bar-fan-chart">
          <el-card style="height: 180px"></el-card>
          <el-card style="height: 180px"></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImg: require("../../assets/img/user.png"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
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
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
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
    // 让弹性盒元素在必要的时候拆行：
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
      width: 60px;
      height: 60px;
      line-height: 60px;
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
      width: 48%;
    }
  }
}
</style>