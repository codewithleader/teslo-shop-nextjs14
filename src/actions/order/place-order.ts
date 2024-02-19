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
    (count, item) => count + item.quantity,
    0,
  );

  // Tax, subTotal, total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);
      if (!product) {
        throw new Error(`Producto con id: ${item.productId} no existe`);
      }

      const subTotal = product.price * productQuantity;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 },
  );

  // Crear la transacción de base de datos
  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. Actualizar stock de los productos

    // 2. Crear la orden - Encabezado - Detalles
    const order = await tx.order.create({
      data: {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        // isPaid: false, // por defecto es falso si no se agrega

        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find(
                  (product) =>
                    //
                    product.id === p.productId,
                )?.price ?? 0,
            })),
          },
        },
      },
    });

    // todo: Validar si el price es cero lanzar error

    // 3. Crear la dirección de la orden

    return {
      order,
    };
  });
};
