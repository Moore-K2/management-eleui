<template>
  <div id="app">
    <!-- 指定展示位置 -->
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  /* vh就是当前屏幕可见高度的1%，也就是说height:100vh == height:100%;
  但是当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，
  但是设置height:100vh，该元素会被撑开屏幕高度一致。 */
  height: 100vh;
}
</style>
