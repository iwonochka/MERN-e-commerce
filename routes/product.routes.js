const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Product = require("../models/Product.model");
const User = require("../models/User.model");


//  GET /api/bikes -  Retrieves all of the bikes
router.get("/products", (req, res, next) => {
  Product.find()
  .then((bikes) => res.json(bikes))
  .catch((err) => res.json(err));
});

//  GET /api/bikes/:bikeId -  Retrieves a specific bike by id
router.get("/products/:productId", (req, res, next) => {
  const { bikeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
})




module.exports = router;
