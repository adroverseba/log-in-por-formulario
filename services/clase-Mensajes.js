const logger = require("../logger/index");

class Mensajes {
  constructor(knex, table) {
    this.knex = knex;
    this.table = table;
    this.knex.schema.hasTable(this.table).then((exists) => {
      if (!exists) {
        this.knex.schema
          .createTable(this.table, (table) => {
            table.increments("id").primary();
            table.date("date");
            table.string("message");
            table.string("userName");
          })
          .then(() => console.log("Tabla de productos creada"))
          .catch((err) => {
            console.log(err);
            throw err;
          });
      }
    });
  }

  async save(objeto) {
    this.knex(this.table)
      .insert(objeto)
      .then((prod) => prod)
      .catch((err) => {
        logger.error(err);
        throw err;
      });
  }

  async getAll() {
    try {
      const read = await this.knex.from(this.table).select("*");
      // console.log(read);   // verificacion de funcionamiento
      return read;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = Mensajes;
