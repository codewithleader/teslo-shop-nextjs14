'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
//
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat, sleep } from '@/utils';

export const PlaceOrder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const shippingAddress = useAddressStore((state) => state.shippingAddress);
  const {
    city,
    phone,
    country,
    address,
    address2,
    lastName,
    firstName,
    postalCode,
  } = shippingAddress;

  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  );
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    await sleep(2);
    const productToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log({ shippingAddress, productToOrder });
  };

  return (
    <div className="flex flex-col mt-5">
      <hr className="border-gray-300 border-2 md:hidden" />
      {/* Summary */}

      <div className="md:bg-white md:rounded-xl md:shadow-xl p-10 lg:ml-28">
        {/* Address */}
        <h2 className="font-bold text-2xl mb-2">Dirección de entrega</h2>
        <div className="mb-10">
          <p className="text-xl">
            {firstName} {lastName}
          </p>
          <p>{address}</p>
          <p>{address2}</p>
          <p>
            {city}, {country}
          </p>
          <p>{postalCode}</p>
          <p>{phone}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-0.5 rounded bg-gray-300 md:bg-gray-200 mb-10" />

        <h2 className="text-2xl mb-2">Resumen de orden</h2>
        <div className="grid grid-cols-2">
          <span>Nro. Productos</span>
          <span className="text-right">
            {itemsInCart} {itemsInCart < 2 ? 'artículo' : 'artículos'}
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
          <p className="mb-5">
            {/* Disclaimer */}
            <span className="text-xs">
              Al hacer clic en &quot;Colocar orden&quot;, aceptas nuestros{' '}
              <a href="#" className="underline">
                términos y condiciones
              </a>{' '}
              y{' '}
              <a href="#" className="underline">
                política de privacidad
              </a>
            </span>
          </p>
          <p className="text-red-500">Error de creación</p>
          <button
            // href={'/orders/123'}
            disabled={isPlacingOrder}
            onClick={onPlaceOrder}
            className={clsx('flex justify-center', {
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder,
            })}
          >
            Colocar orden
          </button>
        </div>
      </div>
    </div>
  );
};
