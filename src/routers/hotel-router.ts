import { getHotels, getRoomsWithUsers, confirmReservation } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';
import { validateBody } from '@/middlewares/validation-middleware';
import { confirmReservationSchema } from '@/schemas';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken);
hotelRouter.get('/', getHotels);
hotelRouter.get('/rooms/:id', getRoomsWithUsers);
hotelRouter.post('/reservation', validateBody(confirmReservationSchema), confirmReservation);

export { hotelRouter };
