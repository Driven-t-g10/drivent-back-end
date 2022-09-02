import hotelService from '@/services/hotel-service';
import { Request, Response } from 'express';

export async function getRoomsWithUsers(req: Request, res: Response) {
  const { id } = req.params;
  const rooms = await hotelService.getRoomsWithUsers(Number(id));

  return res.status(200).send(rooms);
}
