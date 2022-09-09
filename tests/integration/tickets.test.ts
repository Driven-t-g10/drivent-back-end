import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import { createEnrollmentWithAddress, createEvent, createTicket, createUser } from '../factories';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /ticket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/tickets');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 if user has no enrollment', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with empty object when there is no ticket', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);

      const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toHaveLength(0);
    });

    it('should respond with ticket object ', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);
      const event = await createEvent();
      await createTicket();

      const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);
      const [body] = response.body;

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
