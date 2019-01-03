import { log } from '../../helper/logger';
import { path } from '../../config';

const CATEGORY_FETCH = 'categories:fetch';
const CATEGORY_SET = 'categories:set';
const CATEGORY_ARTICLES_SET = 'categories:articles:set';

const category = {
  state: {
    categories: {},
  },
  getters: {
    categories: state => state.categories,
  },
  mutations: {
    [CATEGORY_ARTICLES_SET]: (state, articles) => {
      Object.keys(articles).forEach((id) => {
        state.categories[id].articles = articles[id];
      });
    },
  },
  actions: {
    [CATEGORY_SET]: ({ state, getters }, categories) => {
      Object.keys(categories).forEach((id) => {
        const articles = state.categories[id] && state.categories[id].articles;
        state.categories[id] = categories[id];
        state.categories[id].articles = articles || [];
        state.categories[id].url = getters.isPublish
          ? `category/${id}` : `${path.user}/category/${id}`;
      });
    },
    [CATEGORY_FETCH]: async ({
      commit, state, getters, dispatch,
    }, { id }) => {
      if (!(id in state.categories)) {
        try {
          dispatch(CATEGORY_SET, { [id]: { articles: [] } });
          const promises = [];
          promises.push(getters.Category.get(id).then((res) => {
            dispatch(CATEGORY_SET, { [id]: res.data });
          }));
          promises.push(getters.Article.query({ category_id: id }).then((res) => {
            const articles = res.data.items;
            articles.forEach((article) => {
              article.url = getters.isPublish
                ? `/article/${article.id}` : `${path.user}/article/${article.id}`;
            });
            commit(CATEGORY_ARTICLES_SET, { [id]: articles });
          }));
          await Promise.all(promises);
        } catch (e) {
          log(e);
          log(`category id=${id} not found`);
        }
      }
    },
  },
};

export {
  CATEGORY_FETCH,
  category,
};
