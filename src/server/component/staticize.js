import { createBundleRenderer } from 'vue-server-renderer';
// import { server, path } from '../config';
// import { savePageRecurse } from '../helper/spider';

import serverManifest from '../../../dist/manifest/vue-ssr-server-bundle';
import clientManifest from '../../../dist/manifest/vue-ssr-client-bundle';

const renderer = createBundleRenderer(serverManifest, {
  clientManifest,
});

export default {
  get: async (ctx) => {
    // tod need auth
    // await savePageRecurse(`${server.url}${path.user}`, path.static, 'index.html');
    ctx.body = renderer.renderToString();
  },
};
