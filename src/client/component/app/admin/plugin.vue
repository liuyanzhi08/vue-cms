<template>
  <div>
    <ui-sidebar>
      <aside
        v-show="expanded"
        slot="side"
      >
        <app-plugin-tree
          ref="categoryTree"
          :click="click"
        />
      </aside>
      <div slot="main">
        <component :is="pluginComponent" />
      </div>
    </ui-sidebar>
  </div>
</template>
<script>
import Vue from 'vue';
import AppPluginTree from './plugin-tree';
import config from '../../../config';

const { rnames } = config;
const defaultPluginId = 'spider';

export default {
  components: {
    AppPluginTree,
  },
  data() {
    return {
      selected: {
        id: 0,
        type: 'article',
      },
      expanded: true,
    };
  },
  async asyncData({ route }) {
    let { id } = route.query;
    let pluginComponent;
    try {
      pluginComponent = (await import(`../../plugin/${id}/src/${id}.vue`)).default;
    } catch (e) {
      id = defaultPluginId;
      pluginComponent = (await import(`../../plugin/${id}/src/${id}.vue`)).default;
    }
    Vue.component(`vms-plugin-${id}`, pluginComponent);
  },
  computed: {
    pluginComponent() {
      return `vms-plugin-${this.$store.state.route.query.id || defaultPluginId}`;
    },
  },
  created() {
  },
  methods: {
    click(node) {
      this.$router.push({
        name: rnames.plugin,
        query: { id: node.id },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
