import { CreateUserTicketParams } from '@/services';
import Joi from 'joi';

export const updatePaymentParam = Joi.object({
  id: Joi.number().min(1).required(),
});

export type CreateUserTicketSchema = Pick<CreateUserTicketParams, 'hasHotel'>;
export const createUserTicketSchema = Joi.object<CreateUserTicketSchema>({
  hasHotel: Joi.boolean().required(),
});

export type CreateUserTIcketParams = Pick<CreateUserTicketParams, 'ticketId'>;
const isDigits = /^(\d)*$/;
export const createUserTicketParams = Joi.object<CreateUserTicketParams>({
  ticketId: Joi.string().regex(isDigits).required(),
});
