<template>
  <!-- label-width:表单域标签的的宽度 , model:表单数据对象， inline:行内表单样式-->
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
    >
      <!-- input框 -->
      <el-input
        v-if="item.type === 'input'"
        :placeholder="`请输入${item.label}`"
        v-model="form[item.model]"
      ></el-input>
      <!-- 开关框 -->
      <el-switch v-if="item.type === 'switch'" v-model="form[item.model]">
      </el-switch>
      <!-- 时间选取 -->
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-mm-dd"
        placeholder="选择日期"
        v-model="form[item.model]"
      >
      </el-date-picker>
      <!-- 选择框 -->
      <el-select
        v-if="item.type === 'select'"
        :placeholder="`请选择${item.label}`"
        v-model="form[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 定义插槽，传入自定义内容 -->
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
 
<script>
export default {
  name: "CommonForm",
  props: {
    formLabel: Array, // 表单样式
    form: Object, // 传过来的数据
    inline: Boolean, // 判断是单行 还是上下排列
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>