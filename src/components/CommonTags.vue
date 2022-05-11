<template>
  <div class="tags">
    <!-- :closable="tab.name !== 'home'"确保第一项首页不会被删掉 -->
    <el-tag
      v-for="(tab, index) in tabsList"
      :key="tab.path"
      :closable="tab.name !== 'home'"
      :effect="$route.name === tab.name ? 'dark' : 'plain'"
      @click="changeMenu(tab)"
      @close="handleClose(tab, index)"
      size="medium"
    >
      {{ tab.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTags",
  methods: {
    //利用mapStations调用closeMenu方法
    ...mapMutations({ close: "closeMenu" }),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    //   官方删除方法。$route.name当前页面的路由名
    // this.tabsList.splice(index, 1)
    // 需求：
    // 1 若点击所要删除路由与当前路由不一致，什么也不做；
    // 2 若点击所要删除路由在最右边那个，则页面自动跳转到前一个路由界面
    // 3 若点击所要删除路由在中间，则页面自动跳转到后面一个路由界面
    handleClose(tab, index) {
      console.log("消除");
      // const index = this.tabsList.indexOf(tab)
      // 拿到最右边的路由
      const right = this.tabsList.length - 1;
      // 利用mapMutations技术删除路由tag
      this.close(tab);
      if (this.$route.name !== tab.name) {
        return;
      }
      if (index === right) {
        this.$router.push({ name: this.tabsList[index - 1].name });
      } else {
        this.$router.push({ name: this.tabsList[index + 1].name });
      }
    },
  },
  computed: {
    ...mapState({ tabsList: (state) => state.tab.tabsList }),
  },
  mounted() {
    //   方法1：获取vuex里面的tab中state数据
    // console.log("@@@", this.$store.state.tab.tabsList);
  },
};
</script>

<style lang="less" scoped>
.tags {
  // padding:20px;
  margin: 20px 0 0 20px;
  .el-tag {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>