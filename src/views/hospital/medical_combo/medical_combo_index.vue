<template>
  <div id="body_index">
    <div style="margin: 30px 0px">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="体检套餐" name="first">
          <medical_combo_table></medical_combo_table>
        </el-tab-pane>
        <el-tab-pane label="体检项目" name="second">
          <medical_examination_index></medical_examination_index>
        </el-tab-pane>
        <el-tab-pane label="套餐类型" name="third">
          <combo_type_index></combo_type_index>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Combo_type_index from "@/views/hospital/combo-type/combo_type_index.vue";
import Medical_examination_index from "@/views/hospital/medical-examination/medical_examination_index.vue";
import Medical_combo_table from "@/views/hospital/medical_combo/medical_combo_table.vue"

export default {
  name: "medical_combo_index",
  components: {Medical_combo_table, Medical_examination_index, Combo_type_index},
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
#body_index {
  width: 95%;
  margin: 0px auto;
}
</style>
