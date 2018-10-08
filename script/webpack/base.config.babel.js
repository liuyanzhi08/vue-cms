import path from 'path';
import config from '../../src/config';

const rootDir = config.dir.root;

export default {
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@image': path.join(rootDir, 'src/client/asset/image'),
      '@style': path.join(rootDir, 'src/client/asset/style'),
    },
    extensions: ['.js', '.vue', '.json'],
  },
};
