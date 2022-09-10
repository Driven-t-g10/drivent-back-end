import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';
import { UpdateAddressParams } from '@/repositories/address-repository';

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

async function create(enrollment: CreateEnrollmentParams) {
  return prisma.enrollment.create({
    data: enrollment,
  });
}

async function update(
  userId: number,
  enrollmentId: number,
  updatedEnrollment: UpdateEnrollmentParams,
  updatedAddress: UpdateAddressParams,
) {
  return prisma.$transaction([
    prisma.enrollment.update({
      where: {
        userId,
      },
      data: updatedEnrollment,
    }),
    prisma.address.update({
      where: {
        enrollmentId,
      },
      data: updatedAddress,
    }),
  ]);
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  update,
  findByUserId,
  create,
};

export default enrollmentRepository;
