'use client';

import { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  onQuantityChanged: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  // const [count, setCount] = useState(quantity);
  // const onQuantityChange = (value: number) => {
  //   if (count + value < 1) return;
  //   if (count + value > 5) return;

  //   setCount(count + value);
  // };
  return (
    <div className='flex'>
      <button onClick={() => onQuantityChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className='flex items-center justify-center w-20 mx-3 px-5 bg-gray-100 rounded'>
        {quantity}
      </span>
      <button onClick={() => onQuantityChanged(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
