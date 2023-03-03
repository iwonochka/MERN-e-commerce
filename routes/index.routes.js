const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const Order = require("../models/Order.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/createOrder", async (req, res, next) => {
  const { newOrder } = req.body;
  try {
    const user = await User.findById(newOrder.user._id);
    const order = await Order.create({
      items: newOrder.items,
      user: user._id,
      isPaid: newOrder.isPaid,
      amount: newOrder.amount,
      orderDetails: newOrder.orderDetails,
    });
    res.json(order);
  } catch (err) {
    console.log(err);
  }
});


router.get("/orders/:userId", (req, res, next) => {
  const userId = req.params.userId
  Order.find({user: userId})
  .then((orders) => {
    res.json(orders)})
  .catch((err) => console.log(err))
});

router.post("/addFavs", (req, res, next) => {
  const {product, user} = req.body;
  const found = User.findOneAndUpdate({_id: user._id}, {$push: {favs: product}})
  .then((user) => res.json(user))
  .catch((err) => console.log(err))
});

router.post("/deleteFavs", (req, res, next) => {
  const {product, user} = req.body;
  const found = User.findOneAndUpdate({_id: user._id}, {$pull: {favs: product}})
  .then((user) => res.json(user))
  .catch((err) => console.log(err))
});

router.get("/favs/:userId", (req, res, next) => {
  const userId = req.params.userId
  User.findById(userId)
  .then((user) => {
    res.json(user)})
  .catch((err) => console.log(err))
});

module.exports = router;
