export const createSchema = {
  name: {
    type: "string",
    empty: false,
    label: "نام دسته",
  },
}

export const updateSchema = {
  name: {
    type: "string",
    optional: true,
    empty: false,
    label: "نام دسته",
  },
}

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
  search_name: {
    type: "string",
    optional: true,
  },
}
