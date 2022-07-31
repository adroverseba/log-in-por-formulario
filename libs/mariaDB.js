// connection string + knex
// const knexProduct = require("knex")({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "root",
//     database: "ecommerce",
//   },
//   pool: { min: 0, max: 7 },
// });
// const { Sequelize } = require("sequelize");

const knexMessage = require("knex")({
  client: "sqlite3",
  connection: {
    filename: "./ddbb/messages.sqlite",
  },
  useNullAsDefault: true,
});

module.exports = { knexMessage };

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "../ddbb/messages.sqlite",
// });

// module.exports = sequelize;
