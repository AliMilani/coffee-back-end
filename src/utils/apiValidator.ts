import mongoose from "mongoose"
import FastestValidator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator"

interface ValidationErrorWithLabel extends Partial<ValidationError> {
  label?: string
}
interface ValidationSchemaWithLabel extends ValidationSchema {
  label?: string
}

const farsiMessages = Object.freeze({
  objectStrict:
    "پارامتر {actual} مورد قبول نیست ، تنها موارد مشخص شده مثل {expected} مورد قبول است.",
  required: "{field} اجباری است.",
  min: "{field} باید حداقل {expected} کاراکتر باشد",
  max: "{field} باید حداکثر {expected} کاراکتر باشد",
  length: "{field} باید {expected} کاراکتر باشد",
  pattern: "{field} نامعتبر است",
  string: "{field} باید یک رشته باشد",
  stringEmpty: "{field} نمیتواند خالی باشد",
  stringMin: "{field} باید حداقل {expected} کاراکتر باشد",
  stringMax: "{field} باید حداکثر {expected} کاراکتر باشد",
  stringEnum: "{field} باید یک رشته و یکی از این موارد باشد: {expected}",
  email: "پست الکترونیکی نامعتبر است",
  emailMin: "پست الکترونیکی باید حداقل 6 کاراکتر باشد",
  emailMax: "پست الکترونیکی باید حداکثر 254 کاراکتر باشد",
  emailEmpty: "پست الکترونیکی نباید خالی باشد",
  stringLength: "{field} باید {expected} کاراکتر باشد",
  objectID: "{field} باید یک ابجکت ایدی معتبر باشد",
  url: "{field} باید یک آدرس اینترنتی معتبر باشد",
  number: "{field} باید یک عدد باشد",
  numberNotEqual: "{field} نمی تواند برابر با {expected} باشد",
  numberPositive: "{field} باید یک عدد مثبت باشد",
  equalField: "{field} باید برابر با {expected} باشد",
  boolean: "{field} باید یک مقدار بولین باشد",
  array: "{field} باید یک آرایه باشد",
  arrayEmpty: "{field} نمیتواند خالی باشد",
  arrayLength: "{field} باید {expected} آیتم داشته باشد",
  arrayMin: "{field} باید حداقل {expected} آیتم داشته باشد",
  arrayMax: "{field} باید حداکثر {expected} آیتم داشته باشد",
  arrayUnique: "{field} نمیتواند آیتم تکراری داشته باشد",
  forbidden: "{field} مجاز نیست",
  stringPattern: "{field} با الگوی {expected} مطابقت ندارد",
  date: "{field} باید یک تاریخ باشد",
  // custom validators messages
  idNotExist: "{field} در پایگاه داده موجود نیست",
})

const defaultTypes = {
  object: {
    strict: true,
  },
  objectID: {
    ObjectID: mongoose.Types.ObjectId,
    custom: async (
      value: string,
      errors: ValidationErrorWithLabel[],
      schema: ValidationSchemaWithLabel,
      name: string,
      parent: any,
      context: any,
    ) => {
      if (!value && schema.optional) return value
      if (!schema.modelName)
        throw new Error("modelName is required for objectID type")
      const Model = mongoose.model(schema.modelName)
      if (await Model.exists({ _id: value })) return value
      errors.push({
        type: "idNotExist",
        actual: value,
        label: schema.label,
        // field:name
      })
    },
  },
  email: {
    min: 6,
    max: 254,
    normalize: true,
    mode: "precise",
    label: "ایمیل",
  },
}

const v = new FastestValidator({
  useNewCustomCheckerFunction: true,
  messages: farsiMessages,
  defaults: defaultTypes,
})

const apiValidator = async (
  schema: any,
  payload: any,
): Promise<ValidationError[] | null> => {
  const validator = v.compile({ ...schema, $$async: true, $$strict: true })

  const result = await validator(payload)
  if (result === true) return null
  return result
}

export default apiValidator
