import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';

export async function getDates(req: Request, res: Response) {
  const result = await activitiesService.getDates();

  res.status(200).send(result);
}

export async function getPlaces(req: Request, res: Response) {
  const result = await activitiesService.getPlaces();

  res.status(200).send(result);
}
