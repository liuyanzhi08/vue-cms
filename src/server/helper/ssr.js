import { createBundleRenderer } from 'vue-server-renderer';
import fs from 'fs';
import path from 'path';
import logger from './logger';
import config from '../config';
import template from '../ssr/template.html';

const { dir } = config;
const { err } = logger;

const createRenderer = async ($devServer) => {
  let serverManifest;
  let clientManifest;
  if ($devServer) {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    const { readClientFile, readServerFile } = await $devServer.compileDone;
    clientManifest = JSON.parse(readClientFile('manifest/vue-ssr-client-bundle.json'));
    serverManifest = JSON.parse(readServerFile('manifest/vue-ssr-server-bundle.json'));
  } else {
    try {
      clientManifest = JSON.parse(fs.readFileSync(path.join(dir.dist, '/manifest/vue-ssr-client-bundle.json')).toString());
      serverManifest = JSON.parse(fs.readFileSync(path.join(dir.dist, '/manifest/vue-ssr-server-bundle.json')).toString());
    } catch (e) {
      err(e);
    }
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
