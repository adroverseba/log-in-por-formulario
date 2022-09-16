const { models } = require("../libs/sequelize");

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = models.Order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: ["user", "items"],
    });
    return order;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }
}

module.exports = OrderService;
