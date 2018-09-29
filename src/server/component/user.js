import Resource from './resource-koa';
import { db } from '../config';

// const user = new Resource(`${db.prefix}_user`);
const user = new Resource('user');
export default user;
