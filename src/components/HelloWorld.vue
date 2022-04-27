<template>
  <div class="hello">
    <router-link to="/">
      <el-button>主界面</el-button>
    </router-link>
    <router-link to="/user">
      <el-button type="primary">用户界面</el-button>
    </router-link>
    <!-- <el-radio v-model="radio" label="1">备选项</el-radio> -->
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style>
</style>