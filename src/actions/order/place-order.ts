'use server';

import prisma from '@/lib/prisma';
import { authMiddleware } from '@/auth.config';
import type { Address, Size } from '@/interfaces';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

class TransactionError extends Error {}

export const placeOrder = async (
  productIds: ProductToOrder[],
  shippingAddress: Address,
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

  try {
    // Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar stock de los productos

      // Acumular los valores
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new TransactionError(
            `Product with id: ${product.id}, no tiene cantidad definida`,
          );
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            // inStock: product.inStock - productQuantity, // No hacer esto
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verificar valores negativos en la existencia (No hay stock)
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new TransactionError(
            `${product.title} no tiene inventario suficiente`,
          );
        }
      });

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          // isPaid: false, // por defecto es falso si no se agrega

          // Nota: Aquí tambien se podía hacer la orderAddress pero se decidió hacerlo aparte con fines educativos.

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
      const { country: countryId, ...restShippingAddress } = shippingAddress;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restShippingAddress,
          countryId,
          orderId: order.id,
        },
      });

      return {
        updatedProducts,
        order,
        orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof TransactionError) {
      return {
        ok: false,
        message: error?.message,
      };
    } else {
      return {
        ok: false,
        message: 'Hubo un error. Contactar al administrador (Error: 500)',
      };
    }
  }
};
