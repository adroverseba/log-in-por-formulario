const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../ddbb/messages.sqlite",
});
// const sequelize = new Sequelize("sqlite::memory:");

const Mensaje = sequelize.define(
  "Mensaje",
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.STRING,
    },
    message: { type: DataTypes.STRING },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
  }
);

// Mensaje.sync();
// (async () => {
//   await Mensaje.sync({ force: true });
// Code here
// module.exports = sequelize;
// })();

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true
// table.increments("id").primary();
// table.date("date");
// table.string("message");
// table.string("userName");
