import { createBundleRenderer } from 'vue-server-renderer';
import env from './env';
import config from '../config';
import template from '../ssr/template.html';

const { isDev } = env;
const { dir } = config;

const createRenderer = async ($devServer) => {
  let serverManifest;
  let clientManifest;
  if (isDev) {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    const { readClientFile, readServerFile } = await $devServer.compileDone;
    clientManifest = JSON.parse(readClientFile('manifest/vue-ssr-client-bundle.json'));
    serverManifest = JSON.parse(readServerFile('manifest/vue-ssr-server-bundle.json'));
  } else {
    clientManifest = await import('../../../dist/manifest/vue-ssr-client-bundle');
    serverManifest = await import('../../../dist/manifest/vue-ssr-server-bundle');
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

export default {
  createRenderer,
};
