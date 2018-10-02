import md from './md';

const filter = {};
filter.install = (Vue) => {
  Vue.use(md);
};

export default filter;
