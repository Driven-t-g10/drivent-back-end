import Joi from 'joi';

export const updatePaymentParam = Joi.object({
  id: Joi.number().min(1).required(),
});
