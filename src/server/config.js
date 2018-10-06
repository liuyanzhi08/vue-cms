import _path from 'path';
import config from '../config';

const { db } = config;
db.rootId = 1;

const server = {
  port: config.server.port,
  uri: `http://127.0.0.1:${config.server.port}`,
};

const root = _path.resolve(__dirname, '../..');
const dist = _path.join(root, 'dist');
const staticPath = _path.join(root, 'page');
const accessLogPath = _path.isAbsolute(config.server.log.access)
  ? config.server.log.access : _path.join(root, config.server.log.access);
const errorLogPath = _path.isAbsolute(config.server.log.error)
  ? config.server.log.error : _path.join(root, config.server.log.error);
const path = {
  root,
  dist,
  static: staticPath,
  log: {
    access: accessLogPath,
    error: errorLogPath,
  },
  user: config.server.path.user,
  admin: config.server.path.admin,
};

export {
  db,
  server,
  path,
};
