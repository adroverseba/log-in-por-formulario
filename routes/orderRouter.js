const express = require("express");

const OrderService = require("../services/orderServices");

const router = express.Router();
const service = new OrderService();

router.get("/", async (req, res) => {
  try {
    const orders = await service.find();
    res.status(201).json(orders);
  } catch (error) {
    //
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await service.findOne(id);
    res.status(201).json(order);
  } catch (error) {
    //
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  } catch (error) {
    //
  }
});

router.post("/add-item", async (req, res, next) => {
  try {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  } catch (error) {
    //
  }
});

module.exports = router;
