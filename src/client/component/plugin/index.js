import spider from './spider';

const plugin = {};
plugin.install = (Vue) => {
  Vue.use(spider);
};

export default plugin;
