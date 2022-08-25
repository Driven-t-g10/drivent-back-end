import { CreateUserTicketParams } from '@/services';
import Joi from 'joi';

export type CreateUserTicketSchema = Pick<CreateUserTicketParams, 'hasHotel'>;

export const createUserTicketSchema = Joi.object<CreateUserTicketSchema>({
  hasHotel: Joi.boolean().required(),
});
