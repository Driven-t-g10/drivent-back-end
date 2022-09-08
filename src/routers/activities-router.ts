import { Router } from 'express';

import { getDates, getPlaces } from '@/controllers/activities-controller';
// import { authenticateToken } from '@/middlewares';
const activitiesRouter = Router();

// activitiesRouter.all('*', authenticateToken);
activitiesRouter.get('/dates', getDates);
activitiesRouter.get('/places', getPlaces);

export { activitiesRouter };
