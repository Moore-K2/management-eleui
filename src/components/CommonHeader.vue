<template>
  <header>
    <div class="left-content">
      <el-button
        @click="handelCollapse()"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <!-- 面包屑 -->
      <el-breadcrumb separator=">">
        <el-breadcrumb-item
          v-for="tab in tabsList"
          :key="tab.path"
          :to="{ path: tab.path }"
          >{{ tab.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <!-- 记住这儿要动态绑定,才能正确解析 -->
          <img class="userimg" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- method1:跳转到/xxx页面 -->
          <router-link to="/page1">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <!-- method2:跳转到某某页面，编程式路由导航 -->
          <el-dropdown-item @click.native="logOut()">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/img/user.png"),
    };
  },
  methods: {
    handelCollapse() {
      console.log("切换成功");
      this.$store.commit("HandelCollapse");
    },
    logOut() {
      console.log("退出咯");
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
  },
  computed: {
    // 若tab开启了namespaced:true,则可以这样使用.但会导致<展开按钮>不能正常使用
    // ...mapState("tab", ["tabsList"]),
    // tablist别名--传入对象用法：可以重命名store中的数据
    ...mapState({ tabsList: (state) => state.tab.tabsList }),
  },
  mounted() {
    // console.log("***", this.tabsList);
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  // 有了height才能实现align-items的居住效果
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
    margin-right: 40px;
  }
  .userimg {
    width: 45px;
    height: 42px;
    border-radius: 50%;
  }
}
.userimg:hover {
  border: 1px solid #fff;
}
</style>
