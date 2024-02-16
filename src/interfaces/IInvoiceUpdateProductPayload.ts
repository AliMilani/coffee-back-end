import { InvoiceItem } from "./IInvoice"

export default interface IInvoiceUpdateProductPayload
  extends Omit<Partial<InvoiceItem>, "product"> {
  product: string
  // invoice:string;
}
