import IInvoice from "./IInvoice";

export default type IUpdateInvoicePayload = Partial<Omit<IInvoice, "items">>
