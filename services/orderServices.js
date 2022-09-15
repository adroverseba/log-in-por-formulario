const { models } = require("sequelize");

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = models.Order.create(data);
    return newOrder;
  }
}
