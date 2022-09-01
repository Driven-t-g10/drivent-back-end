import { autehnticateOAuth } from '@/controllers';
import { validateParams } from '@/middlewares';
import { oauthParamsSchema } from '@/schemas';
import { Router } from 'express';

const authenticationOAuthRouter = Router();

authenticationOAuthRouter.post('/:code', validateParams(oauthParamsSchema), autehnticateOAuth);

export default authenticationOAuthRouter;
