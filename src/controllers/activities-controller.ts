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

export async function getActivitiesByPlaceAndDate(req: Request, res: Response) {
  const { place, date } = req.query;

  const result = await activitiesService.getActivitiesByPlaceAndDate(String(place), String(date));

  res.status(200).send(result);
}

export async function getScheduleUsers(req: Request, res: Response) {
  const { scheduleId } = req.params;

  const result = await activitiesService.getScheduleUsers(Number(scheduleId));

  res.status(200).send(result);
}
