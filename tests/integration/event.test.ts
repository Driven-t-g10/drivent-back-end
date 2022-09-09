import app, { init } from '@/app';
import { disconnectDB } from '@/config';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEvent } from '../factories';
import { cleanDb } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

afterAll(async () => {
  disconnectDB();
});

const server = supertest(app);

describe('GET /event', () => {
  it('should respond with status 200 and event data if there is an event', async () => {
    const response = await server.get('/event');

    expect(response.status).toBe(httpStatus.OK);
  });
});
