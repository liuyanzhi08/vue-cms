import md from './src/md';

md.install = Vue => Vue.filter(md.name, md.handler);

export default md;
