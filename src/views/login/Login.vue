<template>
  <!-- status-icon	是否在输入框中显示校验结果反馈图标 
  ref方便获取到表单元素
  -->
  <el-form
    :model="form"
    label-width="100px"
    status-icon
    :rules="rules"
    ref="form"
    class="login-container"
  >
    <h3 style="text-align: center; margin: 5px auto 30px auto">摩尔の庄园</h3>
    <!-- 用户名 -->
    <el-form-item label="用户名" label-width="80px" prop="username">
      <el-input
        type="input"
        v-model="form.username"
        placeholder="请输入账号"
        autocomplete="off"
      >
      </el-input
    ></el-form-item>
    <!-- 密码 -->
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        auto-complete="off"
        placeholder="请输入密码"
      ></el-input
    ></el-form-item>

    <!-- 提交 -->
    <el-form-item class="login-submit">
      <el-button type="primary" round @click="login()" class="login-submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>


<script>
// import Mock from "mockjs";
import { getMenu } from "../../../api/data.js";
export default {
  name: "Login",
  data() {
    return {
      form: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "用户名不能为空！", trigger: "blur" },
          { min: 3, message: "用户名不能小于3位！", trigger: "blur" },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          console.log("成功进入", res.data.token);
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          // 确保没登录前不能进入我们的主页
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({
            name: "home",
            // params: { name: this.form.username },
          });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // const token = Mock.Random.guid(); // 生成随机数
      // this.$store.commit("setToken", token); // 将token存入vuex
      // this.$router.push({ name: "home" }); // 跳转
    },
  },
  mounted() {
    // getMenu(this.form).then((res) => {
    //   console.log(res);
    // });
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 400px;
  margin: 150px auto;
  box-shadow: 0 0 25px #cac6c6;
  // background-clip: padding-box;
  border-radius: 10px;
  padding: 35px 35px 25px 35px;
  background-color: #fff;
  .login-submit {
    margin: 10px 20px 0 20px;
  }
}
</style>