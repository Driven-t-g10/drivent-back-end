import { authenticationService, SignInParams, signOrSignUpOAuth } from '@/services/authentication-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;
  const result = await authenticationService.signIn({ email, password });

  res.status(httpStatus.OK).send(result);
}

export type OauthParams = { code: string };

export async function autehnticateOAuth(req: Request, res: Response) {
  const { code } = req.params as OauthParams;
  const result = await signOrSignUpOAuth({ code });

  res.status(httpStatus.OK).send(result);
}
