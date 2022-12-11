const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

//GET cart
router.get("/cart", async (req, res) => {

  const products = user.cart
  });

  router.get("/cart", (req, res, next) => {
    const user = User.findById(req.session.currentUser).populate("cart")
    .then((user) => {
      const products = user.cart
      res.json(user, products)
    })
    .catch((err) => res.json(err));

  })

module.exports = router;
