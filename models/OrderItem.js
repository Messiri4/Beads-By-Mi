import mongoose from "mongoose";
import Product from "./Product.js";

const ObjectID = mongoose.Schema.Types.ObjectId;

const validateOrderItemInput = async (id) => {
  const isProductId = mongoose.Types.ObjectId.isValid(id);
  console.log(isProductId);
  if (!isProductId) throw new Error("invalid product id");
  const product = await Product.findById(id);
  if (!product) throw new Error(`no product with id ${id}`);
};

const orderItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: ObjectID,
    ref: "Product",
    validate: {
      validator: validateOrderItemInput,
    },
  },
});

// middleware
// function checkObjectIdValid(id) {
//   if (mongoose.Types.ObjectId.isValid(id)) {
//     if (new ObjectID(id) === id) {
//       console.log("true");
//       return true;
//     } else {
//       console.log("false");
//       return false;
//     }
//   } else {
//     console.log("false");
//     return false;
//   }
// }

export default mongoose.model("OrderItem", orderItemSchema);
