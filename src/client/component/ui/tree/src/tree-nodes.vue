<template>
  <div class="ui-tree-nodes">
    <div
      v-for="node in data"
      :key="node.label"
    >
      <div
        v-if="node.children"
        class="parent">
        <div
          class="name"
          @click="toggle(node)">
          <i
            :class="{
              'fa-caret-down': node.expanded,
              'fa-caret-right': !node.expanded
            }"
            class="fa"
            aria-hidden="true"
          />
          <i
            class="fa fa-folder-o"
            aria-hidden="true"/>
          <span
            @click.stop="toggle(node)"
            @dblclick.stop="click(node)"
          >
            <node-content :node="node"/>
          </span>
        </div>
        <ui-tree-nodes
          v-if="node.children !== -1"
          :data="node.children"
          :load="load"
          :click="click"
          :render-content="renderContent"/>
      </div>
      <div
        v-if="!node.children"
        class="leaf"
        @click="click(node)">
        <node-content :node="node"/>
      </div>
    </div>
    <div
      v-if="!data.length"
      class="leaf">none</div>
  </div>
</template>
<script>
import _ from 'lodash';

export default {
  name: 'UiTreeNodes',
  components: {
    NodeContent: {
      props: {
        node: {
          required: true,
        },
      },
      render(h) {
        const parent = this.$parent;
        const { node } = this;
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { node })
            : <span>{ this.node.label }</span>
        );
      },
    },
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
    return {
      test: '<span style="color:red">red</span>',
    };
  },
  created() {
  },
  methods: {
    toggle(_node) {
      const node = _node;
      if (!node.expanded) {
        this.load(node).then((subNodes) => {
          node.children = subNodes;
          node.expanded = !node.expanded;
        });
      } else {
        node.children = -1;
        node.expanded = !node.expanded;
      }
    },
  },
};
</script>
<style lang="scss">

</style>
