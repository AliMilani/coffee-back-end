import { ObjectId } from "mongoose";
import ICustomer from "./ICustomer";
import IProduct from "./IProduct";
// import IUser from "./IUser";

export type InvoiceItem = {
  discountAmount: number;
  total: number;
  product: IProduct;
};

export type InvoiceStatus = "draft" | "completed" | "canceled";

// export type InvoicePaymentType = "cash" | "card" | "mixed";

export default interface IInvoice {
  _id: ObjectId | string;
  customer: ICustomer | string;
  status: InvoiceStatus;
  // orderDate: Date;
  // admin: IUser | string;
  invoiceNumber: number;
  items: InvoiceItem[];
  ServiceFee?: number;
  invoiceDiscount?: number;
  totalPaymentAmount?: number;
  // paymentType?: InvoicePaymentType;
  paidCash?: number;
  paidCard?: number;
}
