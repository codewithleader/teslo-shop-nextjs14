import { notFound } from 'next/navigation';
//
import { initialData } from '@/seed/seed';
import { Category } from '@/interfaces';
import { ProductGrid, Title } from '@/components';

const seedProducts = initialData.products;

interface Props {
  params: {
    id: Category;
  };
}

const allowedCategories = ['men', 'women', 'kid'];

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  const products = seedProducts.filter((p) => p.gender === id);
  if (!allowedCategories.includes(id)) {
    notFound();
  }
  const labels: Record<Category, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos'
  }
  return (
    <>
      <Title
        title={`Tienda (${labels[id]})`}
        subtitle={`Artículos para ${labels[id]}`}
        className='mb-2'
      />
      <ProductGrid products={products} />
    </>
  );
}
