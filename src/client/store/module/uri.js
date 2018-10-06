

const URI_SET = 'uri:set';
const URI_GET = 'uri:get';

const uri = {
  state: {
    uri: '',
  },
  getters: {
    uri: state => state.uri,
  },
  mutations: {
    [URI_GET]: (state, value) => {
      state.uri = value;
    },
  },
  actions: {
    [URI_GET]: ({ state }) => state.uri,
    [URI_SET]: ({ commit, dispatch }, value) => {
      commit(URI_SET, value);
      dispatch(URI_SET, value);
    },
  },
};

export {
  URI_SET,
  URI_GET,
  uri,
};
