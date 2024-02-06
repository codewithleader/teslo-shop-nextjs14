import { notFound, redirect } from 'next/navigation';
//
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { Gender } from '@prisma/client';

interface Props {
  searchParams: {
    page?: string;
  };
  params: {
    gender: string;
  };
}

// const allowedCategories = ['men', 'women', 'kid']; // Se dejará pasar gender inválido para probar funcionamiento de pagina de error.ts

export default async function GenderPage({ params, searchParams }: Props) {
  const { gender } = params;
  // if (!allowedCategories.includes(gender)) {
  //   notFound();
  // }
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({
      page,
      take: 7,
      gender: gender as Gender,
    });
  // console.log({ currentPage, totalPages });
  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }
  const labels: Record<string, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  };
  return (
    <>
      <Title
        title={`Tienda (${labels[gender]})`}
        subtitle={`Artículos para ${labels[gender]}`}
        className='mb-2'
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
