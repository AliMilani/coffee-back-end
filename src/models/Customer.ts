import mongoose from "mongoose";
import ICustomer from "../interfaces/ICustomer";

const { Schema } = mongoose;

const customerSchema = new Schema<ICustomer>(
  {
    allergies: [{ type: String }],
    annoyances: String,
    birthDate: Date,
    firstName: String,
    lastName: String,
    note: String,
    persinalCode: Number,
    phoneNumber: {
      type: String,
      required: true,
    },
    userType: String,
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
