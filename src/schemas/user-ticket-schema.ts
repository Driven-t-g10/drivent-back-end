import { CreateUserTicketParams } from '@/services';
import Joi from 'joi';

export type CreateUserTicketSchema = Pick<CreateUserTicketParams, 'hasHotel'>;
export type CreateUserTIcketParams = Pick<CreateUserTicketParams, 'ticketId'>;

export const createUserTicketSchema = Joi.object<CreateUserTicketSchema>({
  hasHotel: Joi.boolean().required(),
});

export const createUserTicketParams = Joi.object<CreateUserTicketParams>({
  ticketId: Joi.string().required(),
});
