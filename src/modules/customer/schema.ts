import Joi from 'joi';

export const createSchema = Joi.object({
  allergies: Joi.array().items(Joi.string()),
  annoyances: Joi.string(),
  birthDate:Joi.date(),
  firstName:Joi.string(),
  lastName:Joi.string(),
  note:Joi.string(),
  persinalCode:Joi.number(),
  phoneNumber:Joi.string().required(),
  userType:Joi.string()
});