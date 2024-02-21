'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmound = Math.round(amount * 100) / 100; // transforma a 2 decimales: 100.25
  if (isPending) {
    return (
      <div className="h-36 animate-pulse mb-14">
        <div className="h-14 bg-gray-300 rounded-md" />
        <div className="h-14 bg-gray-300 rounded-md mt-3" />
        <div className="flex flex-col items-center">
          <div className="flex justify-center h-3 w-1/2 bg-gray-300 rounded-md mt-3" />
        </div>
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          // invoice_id: 'order_id',
          amount: {
            value: `${roundedAmound}`,
            // currency_code: 'USD', // no es necesario porque ya está definido en el provider
          },
        },
      ],
    });
    console.log(
      '🚀 - file: PaypalButton.tsx:35 - PaypalButton - transactionId:',
      transactionId,
    );

    return transactionId;
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      //  onApprove={}
    />
  );
};
