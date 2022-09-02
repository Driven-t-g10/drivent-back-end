import { userTicketHasNoAccomodationError } from '@/errors/user-ticket-has-no-accomodation-error';
import hotelRepository from '@/repositories/hotel-repository';
import userTicketRepository from '@/repositories/user-ticket-repository';

async function getHotels(userId: number) {
  await checkUserAccomodation(userId);

  const hotels = await hotelRepository.getHotels();

  return hotels;
}

async function checkUserAccomodation(userId: number) {
  const userTicket = await userTicketRepository.getUserTicketByUserId(userId);

  if (!userTicket || !userTicket.isPaid || !userTicket.hasHotel) {
    throw userTicketHasNoAccomodationError();
  }
}

async function getRoomsWithUsers(id: number) {
  return hotelRepository.getRoomsWithUsers(id);
}

const hotelService = { getHotels, getRoomsWithUsers };

export default hotelService;
