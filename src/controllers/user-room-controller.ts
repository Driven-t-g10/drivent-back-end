import { AuthenticatedRequest } from '@/middlewares';
import userRoomService from '@/services/user-room-service';
import { Response } from 'express';

export async function getUserRoomByUserId(req: AuthenticatedRequest, res: Response) {
    const {userId} = req;

    const userRoom = await userRoomService.getUserRoomByUserId(userId);

    res.send(userRoom)
}
