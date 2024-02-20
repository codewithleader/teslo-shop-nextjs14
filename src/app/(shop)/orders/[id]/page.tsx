import Image from 'next/image';
import clsx from 'clsx';
//
import { Title } from '@/components';
import { IoCartOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/');
  }

  if (!order) {
    redirect('/');
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[552px] md:w-[1000px] md:px-10">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <hr className="md:hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col justify-center mt-5">
            <div
              className={clsx(
                //
                'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                {
                  'bg-red-500': !order.isPaid,
                  'bg-green-700': order.isPaid,
                },
              )}
            >
              <IoCartOutline size={30} />
              <span className="mx-2">
                {order.isPaid ? 'Pagada' : 'Pendiente de pago'}
              </span>
            </div>

            {/* Cart Items */}
            {order.OrderItem.map((item, index) => (
              <div key={item.product.slug + '_' + index} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.slug}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.slug}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col mt-5">
            <hr className="border-gray-300 border-2 md:hidden" />
            {/* Summary */}

            <div className="md:bg-white md:rounded-xl md:shadow-xl p-10 lg:ml-28">
              {/* Address */}
              <h2 className="font-bold text-2xl mb-2">Dirección de entrega</h2>
              <div className="mb-10">
                <p className="text-xl">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </p>
                <p>{order.OrderAddress?.address}</p>
                <p>{order.OrderAddress?.address2 ?? ''}</p>
                <p>{order.OrderAddress?.city}</p>
                <p>{order.OrderAddress?.postalCode}</p>
                <p>{order.OrderAddress?.phone}</p>
              </div>
              {/* Divider */}
              <div className="w-full h-0.5 rounded bg-gray-300 md:bg-gray-200 mb-10" />

              <h2 className="text-2xl mb-2">Resumen de orden</h2>
              <div className="grid grid-cols-2">
                <span>Nro. Productos</span>
                <span className="text-right">
                  {order.itemsInOrder}{' '}
                  {order.itemsInOrder < 2 ? 'artículo' : 'artículos'}
                </span>
                <span>Subtotal</span>
                <span className="text-right">
                  {currencyFormat({
                    value: order.subTotal,
                    locales: 'en-US',
                    currency: 'USD',
                  })}
                </span>
                <span>Impuestos (15%)</span>
                <span className="text-right">
                  {currencyFormat({
                    value: order.tax,
                    locales: 'en-US',
                    currency: 'USD',
                  })}
                </span>
                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">
                  {currencyFormat({
                    value: order.total,
                    locales: 'en-US',
                    currency: 'USD',
                  })}
                </span>
              </div>

              <div className="mt-5 mb-2 w-full">
                <div
                  className={clsx(
                    //
                    'flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',
                    {
                      'bg-red-500': !order.isPaid,
                      'bg-green-700': order.isPaid,
                    },
                  )}
                >
                  <IoCartOutline size={30} />
                  <span className="mx-2">
                    {order.isPaid ? 'Pagada' : 'Pendiente de pago'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* End Summary */}
        </div>
      </div>
    </div>
  );
}
