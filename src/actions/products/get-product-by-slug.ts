'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findUnique({
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
      where: { slug },
    });
    if (!product) return null;
    return {
      ...product,
      images: product.ProductImage.map((img) => img.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener producto por SLUG');
  }
};
