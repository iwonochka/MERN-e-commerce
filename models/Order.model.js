const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    items: {
      type: Array,
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isPaid: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number
    },
    orderDetails: {
      type: Object
    }
  },
  {
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
