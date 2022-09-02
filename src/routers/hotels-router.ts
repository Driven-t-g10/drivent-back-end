import { Router } from 'express';
import { getRoomsWithUsers } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const hotelsRouter = Router();

// hotelsRouter.all('*', authenticateToken);
hotelsRouter.get('/:id', getRoomsWithUsers);

export { hotelsRouter };
