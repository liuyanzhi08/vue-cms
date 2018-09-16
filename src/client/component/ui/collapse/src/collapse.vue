<template>
  <div>
    <transition name="fade">
      <div
        :class="{
          'ui-collapse': 1,
          'ui-collapse-collapsed': collapsed
        }"
      >
        <slot/>
      </div>
    </transition>
    <button
      v-if="collapsed"
      class="btn btn-default"
      @click="toggle"
    >阅读全文 <i class="fa fa-angle-down"/></button>
  </div>
</template>
<script>
export default {
  name: 'UiCollapse',
  props: {
    page: {
      type: Number,
      default: null,
    },
    total: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
  created() {
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>
<style lang="scss">
  .ui-collapse {
  }

  .ui-collapse-collapsed {
    max-height: 300px;
    overflow: hidden;
  }
</style>
