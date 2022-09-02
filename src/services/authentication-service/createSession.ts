import sessionRepository from '@/repositories/session-repository';
import jwt from 'jsonwebtoken';

async function createSession(userId: number) {
  /* eslint-disable-next-line no-console */
  console.log(userId, 'createSession', { jwt: process.env.JWT_SECRET });
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

export default createSession;
