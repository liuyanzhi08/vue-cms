import { log } from '../../helper/logger';
import { path } from '../../config';

const CATEGORY_FETCH = 'categories:fetch';
const CATEGORY_SET = 'categories:set';
const CATEGORY_ARTICLES_SET = 'categories:articles:set';

const category = {
  state: {
    categories: {},
    articles: {},
  },
  getters: {
    categories: state => state.categories,
    articles: state => state.articles,
  },
  mutations: {
    [CATEGORY_SET]: (state, categories) => {
      Object.keys(categories).forEach((id) => {
        state.categories[id] = categories[id];
      });
    },
    [CATEGORY_ARTICLES_SET]: (state, articles) => {
      Object.keys(articles).forEach((id) => {
        state.articles[id] = articles[id];
      });
    },
  },
  actions: {
    [CATEGORY_FETCH]: async ({ commit, state, getters }, { id }) => {
      if (!(id in state.categories)) {
        try {
          const promises = [];
          promises.push(getters.Category.get(id).then(res => commit(CATEGORY_SET, { [id]: res })));
          promises.push(getters.Article.query({ id }).then((res) => {
            const articles = res.data.items;
            articles.forEach((article) => {
              article.url = `${path.user}/article/${article.id}`;
            });
            commit(CATEGORY_ARTICLES_SET, { [id]: articles });
          }));
          await Promise.all(promises);
        } catch (e) {
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
