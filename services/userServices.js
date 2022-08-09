const { models } = require("../libs/sequelize");

class UserService {
  constructor() {}

  async getAll() {
    return await models.User.findAll();
  }

  async getOne(username) {
    return await models.User.findOne({ where: { email: username } });
  }

  async save(product) {
    const newProduct = await models.User.create(product);
    return newProduct;
  }
}

module.exports = UserService;
