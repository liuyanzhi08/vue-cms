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
import config from '../../../config';

export default {
  name: 'AppThemeOption',
  props: {
    value: {
      type: String,
      default: config.theme,
    },
  },
  data() {
    return {
      options: [],
      selectValue: 'default',
    };
  },
  watch: {
    value: {
      handler() {
        this.selectValue = this.value;
      },
      immediate: true,
    },
    selectValue: {
      handler() {
        this.$emit('input', this.selectValue);
      },
      immediate: true,
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
