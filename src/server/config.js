import $path from 'path';
import config from '../config';

const { db } = config;
db.rootId = 1;

const server = {
  port: config.server.port,
  url: `${config.uri}:${config.server.port}`,
};

const root = $path.resolve();
const dist = $path.join(root, 'dist');
const clientDist = $path.join(dist, 'client');
const serverDist = $path.join(dist, 'server');
const devClientDist = $path.join(root, '.dist');
const staticDir = $path.join(root, 'page');
const clientRoot = $path.join(root, 'src/client');
const serverRoot = $path.join(root, 'src/server');
const themeDir = $path.join(clientRoot, 'theme');
const accessLogDir = $path.isAbsolute(config.server.log.access)
  ? config.server.log.access : $path.join(root, config.server.log.access);
const errorLogDir = $path.isAbsolute(config.server.log.error)
  ? config.server.log.error : $path.join(root, config.server.log.error);
const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
  $public: '/dist/',
};

const dir = {
  root,
  clientRoot,
  serverRoot,
  dist,
  clientDist,
  serverDist,
  devClientDist,
  theme: themeDir,
  static: staticDir,
  log: {
    access: accessLogDir,
    error: errorLogDir,
  },
};

const { ssr, theme } = config;

export default {
  db,
  server,
  path,
  ssr,
  dir,
  theme,
};
