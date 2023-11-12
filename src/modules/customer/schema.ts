export const createSchema = {
  allergies: {
    type: "array",
    items: "string",
    optional: true,
  },
  annoyances: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
  },
  birthDate: {
    type: "date",
    optional: true,
  },
  firstName: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
  },
  lastName: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
  },
  note: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
  },
  persinalCode: {
    type: "number",
    optional: true,
  },
  phoneNumber: {
    type: "string",
    empty: false,
    label: "نام کامل",
  },
  userType: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
  },
};

export const updateSchema = {
  ...createSchema,
  phoneNumber: {
    type: "string",
    empty: false,
    label: "نام کامل",
    optional: true,
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
  search_keyword: {
    type: "string",
    optional: true,
  },
};
