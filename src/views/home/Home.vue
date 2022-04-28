<template>
  <div>
    <el-row class="home" :gutter="20">
      <el-col :span="8">
        <el-card shadow="always" style="margin-top: 40px">
          <!-- 用户信息 -->
          <div class="user">
            <img :src="userImg" />
            <div class="user-info">
              <p class="name">Administrator</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <!-- 登录地点 -->
          <div class="login-user">
            <p style="margin-bottom: 15px">
              上次登录时间：<span>2022-4-28</span>
            </p>
            <p>上次登录地点：<span>成都</span></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userImg: require("../../assets/img/user.png"),
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      margin-right: 40px;
    }
  }
  .user-info {
    .name {
      // overflow: hidden;
      margin-top: 15px;
      font-size: 28px;
    }
    .access {
      margin-top: 15px;
      margin-left: 35px;
      color: red;
    }
  }
}
// .login-info {
//   p {
//     margin-bottom: 10px;
//     line-height: 28px;
//     font-size: 14px;
//     color: #999999;
//     span {
//       color: #666666;
//       margin-left: 60px;
//       margin-top: 5px;
//     }
//   }
// }
</style>