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
      state.article = arc.data;
    },
  },
  actions: {
    [ARTICLE_FETCH]: async ({ commit, state, getters }, { id }) => (
      await state.article.id === +id
        ? Promise.resolve(state.article)
        : getters.Article.get(id).then(res => commit(ARTICLE_SET, res))
    ),
  },
};

export {
  ARTICLE_FETCH,
  article,
};
