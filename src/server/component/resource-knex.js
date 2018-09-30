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
  }

  connect() {
    return this.db(this.table);
  }

  async get(data) {
    const item = await this.connect().where(data).then((res) => {
      if (res.length) {
        return res[0];
      }
      return null;
    });
    return item;
  }

  async query(data) {
    const list = await this.connect().where(data);
    return list;
  }

  async post() {}

  async create(data) {
    const item = await this.connect().insert(data);
    return item;
  }

  async put() {}

  async update() {}

  async delete() {}

  async del() {}
}

export default KnexResource;
