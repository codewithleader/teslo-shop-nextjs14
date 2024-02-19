'use server';

import type { UserAddress } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getUserAddress = async (
  userId: string,
): Promise<UserAddress | null> => {
  try {
    const address = await prisma.userAddress.findUnique({ where: { userId } });
    if (!address) return null;
    const { countryId, address2, ...rest } = address;
    return {
      ...rest,
      country: countryId,
      address2: address2 ? address2 : '',
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
