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
  .then((order) => res.json(order))
  .catch((err) => console.log(err))
});

router.post("/updateFavs", (req, res, next) => {
  const {favs, user} = req.body;
  const found = User.findOneAndUpdate({_id: user._id}, {favs: favs})
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
