import { db } from '../config';
import { knex } from '../db';
import { err } from '../helper/logger';
import Resource from '../component/resource-knex';

const userTable = `${db.prefix}_user`;
const user = new Resource(userTable, db);

export default user;
