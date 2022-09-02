import userRoomRepository from '@/repositories/user-room-repository';

async function getUserRoomByUserId(userId: number) {
  const userRoom = await userRoomRepository.getUserRoomByUserId(userId);

  return userRoom;
}

const userRoomService = { getUserRoomByUserId };

export default userRoomService;
