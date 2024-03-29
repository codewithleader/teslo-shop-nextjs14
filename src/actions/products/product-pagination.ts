'use server';
// import { Type } from '@/interfaces';
import prisma from '@/lib/prisma';
import type { Gender } from '@prisma/client';

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  const whereCondition = gender ? { gender } : {};

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
        category: true, // todo: aun esto no va pero mas adelante.
      },
      where: whereCondition,
    });
    // 2. Obtener total de páginas
    // todo: tarea.
    const totalCount = await prisma.product.count({
      where: whereCondition,
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map(
        ({ categoryId, category, ProductImage, ...product }) => ({
          ...product,
          images: ProductImage.map((img) => img.url),
          // type: category.name.toLowerCase() as Type,
        }),
      ),
    };
  } catch (error) {
    console.error(error);
    throw new Error('Los productos no se pudieron cargar.');
  }
};
