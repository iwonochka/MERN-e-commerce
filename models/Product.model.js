const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    brand: {
      type: String,
      required: [true, "Category is required."]
    },
    model: {
      type: String,
      required: [true, "Model is required."]
    },
    category: {
      type: String,
      required: [true, "Category is required."]
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required."]
    },
    isEbike: {
      type: Boolean,
      required: true,
      default: false
    },
    price: {
      type: Number,
      required: [true, "Specify the price"]
    },
    gears: {
      type: Number,
      required: [true, "Specify number of gears"]
    },
    images: {
      type: Array,
    },
    colors: {
      type: Array,
      required: [true, "Specify available colors"]
    },
    sizes: {
      type: Array,
    },
    isAvailable: {
      type: Boolean,
      required: true,
      default: true,
    },
    quantity: {
      type: Number,
      required: [true, "Specify quantity"]
    }
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
