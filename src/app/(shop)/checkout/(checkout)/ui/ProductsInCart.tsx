'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { redirect } from 'next/navigation';

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading && productsInCart.length === 0) redirect('/');
  }, [isLoading, productsInCart]);

  if (isLoading) {
    return <p>Loading...</p>;
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
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>

            <p className="font-bold">
              $
              {currencyFormat({
                currency: 'USD',
                locales: 'en-US',
                value: product.price * product.quantity,
              })}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
