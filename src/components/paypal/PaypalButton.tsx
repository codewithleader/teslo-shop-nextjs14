'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import type {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import { paypalCheckPayment, setTransactionId } from '@/actions';

interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  // const roundedAmound = Math.round(amount * 100) / 100; // transforma a 2 decimales: 100.25 // Nota: No hay que hacer el redondeo porque ya se hizo en el metodo "getSummaryInformation" en cart.store.ts
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
            // value: `${roundedAmound}`,
            value: `${amount}`,
            // currency_code: 'USD', // no es necesario porque ya está definido en el provider
          },
        },
      ],
    });

    // Guardar el transactionId en la orden en la base de datos
    const { ok } = await setTransactionId(orderId, transactionId);
    if (!ok) {
      throw new Error('No se pudo actualizar la orden');
    }

    return transactionId;
  };

  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions,
  ): Promise<void> => {
    const details = await actions.order?.capture();
    if (!details) return;
    await paypalCheckPayment(details.id); // details.is es el transactionId
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove} // Se dispara cuando el usuario paga en Paypal y regresa la info de la transacción si fue exitosa o no
    />
  );
};
