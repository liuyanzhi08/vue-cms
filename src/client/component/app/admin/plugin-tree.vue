<template>
  <el-tree
    :data="data"
    @node-click="click"
  />

</template>
<script>
import _ from 'lodash';
import config from '../../../config';

const { db } = config;

const label = (obj, type) => `${obj.title} [ ${type.substr(0, 1)}id: ${obj.id} ]`;

const id = (obj, type) => `${type}-${obj.id}`;

export default {
  name: 'AppCategoryTree',
  props: {
    click: {
      type: Function,
      default: _.noop,
    },
  },
  data() {
    return {
      data: [
        {
          label: '爬虫',
          id: 'spider',
        },
      ],
    };
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
  .menu {
    i {
      margin-left: 5px;
    }
  }
</style>
