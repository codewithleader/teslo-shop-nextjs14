'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <p>Cargango...</p>;
  }
  return (
    <>
      <div className="md:bg-white md:rounded-xl md:shadow-xl p-10 lg:ml-28">
        <h2 className="text-2xl mb-2">Resumen de orden</h2>
        <div className="grid grid-cols-2">
          <span>Nro. Productos</span>
          <span className="text-right">
            {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
          </span>
          <span>Subtotal</span>
          <span className="text-right">
            {currencyFormat({
              currency: 'USD',
              locales: 'en-US',
              value: subTotal,
            })}
          </span>
          <span>Impuestos (15%)</span>
          <span className="text-right">
            {currencyFormat({
              currency: 'USD',
              locales: 'en-US',
              value: tax,
            })}
          </span>
          <span className="mt-5 text-2xl">Total</span>
          <span className="mt-5 text-2xl text-right">
            {currencyFormat({
              currency: 'USD',
              locales: 'en-US',
              value: total,
            })}
          </span>
        </div>
        <div className="mt-5 mb-2 w-full">
          <Link
            className="flex btn-primary justify-center"
            href={'/checkout/address'}
          >
            Checkout
          </Link>
        </div>
      </div>
    </>
  );
};
