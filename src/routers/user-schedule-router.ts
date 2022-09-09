import { setUserSchedule } from '@/controllers/schedules-controller';
import { authenticateToken, validateParams } from '@/middlewares';
import { scheduleSchema } from '@/schemas';
import { Router } from 'express';

const userScheduleRouter = Router();

userScheduleRouter.all('*', authenticateToken).post('/:scheduleId', validateParams(scheduleSchema), setUserSchedule);

export { userScheduleRouter };
