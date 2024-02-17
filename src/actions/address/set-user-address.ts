'use server';

import prisma from '@/lib/prisma';
import type { Address } from '@/interfaces';

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo guardar la dirección',
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  const { country, ...addressToSave } = address;
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });
    if (!storeAddress) {
      const newAddress = await prisma.userAddress.create({
        data: {
          ...addressToSave,
          countryId: country,
          userId,
        },
      });
      return newAddress;
    }
    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: {
        ...addressToSave,
        countryId: country,
      },
    });
    return updatedAddress;
  } catch (error) {
    console.error(error);
    throw new Error('No se pudo grabar la dirección');
  }
};
