import mongoose from "mongoose";
import ICustomer from "../interfaces/ICustomer";

const { Schema } = mongoose;

const customerSchema = new Schema<ICustomer>(
  {
    allergy: String,
    annoyances: String,
    birthDate: Date,
    firstName: String,
    lastName: String,
    note: String,
    personalCode: {
      type:String,
      unique:true,
      index:true,
      required:true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
