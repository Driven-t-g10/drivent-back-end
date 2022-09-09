import Joi from 'joi';

const numberRgx = /^[0-9]+$/;
export const scheduleSchema = Joi.object({
  scheduleId: Joi.string().regex(numberRgx).required(),
});
