import hotelRepository from '@/repositories/hotel-repository';

async function getRoomsWithUsers(id: number) {
  return hotelRepository.getRoomsWithUsers(id);
}

const hotelService = { getRoomsWithUsers };
export default hotelService;
