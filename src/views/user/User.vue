<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '添加用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <!-- 给组件传值 -->
      <CommonForm
        :formLabel="operateformLabel"
        :form="operateform"
        :inline="true"
        ref="form"
      ></CommonForm>
      <!-- dialog的底部部分 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm()">确定</el-button>
      </div>
    </el-dialog>
    <!-- header部分 -->
    <div class="manage-header">
      <el-button type="primary" @click="addUser()">+新增</el-button>
      <!-- 引用CommonForm组件 -->
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList()"
          >搜索</el-button
        ></CommonForm
      >
    </div>
    <!-- <h1 style="color: blue">我是User页面</h1> -->
    <el-row class="user" :gutter="20">
      <el-col :span="16">
        <el-card shadow="always" style="margin-top: 40px">
          <h1 style="text-align: center; margin-bottom: 10px">用户信息</h1>
          <!-- 展示用户数据 -->
          <el-table :data="userinfo" stripe border height="500">
            <el-table-column
              v-for="(label, key) in userTableLabel"
              :key="key"
              :label="label"
              :prop="key"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUserData } from "../../../api/data.js";
import CommonForm from "../../components/CommonForm.vue";
export default {
  name: "User",
  components: { CommonForm },
  data() {
    return {
      isShow: false,
      operateType: "add",
      operateformLabel: [
        { model: "name", label: "姓名", type: "input" },
        { model: "age", label: "年龄", type: "input" },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            { label: "男", value: 1 },
            { label: "女", value: 0 },
          ],
        },
        { model: "birth", label: "出生日期", type: "date" },
        { model: "address", label: "地址", type: "input" },
      ],
      operateform: {
        name: "",
        address: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keywords",
          label: "",
          type: "input",
        },
      ],
      searchForm: { keyword: "" },
      // 自己搞得数据
      userTableLabel: {
        name: "姓名",
        idCard: "编号信息",
        birthOfDate: "出生日期",
        address: "现居住址",
      },
      userinfo: [],
    };
  },
  methods: {
    confirm() {},
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        address: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList() {},
  },
  mounted() {
    getUserData().then((res) => {
      console.log(res.data);
      const { code, userdata } = res.data;
      if (code === 20001) {
        this.userinfo = userdata.userinfo;
        // console.log(this.userinfo);
      }
    });
  },
};
</script>

<style lang="less" scoped>
.manage {
  margin-top: 20px;
  .manage-header {
    display: flex;
    // 左右靠边
    justify-content: space-between;
    align-items: center;
  }
}
</style>