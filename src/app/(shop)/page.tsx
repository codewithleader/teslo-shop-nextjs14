import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } =
    await getPaginatedProductsWithImages({ page, take: 7 });
  console.log({ currentPage, totalPages });
  if (products.length === 0) {
    redirect('/');
  }
  return (
    <>
      <Title title={'Tienda'} subtitle='Todos los productos' className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
