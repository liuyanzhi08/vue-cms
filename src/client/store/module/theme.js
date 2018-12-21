const THEME_SET = 'theme:set';
const THEME_GET = 'theme:get';

const theme = {
  state: {
    current: null,
  },
  getters: {
    theme: state => state.current,
  },
  mutations: {
    [THEME_SET]: (state, value) => {
      state.current = value;
    },
  },
  actions: {
    [THEME_GET]: ({ state }) => state.current,
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
