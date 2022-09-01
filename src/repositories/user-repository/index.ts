import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data,
  });
}

async function findByGithubId(githubId: string) {
  return prisma.user.findFirst({
    select: { id: true, githubId: true },
    where: {
      githubId,
    },
  });
}

const userRepository = {
  findByEmail,
  findByGithubId,
  create,
};

export default userRepository;
