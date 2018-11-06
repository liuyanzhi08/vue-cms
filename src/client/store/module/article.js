import { log } from '../../helper/logger';
import {
  STATUS_SET, STATUS_FETCH, STATUS_GOT, STATUS_404,
} from './status';

const ARTICLE_FETCH = 'article:fetch';
const ARTICLE_SET = 'article:set';
const type = 'article';

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
    [ARTICLE_FETCH]: async ({
      commit, state, getters,
    }, { id }) => {
      const finalStatus = [STATUS_GOT, STATUS_404];
      if (finalStatus.indexOf(getters.articleStatus) !== -1) {
        return state.article;
      }


      let arc;
      if (state.article.id === +id) {
        arc = state.article;
      } else {
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
