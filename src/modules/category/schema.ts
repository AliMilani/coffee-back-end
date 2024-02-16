import ICreateCategory from "../../interfaces/ICreateCategoryPayload"
import ValidatorSchema from "../../types/ValidatorSchemaType"
import IUpdateCategory from "../../interfaces/IUpdateCategoryPayload"
import IApiQuery from "../../interfaces/IApiQuery"

export const createSchema: ValidatorSchema<ICreateCategory> = {
  name: {
    type: "string",
    empty: false,
    label: "نام دسته",
  },
}

export const updateSchema: ValidatorSchema<IUpdateCategory> = {
  name: {
    type: "string",
    optional: true,
    empty: false,
    label: "نام دسته",
  },
}

export const findQuerySchema: ValidatorSchema<
  IApiQuery & { search_name?: string }
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
}
