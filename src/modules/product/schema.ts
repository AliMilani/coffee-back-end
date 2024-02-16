import IUpdateProductPayload from "../../interfaces/IUpdateProductPayload"
import ICreateProductPayload from "../../interfaces/ICreateProductPayload"
import ValidatorSchema from "../../types/ValidatorSchemaType"
import IApiQuery from "../../interfaces/IApiQuery"

export const createSchema: ValidatorSchema<ICreateProductPayload> = {
  name: {
    type: "string",
    empty: false,
    label: "نام محصول",
  },
  price: {
    type: "number",
    empty: false,
    convert: true,
    label: "قیمت",
  },
  inStock: {
    type: "boolean",
    empty: false,
    label: "موجدی انبار",
  },
  category: {
    type: "objectID",
    modelName: "Category",
    label: "دسته",
  },
}

export const updateSchema: ValidatorSchema<IUpdateProductPayload> = {
  name: {
    type: "string",
    optional: true,
    empty: false,
    label: "نام محصول",
  },
  price: {
    type: "number",
    optional: true,
    empty: false,
    label: "قیمت",
  },
  inStock: {
    type: "boolean",
    optional: true,
    empty: false,
    label: "موجدی انبار",
  },
  category: {
    type: "objectID",
    modelName: "Category",
    label: "دسته",
    optional: true,
  },
}

//TODO: export to interface
export const findQuerySchema: ValidatorSchema<
  IApiQuery & { search_name?: string; category: string }
> = {
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
  search_name: {
    type: "string",
    optional: true,
  },
  category: {
    type: "objectID",
    modelName: "Category",
    label: "دسته",
    optional: true,
  },
}
