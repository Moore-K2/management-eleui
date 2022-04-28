<template>
  <div>
    <el-container style="height: 100%">
      <!-- auto代表侧边栏是可以拉伸的 -->
      <!-- 1。侧边导航栏 -->
      <el-aside width="auto">
        <!-- 引入侧边栏CommonAside（公共）组件 -->
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <!-- 2。头部-->
        <el-header>
          <!-- 引入头部CommonHeader（公共）组件 -->
          <CommonHeader></CommonHeader>
        </el-header>
        <!-- 3。主内容区-->
        <el-main>
          <!-- 将子路由组件想展示的页面放入 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
import CommonHeader from "../components/CommonHeader.vue";
export default {
  components: { CommonAside, CommonHeader },
  name: "Main",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  // 设置main可覆盖
  padding-top: 0;
}
</style>