import Resource from './resource-koa';
import config from '../config';

const user = new Resource(`${config.db.prefix}_user`);
export default user;
