'use client';

import clsx from 'clsx';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  stock: number;
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({
  stock,
  quantity,
  onQuantityChanged,
}: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    if (quantity + value > stock) return;
    if (quantity + value > 5) return;

    onQuantityChanged(quantity + value);
  };
  return (
    <div className="flex">
      <button
        className={clsx('', {
          'pointer-events-none': quantity <= 1,
        })}
        onClick={() => onValueChanged(-1)}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="flex items-center justify-center w-20 mx-3 px-5 bg-gray-100 rounded">
        {stock === 0 ? 0 : quantity}
      </span>
      <button
        className={clsx('', {
          'pointer-events-none':
            stock === 0 || quantity === 5 || quantity === stock,
        })}
        onClick={() => onValueChanged(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
