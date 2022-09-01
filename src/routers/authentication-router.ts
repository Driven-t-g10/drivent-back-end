import { singInPost } from '@/controllers';
import { validateBody } from '@/middlewares';
import { signInSchema } from '@/schemas';
import { Router } from 'express';
import authenticationOAuthRouter from './authentication-oauth-router';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.use('/', authenticationOAuthRouter);

export { authenticationRouter };
