import ticketRepository from '@/repositories/ticket-repository';

async function getTickets() {
  return ticketRepository.getTickets();
}

const ticketService = { getTickets };
export default ticketService;
