import { InvoiceItem } from "./IInvoice";

export default interface IInvoiceAddProductPayload
  extends Omit<InvoiceItem, "product"> {
  product: string;
  // invoice:string;
}
