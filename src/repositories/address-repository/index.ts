import { prisma } from '@/config';
import { Address } from '@prisma/client';

export type CreateAddressParams = Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentId'>;
export type UpdateAddressParams = CreateAddressParams;

const addressRepository = {};

export default addressRepository;
