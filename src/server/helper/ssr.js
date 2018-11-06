import path from 'path';
import fs from 'fs';
import { createBundleRenderer } from 'vue-server-renderer';
import { isDev } from './env';
import { dir } from '../config';

const templatePath = path.join(dir.root, 'src/server/ssr/template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const createRenderer = async ($devServer) => {
  let serverManifest;
  let clientManifest;
  if (isDev) {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    const { readClientFile, readServerFile } = await $devServer;
    clientManifest = JSON.parse(readClientFile('manifest/vue-ssr-client-bundle.json'));
    serverManifest = JSON.parse(readServerFile('manifest/vue-ssr-server-bundle.json'));
  } else {
    clientManifest = await import('../../dist/manifest/vue-ssr-client-bundle');
    serverManifest = await import('../../dist/manifest/vue-ssr-server-bundle');
  }
  const options = {
    clientManifest,
    template,
    // this is only needed when vue-server-renderer is npm-linked
    basedir: dir.dist,
    // recommended for performance
    runInNewContext: false,
  };
  return createBundleRenderer(serverManifest, options);
};

export {
  createRenderer,
};
