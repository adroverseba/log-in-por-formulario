const { models } = require("../libs/sequelize");

class ProductApi {
  constructor() {}

  async getAll() {
    return await models.Product.findAll();
  }
}

module.exports = ProductApi;
