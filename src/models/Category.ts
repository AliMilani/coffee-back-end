import mongoose from "mongoose";
import ICategory from "../interfaces/ICategory";

const { Schema } = mongoose;

const categorySchema = new Schema<ICategory>(
  {
    name: {
      // unique:true,
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
