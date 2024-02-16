import ILoginPayload from "../../interfaces/ILoginPayload"
import IRegisterPayload from "../../interfaces/IRegisterPayload"
import ValidatorSchema from "../../types/ValidatorSchemaType"

export const registerSchema: ValidatorSchema<IRegisterPayload> = {
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

export const loginSchema: ValidatorSchema<ILoginPayload> = {
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
