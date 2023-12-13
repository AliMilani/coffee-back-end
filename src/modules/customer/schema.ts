export const createSchema = {
  allergy: {
    type: "string",
    label: "آلرژی",
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
    convert: true,
    label: "تاریخ تولد",
    optional: true,
  },
  firstName: {
    type: "string",
    empty: false,
    label: "نام",
    optional: true,
  },
  lastName: {
    type: "string",
    empty: false,
    label: "نام خانوادگی",
    optional: true,
  },
  note: {
    type: "string",
    empty: false,
    label: "یادداشت",
    optional: true,
  },
  personalCode: {
    type: "string",
    empty: false,
    label: "کد عوضویت",
    optional: true,
  },
  phoneNumber: {
    type: "string",
    empty: false,
    label: "تلفن همراه",
  },
  userType: {
    type: "string",
    empty: false,
    label: "نوع کاربر",
    optional: true,
  },
};

export const updateSchema = {
  ...createSchema,
  phoneNumber: {
    type: "number",
    convert:true,
    label: "تلفن همراه",
    optional:true
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
