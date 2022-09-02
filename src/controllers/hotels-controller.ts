import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import hotelService from '@/services/hotels-service';

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const hotels = await hotelService.getHotels(userId);

  res.send(hotels);
}

export async function getRoomsWithUsers(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const rooms = await hotelService.getRoomsWithUsers(Number(id));

  return res.status(200).send(rooms);
}
