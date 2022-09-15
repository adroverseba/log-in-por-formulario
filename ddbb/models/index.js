const { ProductSchema, Product } = require("./productModel");
const { User, UserSchema } = require("./userModel");
const { Order, OrderSchema } = require("./orderModel");
const { OrderProduct, OrderProductSchema } = require("./order-productModel");

function setupModels(sequelize) {
  Product.init(ProductSchema, Product.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  Order.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
