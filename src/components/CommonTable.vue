<template>
  <div class="common-table">
    <el-table :data="tableData" height="420" stripe>
      <!-- 当内容过长被隐藏时显示 tooltip -->
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <!-- 渲染传进来的数据，tableData是给到table的记录集，scope是table内部基于tableData生成出来的 
    通过scope.row.date，我们就可以读取到每一行中的date-->
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- 定义操作 列 -->
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDelete(scope.row)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 设置分页--paginiation -->
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="config.total"
      :page-size="20"
      :current-page.sync="config.page"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  methods: {
    handleEdit(row) {
      // 触发父组件的自定义事件：edit，将row传入父组件
      this.$emit("edit", row);
    },
    handleDelete(row) {
      // 触发父组件的自定义事件，将row传入父组件
      this.$emit("del", row);
    },
    changePage(page) {
      // 通触发父组件的自定义事件，将row传入父组件
      this.$emit("changePage", page);
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% -60px);
  background-color: white;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>