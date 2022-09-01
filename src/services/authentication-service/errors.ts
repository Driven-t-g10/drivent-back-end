import { ApplicationError } from '@/protocols';

export function invalidCredentialsError(): ApplicationError {
  return {
    name: 'InvalidCredentialsError',
    message: 'email or password are incorrect',
  };
}

export function accessDeniedError(): ApplicationError {
  return {
    name: 'AccessDeniedError',
    message: 'access denied',
  };
}
