'use server';

import { authMiddleware } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async () => {
  const session = await authMiddleware();
  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      OrderAddress: true,
    },
  });
  return {
    ok: true,
    orders,
  };
};
