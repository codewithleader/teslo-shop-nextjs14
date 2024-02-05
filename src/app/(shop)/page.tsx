import { getPaginatedProductsWithImages } from '@/actions';
import { ProductGrid, Title } from '@/components';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products } = await getPaginatedProductsWithImages({ page });
  if (products.length === 0) {
    redirect('/');
  }
  return (
    <>
      <Title title={'Tienda'} subtitle='Todos los productos' className='mb-2' />
      <ProductGrid products={products} />
    </>
  );
}
