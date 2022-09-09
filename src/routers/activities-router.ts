import { Router } from 'express';

import { getDates, getPlaces, getActivitiesByPlaceAndDate } from '@/controllers/activities-controller';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('*', authenticateToken);
activitiesRouter.post('/:activityId', () => {});
activitiesRouter.get('/dates', getDates);
activitiesRouter.get('/places', getPlaces);
activitiesRouter.get('', getActivitiesByPlaceAndDate);

export { activitiesRouter };
