import { prisma } from '@/config';
import { Address } from '@prisma/client';

export type CreateAddressParams = Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentId'>;
export type UpdateAddressParams = CreateAddressParams;

export async function create(address: CreateAddressParams, enrollmentId: number) {
  return prisma.address.create({
    data: {
      ...address,
      enrollmentId,
    },
  });
}

const addressRepository = { create };

export default addressRepository;
