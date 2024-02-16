import IInvoice from "./IInvoice"

type IUpdateInvoicePayload = Partial<Omit<IInvoice, "items">>

export default IUpdateInvoicePayload
