<template>
  <div>
    <el-select v-model="activeTopTemp" placeholder="请选择" @change="changeClik()">
      <el-option
        v-for="item in options"
        :key="item.comboId"
        :label="item.comboName"
        :value="item.comboId">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import {getComboType} from "@/api/combo-type-info";

export default {
  name: "index.vue",
  props: {
    value: {
      type: Number,
      required: true,
    }
  },
  created() {
    this.getComboType();
  },
  data() {
    return {
      options: [],
      activeTopTemp: this.value === '' ? '' : this.value,
    }
  },
  methods: {
    getComboType() {
      getComboType().then(res => {
        this.options = res.data;
      }).catch(error => {
        console.log(error);
      });
    },
    changeClik() {
      this.$emit("changeClik", this.activeTopTemp);
    }
  }
}
</script>

<style scoped>

</style>
