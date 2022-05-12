<template>
  <div class="manage">
    <!-- 在子组件当中修改父组件的某个数据时，建议使用sync -->
    <el-dialog
      :title="operateType === 'add' ? '添加用户' : '编辑用户'"
      :visible.sync="isShow"
    >
      <!-- 给table组件传值,样式，数据，是否在一行 -->
      <CommonForm
        :formLabel="operateformLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <!-- dialog的底部部分 -->
      <!-- 加了slot="footer"就可以让两个button在右边 -->
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
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >

        <el-button type="primary" @click="getList(searchForm.keyword)">
          搜索
        </el-button>
      </CommonForm>
    </div>
    <!-- 引用CommonTable组件 -->
    <!-- 注意这儿 @changePage,@edit="editUser"与@del="delUser"是自定义事件 
     getlist()右括号是因为要传入参数    -->

    <CommonTable
      :tableLabel="tableLabel"
      :tableData="tableData"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></CommonTable>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../../api/data.js";
export default {
  name: "User",
  components: { CommonForm, CommonTable },
  data() {
    return {
      isShow: false,
      operateType: "add",
      // 传给form组件中的样式，值
      // form样式
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
        { model: "addr", label: "地址", type: "input" },
      ],
      // form中的值
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      // 传给form组件中的样式，值
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: { keyword: "" },
      // 传给table组件中的样式，值
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          //性别用的value 0/1 表示男/女。需要注意
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      // 传入配置，涉及到pagination的
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("user/edit", this.operateForm).then(() => {
          // 关闭dialog
          console.log("!!", this.operateForm);
          this.$message({
            message: "牛的，操作成功！",
            type: "success",
          });
          this.isShow = false;
          this.getList();
        });
      } else {
        // add方法
        // console.log(this.operateType);
        this.$http.post("user/add", this.operateForm).then((res) => {
          console.log("###", res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      // 将数据初始化
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    // 绑定edit自定义事，通过执行回调函数，获取子组件传递的data
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      console.log(row);
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除此item条目，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http.post("/user/del", { id: id }).then((res) => {
          console.log("删除：", res);
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.getList();
        });
      });
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
        // 将dara结构出来，命名为res
      }).then(({ data: res }) => {
        // 给tableData赋值
        this.tableData = res.list.map((item) => {
          // 根据数组随机生成的0/1来给数组添加属性sexLabel
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        // 获取当前数据的条目，count在user.js中定义了
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    // 与mounted区别就是，created是在模板渲染成Html前调用
    this.getList();
  },
  mounted() {
    // console.log(this.$http);
    // console.log(this.config);
    // getUser().then((res) => {
    //   console.log("@@@", res.data);
    // });
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