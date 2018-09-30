import list from './list/index';
import detail from './detail/index';

const directive = {};
directive.install = (Vue) => {
  Vue.use(list);
  Vue.use(detail);
};

export default directive;
