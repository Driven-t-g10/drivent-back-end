import sessionRepository from '@/repositories/session-repository';
import jwt from 'jsonwebtoken';

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

export default createSession;
