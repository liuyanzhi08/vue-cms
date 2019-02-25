import plugin from './src/spider';

plugin.install = Vue => Vue.component(plugin.name, plugin);

export default plugin;
