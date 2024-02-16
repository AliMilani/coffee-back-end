import mongoose from "mongoose"
import IProduct from "../interfaces/IProduct"

const { Schema } = mongoose

const productSchema = new Schema<IProduct>(
  {
    name: {
      // unique:true,
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model("Product", productSchema)
