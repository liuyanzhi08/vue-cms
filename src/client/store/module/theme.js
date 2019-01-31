const THEME_SET = 'theme:set';
const THEME_GET = 'theme:get';

const theme = {
  state: {
    index: null,
    search: null,
    detail: {},
    list: {},
  },
  getters: {
    indexTheme: state => state.index,
    searchTheme: state => state.search,
    detailTheme: state => state.detail,
    listTheme: state => state.list,
  },
  mutations: {
    [THEME_SET]: (state, value) => {
      if (value.index) {
        state.index = value.index;
        return;
      }

      if (value.search) {
        state.search = value.search;
        return;
      }

      if (value.detail) {
        Object.keys(value.detail).forEach((key) => {
          state.detail[key] = value.detail[key];
        });
      }
      if (value.list) {
        state.list = value.list;
      }
    },
  },
  actions: {
    [THEME_SET]: ({ commit }, value) => {
      commit(THEME_SET, value);
    },
  },
};

export {
  THEME_SET,
  THEME_GET,
  theme,
};
