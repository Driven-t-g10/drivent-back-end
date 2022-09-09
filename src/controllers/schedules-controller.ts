import { AuthenticatedRequest } from '@/middlewares';
import schedulesService from '@/services/schedules-service';
import { Response } from 'express';

export async function setUserSchedule(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const scheduleId = parseInt(req.params.scheduleId);

  const result = await schedulesService.setUserSchedule(userId, scheduleId);

  res.status(201).send(result);
}
