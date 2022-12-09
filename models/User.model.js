const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: [true, "User role is required."],
    },
    cart: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    favs: [{type: Schema.Types.ObjectId, ref: 'Product'}]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
