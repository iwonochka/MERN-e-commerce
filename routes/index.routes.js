const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/order", (req, res, next) => {
  const { newOrder} = req.body;
  Order.create({items: newOrder.items, user: newOrder.user})
  .then((order) => res.json(order)
  .catch((err) => console.log(err))
  )
});

module.exports = router;
