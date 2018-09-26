import config from '../config';

const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
};

const { db } = config;
db.rootId = 1;

export { path, db };
export default path;
