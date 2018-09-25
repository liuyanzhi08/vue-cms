<template>
  <div>
    <el-select
      v-model="value"
      placeholder="请选择"
      class="uk-width-1-1"
      @change="($event) => { this.$emit('input', value) }"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.text"
        :value="item.value"
      />
    </el-select>
  </div>
</template>
<script>
import _ from 'lodash';
import Category from '../../../api/category';

export default {
  name: 'AppCategoryTree',
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  created() {
    Category.query().then((res) => {
      const categories = res.data.items;
      const idMap = {};
      const roots = [];
      _.each(categories, (item) => {
        const category = item;
        idMap[category.id] = category;
        category.children = [];
      });
      _.each(categories, (category) => {
        const pid = category.parent_id;
        if (!pid) {
          roots.push(category);
        } else {
          idMap[pid].children.push(category);
        }
      });

      const options = [];
      let split = '';
      const root = {
        title: 'root',
        id: 0,
        children: roots,
      };
      const grnOptions = (node, subOptions) => {
        subOptions.push({
          text: split + node.title,
          value: node.id,
        });
        split += '|—';
        _.each(node.children, (child) => {
          const parentSplit = split;
          grnOptions(child, subOptions);
          split = parentSplit;
        });
      };
      grnOptions(root, options);
      this.options = options;
    });
  },
};
</script>
<style lang="scss" scoped>
</style>
