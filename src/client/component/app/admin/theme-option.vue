<template>
  <div>
    <el-select
      v-model="selectValue"
      placeholder="select theme..."
      class="uk-width-1-1"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'AppThemeOption',
  props: {
    value: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      options: [],
      selectValue: 'default',
    };
  },
  watch: {
    value() {
      this.selectValue = this.value;
    },
    selectValue() {
      this.$emit('input', this.selectValue);
    },
  },
  created() {
    const { Theme } = this.$store.getters;
    Theme.query().then((res) => {
      this.options = res.data.items.map(item => ({
        label: item,
        value: item,
      }));
    });
  },
};
</script>
<style lang="scss" scoped>
</style>
