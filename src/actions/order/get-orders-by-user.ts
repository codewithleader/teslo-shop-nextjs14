'use server';

import { authMiddleware } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrdersByUser = async () => {
  const session = await authMiddleware();
  if (!session?.user) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      OrderAddress: true,
    },
  });
  return {
    ok: true,
    orders,
  };
};
