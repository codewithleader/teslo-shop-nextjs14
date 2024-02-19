'use server';

import prisma from '@/lib/prisma';
import { authMiddleware } from '@/auth.config';
import type { Address, Size } from '@/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  // Verify user session
  const session = await authMiddleware();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: 'No hay session de usuario',
    };
  }

  // Get products info
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calcular los montos. Parte del encabezado detalle
  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0,
  );
};
