import config from '../config';
import Resource from '../component/resource-knex';

const { db } = config;

const table = `${db.prefix}_article`;
const model = new Resource(table, db);

model.getTotal = async (categoryId) => {
  const data = await model.connect().where('category_id', categoryId).count('id as total');
  const { total } = data[0];
  return total;
};

export default model;
