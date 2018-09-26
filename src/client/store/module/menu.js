const MENU_SET = 'menu:set';
const MENU_SHOW = 'menu:show';
const MENU_HIDE = 'menu:hide';
const MENU_TOGGLE = 'menu:toggle';


const menu = {
  state: {
    menu: null,
  },
  mutations: {
    [MENU_SET]: (_state, _menu) => {
      const state = _state;
      state.menu = _menu;
    },

  },
  actions: {
    [MENU_SET]: ({ commit }, _menu) => {
      commit(MENU_SET, _menu);
    },
    [MENU_SHOW]: ({ state }) => {
      if (state.menu) {
        state.menu.show();
      }
    },
    [MENU_HIDE]: ({ state }) => {
      if (state.menu) {
        state.menu.hide();
      }
    },
    [MENU_TOGGLE]: ({ state }) => {
      if (state.menu) {
        state.menu.toggle();
      }
    },
  },
};

export {
  MENU_SET,
  MENU_SHOW,
  MENU_HIDE,
  MENU_TOGGLE,
  menu,
};
