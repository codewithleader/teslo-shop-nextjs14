export const revalidate = 0;

import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';
//
import { Title } from '@/components';
import { getOrdersByUser } from '@/actions';
import { redirect } from 'next/navigation';
import clsx from 'clsx';

export default async function OrdersPage() {
  const { ok, orders } = await getOrdersByUser();

  if (!ok) {
    redirect('/auth/login?callbackUrl=/orders');
  }

  if (!orders) {
    redirect('/auth/login?callbackUrl=/orders');
  }

  return (
    // https://tailwindcomponents.com/component/hoverable-table
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={clsx({
                      'text-green-800': order.isPaid,
                      'text-red-800': !order.isPaid,
                    })}
                  />
                  <span
                    className={clsx('mx-2', {
                      'text-green-800': order.isPaid,
                      'text-red-800': !order.isPaid,
                    })}
                  >
                    {order.isPaid ? 'Pagada' : 'No pagada'}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}

            {/* <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                1
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                Mark
              </td>
              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <IoCardOutline className="text-red-800" />
                <span className="mx-2 text-red-800">No Pagada</span>
              </td>
              <td className="text-sm text-gray-900 font-light px-6 ">
                <Link href="/orders/123" className="hover:underline">
                  Ver orden
                </Link>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </>
  );
}
