import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB, redisClient } from '@/config';

loadEnv();
if (process.env.NODE_ENV !== 'test') {
  console.log('rodando redis client');
  redisClient();
}

import { handleApplicationErrors } from '@/middlewares';
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  ticketsRouter,
  userTicketRouter,
  hotelRouter,
  userRoomRouter,
  activitiesRouter,
  userScheduleRouter,
} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/tickets', ticketsRouter)
  .use('/user-ticket', userTicketRouter)
  .use('/hotel', hotelRouter)
  .use('/user-room', userRoomRouter)
  .use('/activities', activitiesRouter)
  .use('/user-schedule', userScheduleRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
