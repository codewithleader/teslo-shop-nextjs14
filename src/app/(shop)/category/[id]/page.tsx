import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  }
}

const allowedCategories = ['men', 'women', 'kids'];

export default function CategoryPage({ params }: Props) {
  const { id } = params;
  if (!allowedCategories.includes(id)) {
    notFound();
  }
  return (
    <div>
      <h1>Category Page {id}</h1>
    </div>
  );
}