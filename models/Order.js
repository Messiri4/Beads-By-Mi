import mongoose from "mongoose";
const ObjectID = mongoose.Schema.Types.ObjectId;


const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      type: ObjectID,
      // required: true,
      ref: "OrderItem",
    },
  ],
  shippingAddress1: {
    type: String,
    // required: true,
  },
  shippingAddress2: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  zip: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    // required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  totalPrice: {
    type: Number,
  },
  user: [
    {
      type: ObjectID,
      required: true,
      ref: "User",
    },
  ],
  dateOrdered: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
});

export default mongoose.model("Order", orderSchema);