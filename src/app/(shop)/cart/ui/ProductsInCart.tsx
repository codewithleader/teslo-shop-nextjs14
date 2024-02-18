'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  );
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productsInCart = useCartStore((state) => state.cart);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && productsInCart.length === 0) redirect('/empty');
  }, [isLoading, productsInCart]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.id}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            className="mr-5 rounded"
          />
          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>

            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
