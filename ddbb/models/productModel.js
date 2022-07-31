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

const PRODUCT_TABLE = "productos";

const ProductSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT,
  },
  thumbnail: {
    allowNull: false,
    type: DataTypes.STRING,
  },
};

class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: "Product",
      timestamps: false,
    };
  }
}

module.exports = { PRODUCT_TABLE, Product, ProductSchema };
