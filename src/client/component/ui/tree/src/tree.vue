<template>
  <div class="ui-tree">
    <ui-tree-nodes
      :data="data"
      :load="load"
      :click="click"
      :render-content="renderContent"/>
  </div>
</template>
<script>
import _ from 'lodash';
import UiTreeNodes from './tree-nodes';

export default {
  name: 'UiTree',
  components: {
    UiTreeNodes,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    load: {
      type: Function,
      default: _.noop,
    },
    click: {
      type: Function,
      default: _.noop,
    },
    renderContent: {
      type: Function,
      default: _.noop,
    },
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {},
};
</script>
<style lang="scss">
  .ui-tree {
    .parent > * {
      margin-left: 30px;
    }
    .leaf {
      margin-left: 60px;
    }
    > .ui-tree-nodes > .parent > *, > .ui-tree-nodes > .leaf {
      margin-left: 0;
    }
    .name {
      .fa-caret-right, .fa-caret-down {
        margin-right: 10px;
      }
    }
    .name, .leaf {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 3px 10px;
      border-radius: 3px;
      &:hover {
        background: #eee;
      }
      .fa-folder-o, .fa-file-o {
        margin-right: 5px;
      }
    }
  }
</style>
