import app, { init } from '@/app';
import { disconnectDB } from '@/config';
import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createEvent,
  createTicket,
  createUser,
  createUserTicket,
  getUserTicket,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

beforeEach(async () => {
  await init();
  await cleanDb();
});

afterEach(() => disconnectDB());

const server = supertest(app);

describe('GET /userTicket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/enrollments');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and an empty object when there is no user-ticket for given user', async () => {
      const token = await generateValidToken();

      const response = await server.get('/user-ticket').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({});
    });

    it('should respond with status 200 and userTicket data when there is a userTicket for given user', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const token = await generateValidToken(user);
      const event = await createEvent();
      const ticket = await createTicket({ eventId: event.id });
      await createUserTicket({ userId: user.id, ticketId: ticket.id });

      const response = await server.get('/user-ticket').set('Authorization', `Bearer ${token}`);
      const userTicket = await getUserTicket(user.id);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body?.userTicket).toBeDefined();
      expect(JSON.stringify(response.body.userTicket)).toEqual(JSON.stringify(userTicket));
    });
  });
});

describe('POST /userTicket', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/user-ticket');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('given a invalid ticketId should respond with status 404', async () => {
      const token = await generateValidToken();
      const ticketId = faker.datatype.number({ min: 10000, max: 99999 });
      const response = await server
        .post(`/user-ticket/${ticketId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ hasHotel: true });

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('given a valid ticketId and userTicketData, should respond with status 201 and create a user-ticket', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const event = await createEvent();
      const ticket = await createTicket({ eventId: event.id });
      const token = await generateValidToken(user);

      const response = await server
        .post(`/user-ticket/${ticket.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ hasHotel: true });

      const userTicket = await getUserTicket(user.id);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(JSON.stringify(response.body)).toEqual(JSON.stringify(userTicket));
    });

    it('given word to ticketId should respond with status 400', async () => {
      const token = await generateValidToken();

      const response = await server
        .post(`/user-ticket/bbb`)
        .set('Authorization', `Bearer ${token}`)
        .send({ hasHotel: true });

      const userTicket = await getUserTicket();

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      expect(userTicket).toBeNull();
    });

    it('not given a hasHotel should respond with status 400', async () => {
      const user = await createUser();
      await createEnrollmentWithAddress(user);
      const event = await createEvent();
      const ticket = await createTicket({ eventId: event.id });
      const token = await generateValidToken(user);

      const response = await server.post(`/user-ticket/${ticket.id}`).set('Authorization', `Bearer ${token}`);
      const userTicket = await getUserTicket(user.id);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
      expect(userTicket).toBeNull();
    });
  });
});

describe('PATCH /user-ticket/payment/:id', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.patch('/user-ticket/payment/1');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when there is no user-ticket for given id', async () => {
      const token = await generateValidToken();

      const response = await server.patch('/user-ticket/payment/1').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('given a word to id should respond with status 400', async () => {
      const token = await generateValidToken();

      const response = await server.patch('/user-ticket/payment/a').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  it('given a valid id, should respond with status 200 and update the userTicket', async () => {
    const user = await createUser();
    await createEnrollmentWithAddress(user);
    const event = await createEvent();
    const ticket = await createTicket({ eventId: event.id });
    const userTicket = await createUserTicket({ userId: user.id, ticketId: ticket.id });
    const token = await generateValidToken(user);

    const response = await server
      .patch(`/user-ticket/payment/${userTicket.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });
});
