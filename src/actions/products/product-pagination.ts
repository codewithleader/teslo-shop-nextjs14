'use server';
import { Type } from '@/interfaces';
import prisma from '@/lib/prisma';

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      take: 3,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        category: true, // todo: aun esto no va pero mas adelante.
      },
    });

    return {
      products: products.map(
        ({ categoryId, category, ProductImage, ...product }) => ({
          ...product,
          images: ProductImage.map((img) => img.url),
          // type: category.name.toLowerCase() as Type,
        })
      ),
    };
  } catch (error) {
    console.error(error);
    throw new Error('no se pudo cargar los productos');
  }
};
