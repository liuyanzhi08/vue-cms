const THEME_SET = 'theme:set';
const THEME_GET = 'theme:get';

const theme = {
  state: {
    index: null,
    detail: null,
    list: null,
  },
  getters: {
    indexTheme: state => state.index,
    detailTheme: state => state.detail,
    listTheme: state => state.list,
  },
  mutations: {
    [THEME_SET]: (state, value) => {
      if (value.index) {
        state.index = value.index;
      }
      if (value.detail) {
        state.detail = value.detail;
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
