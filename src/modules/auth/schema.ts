export const registerSchema = {
  email: {
    type: "email",
    label: "ایمیل",
  },
  fullname: {
    type: "string",
    empty: false,
    label: "نام کامل",
  },
  password: {
    type: "string",
    empty: false,
    label: "گذرواژه",
  },
}

export const loginSchema = {
  email: {
    type: "email",
    label: "ایمیل",
  },
  password: {
    type: "string",
    empty: false,
    label: "گذرواژه",
  },
}
