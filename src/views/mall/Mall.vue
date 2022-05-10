<template>
  <div>
    <!-- <h2>我是Mall</h2> -->
    <el-row class="user" :gutter="20">
      <el-col :span="16">
        <el-card shadow="always" style="margin-top: 40px">
          <h1 style="text-align: center; margin-bottom: 10px">商品信息</h1>
          <!-- 展示用户数据 -->
          <el-table :data="userinfo" stripe border height="500">
            <el-table-column
              v-for="(label, key) in userTableLabel"
              :key="key"
              :label="label"
              :prop="key"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserData } from "../../../api/data.js";

export default {
  name: "Mall",
  components: {},
  data() {
    return {
      // 自己搞得数据
      userTableLabel: {
        name: "姓名",
        idCard: "编号信息",
        birthOfDate: "出生日期",
        address: "现居住址",
      },
      userinfo: [],
    };
  },

  mounted() {
    getUserData().then((res) => {
      console.log(res.data);
      const { code, userdata } = res.data;
      if (code === 20001) {
        this.userinfo = userdata.userinfo;
        // console.log(this.userinfo);
      }
    });
  },
};
</script>

<style>
</style>