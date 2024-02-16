import IInvoice from "./IInvoice";

export default interface IUpdateInvoicePayload
  extends Partial<Omit<IInvoice, "items">> {}
