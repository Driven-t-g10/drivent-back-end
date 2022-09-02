import Joi from 'joi';

export const confirmReservationSchema = Joi.object({
  roomId: Joi.number().required(),
});
