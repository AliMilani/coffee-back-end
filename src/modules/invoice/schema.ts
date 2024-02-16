// export {createSchema,findQuerySchema, updateSchema}
import Invoice, {
  InvoiceItem,
  // InvoicePaymentType,
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
    optional: true,
    modelName: "Customer",
    label: "مشتری",
  },
  ServiceFee: {
    type: "number",
    convert: true,
    optional: true,
    min: 0,
  },
  invoiceDiscount: {
    type: "number",
    convert: true,
    optional: true,
    min: 0,
  },
  totalPaymentAmount: {
    type: "forbidden",
  },
  invoiceNumber: {
    type: "forbidden",
  },
  items: {
    type: "forbidden",
  },
  // paymentType: {
  //   type: "string",
  //   optional:true,
  //   enum: ["card", "cash", "mixed"] as InvoicePaymentType[],
  // },
  paidCash: {
    type: "number",
    convert: true,
    optional: true,
    min: 0,
  },
  paidCard: {
    type: "number",
    convert: true,
    optional: true,
    min: 0,
  },
  status: {
    type: "string",
    optional: true,
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

export const invoiceAddProductSchema = {
  product: {
    type: "objectID",
    optional: true,
    modelName: "Product",
    label: "محصول",
  },
  discountAmount: {
    type: "number",
    convert: true,
    min: 500,
    default: 0,
    label: "تخفیف",
  },
  total: {
    type: "number",
    convert: true,
    min: 1,
    default: 1,
    label: "تعداد",
  },
};
