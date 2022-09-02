import { getUserRoomByUserId } from '@/controllers/user-room-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const userRoomRouter = Router();

userRoomRouter.all('/*', authenticateToken);
userRoomRouter.get('/', getUserRoomByUserId);

export { userRoomRouter };
