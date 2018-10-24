import { path } from '../../config';
import { API_GET } from '..';

const CATEGORY_FETCH = 'category:fetch';
const CATEGORY_SET = 'category:set';
const CATEGORY_ARTICLES_SET = 'category:articles:set';

const category = {
  state: {
    category: {},
    articles: [],
  },
  getters: {
    category: state => state.category,
    articles: state => state.articles,
  },
  mutations: {
    [CATEGORY_SET]: (state, arc) => {
      state.category = arc.data;
    },
    [CATEGORY_ARTICLES_SET]: (state, articles) => {
      state.articles = articles;
    },
  },
  actions: {
    [CATEGORY_FETCH]: async ({ commit, state, dispatch }, { id }) => {
      if (state.category.id !== id) {
        await dispatch(API_GET, 'category').get(id).then(res => commit(CATEGORY_SET, res));
        await dispatch(API_GET, 'article').query({ id }).then((res) => {
          const articles = res.data.items;
          articles.forEach((article) => {
            article.url = `${path.user}/article/${article.id}`;
          });
          commit(CATEGORY_ARTICLES_SET, articles);
        });
      }
    },
  },
};

export {
  CATEGORY_FETCH,
  category,
};
