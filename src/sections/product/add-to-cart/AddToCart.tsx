'use client';

import { useState } from 'react';
//
import { QuantitySelector, SizeSelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import clsx from 'clsx';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  // Get State from Zustand Storage
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Local states of this component
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      size,
      image: product.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {posted && !size && (
        <span className={'mt-2 text-red-500 fade-in'}>
          Debe seleccionar una talla*
        </span>
      )}
      {/* Selector de tallas */}
      {product.inStock > 0 && (
        <SizeSelector
          selectedSize={size}
          availableSizes={product.sizes}
          onSizeChanged={setSize}
        />
      )}

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />

      {/* Button */}
      <button
        onClick={addToCart}
        className={clsx('btn-primary my-5', {
          'pointer-events-none btn-secondary': product.inStock === 0,
        })}
      >
        Agregar al carrito
      </button>
    </>
  );
};
