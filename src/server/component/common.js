import Resource from './resource-koa';
import config from '../config';

const common = new Resource(`${config.db.prefix}_common`);
export default common;
