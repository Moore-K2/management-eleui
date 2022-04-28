<template>
  <header>
    <div class="left-content">
      <el-button
        @click="handelCollapse"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <h3 style="color: #fff">首页</h3>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <!-- 记住这儿要动态绑定,才能正确解析 -->
          <img class="userimg" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/img/user.png"),
    };
  },
  methods: {
    handelCollapse() {
      //   console.log("切换成功");
      this.$store.commit("HandelCollapse");
    },
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.left-content {
  display: flex;
  align-items: center;
  padding-left: 47px;
  .el-button {
    margin-right: 20px;
  }
}
.right-content {
  span {
    margin-right: 30px;
  }
  .userimg {
    width: 42px;
    height: 42px;
    border-radius: 50%;
  }
}
</style>
