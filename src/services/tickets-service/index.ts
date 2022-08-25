import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notEnrolledError } from '@/errors/user-not-enrolled-error';

async function getTickets(userId: number) {
  const checkEnrollment = await enrollmentRepository.findByUserId(userId);
  if (!checkEnrollment) {
    throw notEnrolledError();
  }
  return ticketRepository.getTickets();
}

const ticketService = { getTickets };
export default ticketService;
