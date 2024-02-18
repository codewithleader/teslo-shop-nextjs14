import { Title } from '@/components';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { PlaceOrder } from './ui/PlaceOrder';

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[552px] md:w-[1000px] md:px-10">
        <Title title="Verificar orden" />

        <hr className="md:hidden" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col justify-center mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={'/cart'} className="underline mb-5">
              Editar carrito
            </Link>

            {/* Cart Items */}
            <ProductsInCart />
          </div>

          <PlaceOrder />
          {/* End Summary */}
        </div>
      </div>
    </div>
  );
}
