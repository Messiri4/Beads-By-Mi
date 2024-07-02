import mongoose from "mongoose";
const ObjectID = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    richDescription: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
    brand: {
      type: String,
      default: "",
    },
    category: {
      type: ObjectID,
      required: true,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
    },
    // fix validation for min: 0 and max:255
    countInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

productSchema.set('toJSON', {
  virtuals: true,
})

export default mongoose.model("Product", productSchema);
