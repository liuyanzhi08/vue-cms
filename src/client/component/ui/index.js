import pagination from './pagination';
import collapse from './collapse';
import tree from './tree';
import sidebar from './sidebar';

const ui = {};
ui.install = (Vue) => {
  Vue.use(pagination);
  Vue.use(collapse);
  Vue.use(tree);
  Vue.use(sidebar);
};

export default ui;
