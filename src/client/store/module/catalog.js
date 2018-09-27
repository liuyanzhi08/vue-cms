import { dfs } from '../../helper/search';
import { err } from '../../helper/logger';
import { db } from '../../config';

const ARTICLE_UPDATED = 'catalog:article:updated';
const RENDER_NODE = 'catalog:render:node';
const test = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1',
    children: [{
      label: '三级 1-1-1',
    }],
  }],
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1',
    children: [{
      label: '三级 2-1-1',
    }],
  }, {
    label: '二级 2-2',
    children: [{
      label: '三级 2-2-1',
    }],
  }],
}, {
  label: '一级 3',
  children: [{
    label: '二级 3-1',
    children: [{
      label: '三级 3-1-1',
    }],
  }, {
    label: '二级 3-2',
    children: [{
      label: '三级 3-2-1',
    }],
  }],
}];
const catalog = {
  state: {
    root: {
      id: db.rootId,
      children: [],
    },
  },
  getters: {
    rootCategory: state => state.root.children,
  },
  mutations: {
    // [ARTICLE_UPDATED]: (state) => {
    //   // state.catalog = test;
    // },
    [RENDER_NODE]: (state, { node, subs }) => {
      const target = node.data;
      const matchedNode = dfs(state.root, target);
      if (matchedNode) {
        matchedNode.children = subs;
        state.root.children = state.root.children.splice(0);
      } else {
        err('node not found', node);
      }
    },
  },
  actions: {
    [ARTICLE_UPDATED]: ({ commit }, article) => {
      commit(ARTICLE_UPDATED, article);
    },
    [RENDER_NODE]: ({ commit }, { node, subs }) => {
      commit(RENDER_NODE, { node, subs });
    },
  },
};

export {
  ARTICLE_UPDATED,
  RENDER_NODE,
  catalog,
};
