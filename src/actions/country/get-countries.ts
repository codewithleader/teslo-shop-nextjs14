'use server';

import type { Country } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getCountries = async (): Promise<Country[]> => {
  try {
    return await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};
