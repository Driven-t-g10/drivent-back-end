import { ApplicationError } from '@/protocols';

export function notEnrolledError(): ApplicationError {
  return {
    name: 'NotFoundError',
    message: 'User not enrolled in this event!',
  };
}
