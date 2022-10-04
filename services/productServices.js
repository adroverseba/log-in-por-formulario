// const { faker } = require("@faker-js/faker");
// class Container {
//   constructor() {
//     this.products = [];
//     this.generate();
//   }
//   generate() {
//     const limit = 5;
//     for (let i = 0; i < limit; i++) {
//       this.products.push({
//         id: faker.datatype.number({ min: 1, max: 100 }),
//         title: faker.commerce.productName(),
//         price: faker.commerce.price(),
//         thumbnail: `https://picsum.photos/id/${faker.datatype.number({
//           min: 1,
//           max: 200,
//         })}/600`,
//       });
//     }
//   }

//   getAll() {
//     return this.products;
//   }

//   save(objeto) {
//     const product = {
//       id: faker.datatype.number({ min: 1, max: 50 }),
//       ...objeto,
//     };
//     this.products.push(product);
//     return { id };
//   }
// }
// module.exports = Container;
const logger = require("../logger/index");
const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");
const { service } = require("../config/mail");
class Container {
  constructor() {}

  async getAll() {
    return await models.Product.findAll();
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound("product not found");
    }
    return product;
  }

  async save(product) {
    const newProduct = await models.Product.create(product);
    return newProduct;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}
module.exports = Container;
