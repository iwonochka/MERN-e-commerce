const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//POST cart
  router.post("/cart", (req, res, next) => {
    const { product, color, size } = req.body;
    // CartItem.create({product: product, colorChoice: color, sizeChoice: size})
    // .then((cartItem) => {
    //   res.json(cartItem)
    // })
    // .catch((err) => res.json(err));
  })

  //GET cart
  router.get("/cart", (req, res, next) => {
    //We get the user and then user.cart
  //   .then((cart) => {
  //     res.json(cart)
  //   })
  //   .catch((err) => res.json(err));
  })

module.exports = router;
