import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const hotels = await hotelService.getHotels(userId);

  res.send(hotels);
}
