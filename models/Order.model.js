const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    item: {
      product: {type: Schema.Types.ObjectId, ref: 'Product'},
      sizeChoice: {
        type: String
      },
      colorChoice: {
        type: String
      }
    },
    total: {
      type: Number
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
