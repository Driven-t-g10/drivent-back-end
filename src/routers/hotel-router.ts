import { getHotels, getRoomsWithUsers } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelRouter = Router();

hotelRouter.all('/*', authenticateToken);
hotelRouter.get('/', getHotels);
hotelRouter.get('/:id', getRoomsWithUsers);

export { hotelRouter };
