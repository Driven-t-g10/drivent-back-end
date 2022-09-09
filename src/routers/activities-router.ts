import { Router } from 'express';

import {
  getDates,
  getPlaces,
  getActivitiesByPlaceAndDate,
  getScheduleUsers,
} from '@/controllers/activities-controller';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('*', authenticateToken);
activitiesRouter.get('/dates', getDates);
activitiesRouter.get('/places', getPlaces);
activitiesRouter.get('', getActivitiesByPlaceAndDate);
activitiesRouter.get('/users/:scheduleId', getScheduleUsers);

export { activitiesRouter };
