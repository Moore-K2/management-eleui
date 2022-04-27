<template>
  <div>
    <el-container style="height: 100%">
      <!-- auto代表侧边栏是可以拉伸的 -->
      <el-aside width="auto">
        <!-- 引入侧边栏CommonAside组件 -->
        <common-aside></common-aside>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from "../components/CommonAside.vue";
export default {
  components: { CommonAside },
  name: "Home",
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
  // main可覆盖
  padding-top: 0;
}
</style>