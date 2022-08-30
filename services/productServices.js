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

const { models } = require("../libs/sequelize");
class Container {
  constructor() {}

  async getAll() {
    return await models.Product.findAll();
  }

  async save(product) {
    const newProduct = await models.Product.create(product);
    return newProduct;
  }
}
module.exports = Container;
