const { models } = require("../libs/sequelize");

class MessageService {
  constructor() {}

  async getAll() {
    return await models.User.findAll();
  }

  async save(product) {
    const newProduct = await models.User.create(product);
    return newProduct;
  }
}

module.exports = MessageService;
