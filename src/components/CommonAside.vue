<template>
  <div>
    <el-menu
      default-active="1-4-1"
      background-color="#545c65"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      router
    >
      <h3 :style="isCollapse ? 'color: pink' : 'color:#ffd04b'">
        {{ isCollapse ? "Moore" : "摩尔の庄园" }}
      </h3>
      <!-- 菜单：遍历首页，商品管理，用户管理 -->
      <el-menu-item
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path"
        @click="clickMenu(item)"
      >
        <!-- 图标字体,这儿要拼接，必须前面加：实现动态绑定，这样才不会解析为字符串 -->
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>

      <!-- 有children的 -->
      <!-- 一级菜单----其他  -->
      <!-- 指定了index就可避免嵌套路由同时展开，也能绑定事件 -->
      <el-submenu
        v-for="(item, index) in hasChildren"
        :key="item.path"
        :index="index + ''"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem.path"
        >
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
            {{ subItem.label }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 个人中心 -->
      <el-menu-item @click="Addsuper" index="/mall">
        <i class="el-icon-video-camera-solid"></i>
        <span slot="title"> 紧急求助 </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "CommonAside",
  data() {
    return {
      // 是否折叠
      // isCollapse: true,
      // 定义接口数组，用于渲染侧边栏
      // menu: [
      //   {
      //     path: "/home",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "video-play",
      //     url: "MallManage/MallManage",
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "user",
      //     url: "UserManage/UserManage",
      //   },
      //   {
      //     label: "其他",
      //     icon: "location",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "setting",
      //         url: "Other/PageOne",
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "setting",
      //         url: "Other/PageTwo",
      //       },
      //       {
      //         path: "/page3",
      //         name: "page3",
      //         label: "页面3",
      //         icon: "setting",
      //         url: "Other/PageThree",
      //       },
      //     ],
      //   },
      //   //#region
      //   // {
      //   //   label: "个人中心",
      //   //   icon: "s-promotio",
      //   //   children: [
      //   //     {
      //   //       path: "/help1",
      //   //       name: "help1",
      //   //       label: "注意事项",
      //   //       icon: "flag",
      //   //       url: "Help/Help1",
      //   //     },
      //   //     {
      //   //       path: "/help2",
      //   //       name: "help2",
      //   //       label: "紧急求助",
      //   //       icon: "message-bell",
      //   //       url: "Help/Help2",
      //   //     },
      //   //   ],
      //   // },
      //   //#endregion
      // ],
      menu: [],
    };
  },
  methods: {
    Addsuper() {
      this.$store.commit("selectMenu", {
        name: "mall",
        path: "/mall",
        label: "超人",
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      // 因为VueRouter已经全局使用，所以可以直接调this.$router
      this.$router.push({
        name: item.name,
      });
      // 用编程式路由导航目的便于-用于面包屑
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      //返回Menu数组中没有chirldren属性的对象
      // return this.menu.filter((item) => !item.children);
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      //返回menu数组中有chirldren属性的对象
      // return this.menu.filter((item) => item.children);
      return this.asyncMenu.filter((item) => item.children);
    },
    // use vuex and $store to obtain data[isCollapse]
    isCollapse() {
      // console.log(this.$store.state);
      return this.$store.state.tab.isCollapse;
    },
    // 权限管理-获取menu
    asyncMenu() {
      return this.$store.state.tab.menu;
    },
  },
  mounted() {
    console.log("@@", this.$store.state.tab.menu);
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  // vh是屏幕视角
  height: 100vh;
  // height:100%;
  border: none;
  h3 {
    margin-top: 30px;
    font-size: 18px;
    text-align: center;
    line-height: 39px;
    color: #fff;
  }
}
.el-menu-item,
.el-submenu__title {
  font-size: 16px;
}
</style>