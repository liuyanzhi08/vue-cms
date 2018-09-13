import Vue from 'vue';
import path from 'path';

export default {
  get() {
    return Vue.http.get(path.join('/api/staticize'));
  },
};
