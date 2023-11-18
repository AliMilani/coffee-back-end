import IInvoice, { InvoicePaymentType } from "./IInvoice";

export default interface ICreateInvoice {
  customer: string;
  // ServiceFee?: number;
  // invoiceDiscount?: number;
  // totalPaymentAmount?: number;
  // paymentType?: InvoicePaymentType;
}
