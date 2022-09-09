import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';
import { CreateAddressParams, UpdateAddressParams } from '@/repositories/address-repository';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function findByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
  createdAddress: CreateAddressParams,
  updatedAddress: UpdateAddressParams,
) {
  const enrollment = await findByUserId(userId);
  const enrollmentId = enrollment.id;
  return prisma.$transaction([
    prisma.enrollment.upsert({
      where: {
        userId,
      },
      create: createdEnrollment,
      update: updatedEnrollment,
    }),
    prisma.address.upsert({
      where: {
        enrollmentId,
      },
      create: {
        ...createdAddress,
        Enrollment: { connect: { id: enrollmentId } },
      },
      update: updatedAddress,
    }),
  ]);
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findByUserId,
};

export default enrollmentRepository;
