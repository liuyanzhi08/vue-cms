import $path from 'path';
import config from '../config';

const { db } = config;
db.rootId = 1;

const server = {
  port: config.server.port,
  url: `${config.uri}:${config.server.port}`,
};

const { root } = config.dir;
const dist = $path.join(root, 'dist');
const staticDir = $path.join(root, 'page');
const accessLogDir = $path.isAbsolute(config.server.log.access)
  ? config.server.log.access : $path.join(root, config.server.log.access);
const errorLogDir = $path.isAbsolute(config.server.log.error)
  ? config.server.log.error : $path.join(root, config.server.log.error);
const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
};

const dir = {
  root: config.dir.root,
  dist,
  static: staticDir,
  log: {
    access: accessLogDir,
    error: errorLogDir,
  },
};

export {
  db,
  server,
  path,
  dir,
};
