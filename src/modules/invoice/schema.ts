// export {createSchema,findQuerySchema, updateSchema}
import Invoice, {
  InvoiceItem,
  InvoicePaymentType,
  InvoiceStatus,
} from "../../interfaces/IInvoice";
export const createSchema = {
  customer: {
    type: "objectID",
    modelName: "Customer",
    label: "مشتری",
  },
};

export const updateSchema = {
  customer: {
    type: "objectID",
    optional:true,
    modelName: "Customer",
    label: "مشتری",
  },
  ServiceFee: {
    type: "number",
    optional:true,
    min: 0,
  },
  invoiceDiscount: {
    type: "number",
    optional:true,
    min: 0,
  },
  totalPaymentAmount: {
    type: "forbidden",
    optional:true,
  },
  invoiceNumber: {
    type: "forbidden",
    optional:true,
  },
  items: {
    type: "forbidden",
    optional:true,
  },
  paymentType: {
    type: "string",
    optional:true,
    enum: ["card", "cash", "mixed"] as InvoicePaymentType[],
  },
  status: {
    type: "string",
    optional:true,
    enum: ["draft", "canceled", "completed"] as InvoiceStatus[],
  },
};

export const findQuerySchema = {
  page: {
    type: "number",
    convert: true,
    optional: true,
  },
  limit: {
    type: "number",
    convert: true,
    optional: true,
  },
};
