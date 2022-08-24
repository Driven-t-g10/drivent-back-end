import { ApplicationError } from '@/protocols';

export function invalidParamsError(details: string[] | undefined = undefined): ApplicationInvalidParamsError {
  return {
    name: 'InvalidParamsError',
    message: 'Invalid params',
    details,
  };
}

type ApplicationInvalidParamsError = ApplicationError & {
  details: string[];
};
