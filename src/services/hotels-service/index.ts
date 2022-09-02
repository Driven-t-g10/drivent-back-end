import { userTicketHasNoAccomodationError } from '@/errors/user-ticket-has-no-accomodation-error';
import hotelRepository from '@/repositories/hotel-repository';
import userTicketRepository from '@/repositories/user-ticket-repository';

async function getHotels(userId: number) {
  await checkUserAccomodation(userId);

  const hotels = await hotelRepository.getHotels();

  for (let i = 0; i < hotels.length; i++) {
    const roomTypes = await hotelRepository.getHotelRoomsTypeByHotelId(hotels[i].id);

    hotels[i].roomTypes = [];

    roomTypes.forEach((roomType) => hotels[i].roomTypes.push(roomType.roomType));
  }

  return hotels;
}

async function checkUserAccomodation(userId: number) {
  const userTicket = await userTicketRepository.getUserTicketByUserId(userId);

  if (!userTicket || !userTicket.isPaid || !userTicket.hasHotel) {
    throw userTicketHasNoAccomodationError();
  }
}

const hotelService = { getHotels };

export default hotelService;
