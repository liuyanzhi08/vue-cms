import knex from 'knex';

class KnexResource {
  constructor(table, db) {
    this.table = table;
    this.db = knex({
      client: 'mysql',
      connection: {
        host: '127.0.0.1',
        user: db.username,
        password: db.password,
        database: db.database,
      },
    });
    this.model = this.db(table);
  }

  async get(data) {
    const item = await this.model.where(data).then((res) => {
      if (res.length) {
        return res[0];
      }
      return null;
    });
    return item;
  }

  async query(data) {
    const list = await this.model.where(data);
    return list;
  }

  async post() {}

  async create(data) {
    const item = await this.model.insert(data);
    return item;
  }

  async put() {}

  async update() {}

  async delete() {}

  async del() {}
}

export default KnexResource;
