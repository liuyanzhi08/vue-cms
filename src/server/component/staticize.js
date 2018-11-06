import { createBundleRenderer } from 'vue-server-renderer';
// import { server, $path } from '../config';
// import { savePageRecurse } from '../helper/spider';
import fs from 'fs';
import fse from 'fs-extra';
import $path from 'path';
import { dir } from '../config';
import { fail } from '../helper/ctx';
import serverManifest from '../../../dist/manifest/vue-ssr-server-bundle';
import clientManifest from '../../../dist/manifest/vue-ssr-client-bundle';
import { error } from '../helper/error';

const templatePath = $path.join(dir.root, 'src/server/ssr/template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const renderer = createBundleRenderer(serverManifest, {
  template,
  clientManifest,
});

export default {
  post: async (ctx) => {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const data = ctx.request.body;
    ctx.body = data;
    return;

    // tod need auth
    // await savePageRecurse(`${server.uri}${$path.user}`, $path.static, 'index.html');
    const url = '/user/article/4';
    const context = {
      title: 'Vue HN 2.0', // default title
      url,
    };
    try {
      const html = await renderer.renderToString(context);
      const filename = $path.join(dir.static, url, 'index.html');
      fse.outputFile(filename, html);
      ctx.body = html;
    } catch (e) {
      fail(ctx, e);
    }
  },
};
