import { API_GET } from '..';

const ARTICLE_FETCH = 'article:fetch';
const ARTICLE_SET = 'article:set';

const article = {
  state: {
    article: {},
  },
  getters: {
    article: state => state.article,
  },
  mutations: {
    [ARTICLE_SET]: (state, arc) => {
      state.article = arc;
    },
  },
  actions: {
    [ARTICLE_FETCH]: async ({ commit, state, dispatch }, { id }) => {
      let arc;
      if (state.article.id === +id) {
        arc = await state.article;
      } else {
        const res = await dispatch(API_GET, 'article').get(id);
        arc = res.data;
        commit(ARTICLE_SET, arc);
      }
      return arc;
    },
  },
};

export {
  ARTICLE_FETCH,
  article,
};
