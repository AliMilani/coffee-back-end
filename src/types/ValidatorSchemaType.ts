import {
  ValidationSchema,
  //   ValidationRuleName,
  ValidationRuleObject,
} from "fastest-validator"

type ValidatorSchema<payload> = ValidationSchema & {
  [Key in keyof payload]: ValidationRuleObject
}

export default ValidatorSchema
