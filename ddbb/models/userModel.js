// class Container {
//   constructor(knex, table) {
//     this.knex = knex;
//     this.table = table;
//     this.knex.schema.hasTable(this.table).then((exists) => {
//       if (!exists) {
//         this.knex.schema
//           .createTable(this.table, (table) => {
//             table.increments("id").primary();
//             table.string("title", 30).notNullable();
//             table.float("price");
//             table.string("thumbnail");
//           })
//           .then(() => console.log("Tabla de productos creada"))
//           .catch((err) => {
//             console.log(err);
//             throw err;
//           });
//       }
//     });
//   }

//   async save(objeto) {
//     this.knex(this.table)
//       .insert(objeto)
//       .then((art) => art)
//       .catch((err) => {
//         console.log(err);
//         throw err;
//       });
//   }

//   async getAll() {
//     try {
//       let arrProd = await this.knex(this.table).select("*");
//       console.log(arrProd);
//       return arrProd;
//     } catch (err) {
//       console.log(err);
//       throw err;
//     }
//   }
// }

// module.exports = Container;

// id,title,price,thumbnail
const { Model, DataTypes } = require("sequelize");

const USER_TABLE = "usuarios";

const UserSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class User extends Model {
  static associate(models) {
    this.hasMany(models.Order, {
      as: "orders",
      foreignKey: "userId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "User",
      timestamps: false,
    };
  }
}

module.exports = { USER_TABLE, User, UserSchema };
