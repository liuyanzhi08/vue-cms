import config from '../config';
import Resource from '../component/resource-knex';

const { db } = config;

const userTable = `${db.prefix}_user`;
const user = new Resource(userTable, db);

export default user;
