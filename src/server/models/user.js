import { db } from '../config';
import Resource from '../component/resource-knex';

const userTable = `${db.prefix}_user`;
const user = new Resource(userTable, db);

export default user;
