import mongoose from "mongoose";
import Invoice, {
  InvoiceItem,
  InvoicePaymentType,
  InvoiceStatus,
} from "../interfaces/IInvoice";

const { Schema } = mongoose;

const InvoiceItemSchema = new Schema<InvoiceItem>({
  discountAmount: {
    type: Number,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  total: {
    type: Number,
    default: 1,
  },
});

const invoiceSchema = new Schema<Invoice>(
  {
    items: InvoiceItemSchema,
    customer:{
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    invoiceNumber:{
      type: Number,
      required:true
    },
    ServiceFee: {
      type: Number,
      default: 0,
    },
    invoiceDiscount: {
      type: Number,
      default: 0,
    },
    totalPaymentAmount: {
      type: Number,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card", "mixed"] as InvoicePaymentType[],
    },
    status: {
      type: String,
      enum: ["canceled", "completed", "draft"] as InvoiceStatus[],
      default: "draft",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Invoice", invoiceSchema);
