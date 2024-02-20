'use server';

import { authMiddleware } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {
  const session = await authMiddleware();
  if (!session) {
    return {
      ok: false,
      message: 'Debe estar autenticado',
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `orden con id: ${id} no existe`;

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw `Orden con id: ${id} no pertenece al usuario con userId: ${session.user.id}`;
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'orden no existe',
    };
  }
};
