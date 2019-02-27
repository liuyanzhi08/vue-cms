import config from '../config';
import Resource from '../component/resource-knex';

const { db } = config;

const table = `${db.prefix}_article`;
const model = new Resource(table, db);

export default model;
