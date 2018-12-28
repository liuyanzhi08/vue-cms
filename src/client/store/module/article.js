import { log } from '../../helper/logger';
import {
  STATUS_SET, STATUS_FETCH, STATUS_GOT, STATUS_404,
} from './status';

const ARTICLE_FETCH = 'article:fetch';
const ARTICLE_SET = 'article:set';
const type = 'article';

const article = {
  state: {
    articles: {},
  },
  getters: {
    articles: state => state.articles,
  },
  mutations: {
    [ARTICLE_SET]: (state, articles) => {
      Object.keys(articles).forEach((id) => {
        state.articles[id] = articles[id];
      });
    },
  },
  actions: {
    [ARTICLE_FETCH]: async ({
      commit, state, getters,
    }, { id }) => {
      if (
        getters.articleStatus === STATUS_404
        || (getters.articleStatus === STATUS_GOT && state.articles[id])
      ) {
        return state.article;
      }

      let arc;
      try {
        commit(STATUS_SET, { type, status: STATUS_FETCH });
        const res = await getters.Article.get(id);
        if (res.data) {
          arc = res.data;
        }
        commit(STATUS_SET, { type, status: STATUS_GOT });
      } catch (e) {
        if (e.response.status === 404) {
          log(`article id:${id} not found`);
        }
        commit(STATUS_SET, { type, status: STATUS_404 });
      }
      commit(ARTICLE_SET, { [id]: arc });

      return arc;
    },
  },
};

export {
  ARTICLE_FETCH,
  article,
};
