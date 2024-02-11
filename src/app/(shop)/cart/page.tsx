import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';
// import { redirect } from 'next/navigation';

export default function CartPage() {
  // redirect('/empty');
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[552px] md:w-[1000px] md:px-10">
        <Title title="Carrito" />

        <hr className="md:hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col justify-center mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href={'/'} className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Cart Items */}
            <ProductsInCart />
          </div>

          <div className="flex flex-col mt-5">
            <hr className="border-gray-300 border-2 md:hidden" />
            {/* Summary */}
            <OrderSummary />
          </div>
          {/* End Summary */}
        </div>
      </div>
    </div>
  );
}
