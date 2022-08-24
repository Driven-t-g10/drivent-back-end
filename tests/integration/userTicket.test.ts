import app, { init } from '@/app';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createEvent, createTicket, createUser, createUserTicket } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /userTicket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/enrollments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when there is no user-ticket for given user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/user-ticket').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and enrollment data with address when there is a enrollment for given user', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);
      const event = await createEvent();
      const ticket = await createTicket({ eventId: event.id });
      await createUserTicket({ userId: user.id, ticketId: ticket.id });

      const response = await server.get('/user-ticket').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toBeDefined();
    });
  });
});

describe('POST /userTicket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/enrollments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('given a invalid ticketId should respond with status 404', async () => {
      const token = await generateValidToken();
      const ticketId = faker.datatype.number({ min: 10000, max: 99999 });
      const response = await server.post(`/user-ticket/${ticketId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('given a valid ticketId should respond with status 201 and create a user-ticket', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const event = await createEvent();
      const ticket = await createTicket({ eventId: event.id });
      const token = await generateValidToken(user);

      const response = await server.post(`/user-ticket/${ticket.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toBeDefined();
    });
  });
});
