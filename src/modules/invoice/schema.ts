import { InvoiceStatus } from "../../interfaces/IInvoice"
import ICreateInvoice from "../../interfaces/ICreateInvoice"
import IUpdateInvoicePayload from "../../interfaces/IUpdateInvoicePayload"
import ValidatorSchema from "../../types/ValidatorSchemaType"
import IApiQuery from "../../interfaces/IApiQuery"
import IInvoiceAddProductPayload from "../../interfaces/IInvoiceAddProductPayload"

export const createSchema: ValidatorSchema<ICreateInvoice> = {
  customer: {
    type: "objectID",
    modelName: "Customer",
    label: "مشتری",
  },
}

export const updateSchema: ValidatorSchema<IUpdateInvoicePayload> = {
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
}

export const findQuerySchema: ValidatorSchema<IApiQuery> = {
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
}

export const invoiceAddProductSchema: ValidatorSchema<IInvoiceAddProductPayload> =
  {
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
  }
