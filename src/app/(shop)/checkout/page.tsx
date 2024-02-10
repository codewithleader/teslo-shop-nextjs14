import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
  initialData.products[3],
  initialData.products[4],
  initialData.products[5],
  initialData.products[6],
];

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
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
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
                <p className="text-xl">Antonio Perez</p>
                <p>Main Street, South River Ave.</p>
                <p>Center 123</p>
                <p>Palos Rojos City</p>
                <p>Zip 123123</p>
                <p>555 2223344</p>
              </div>

              {/* Divider */}
              <div className="w-full h-0.5 rounded bg-gray-300 md:bg-gray-200 mb-10" />

              <h2 className="text-2xl mb-2">Resumen de orden</h2>
              <div className="grid grid-cols-2">
                <span>Nro. Productos</span>
                <span className="text-right">3 artículos</span>
                <span>Subtotal</span>
                <span className="text-right">$ 100</span>
                <span>Impuestos (15%)</span>
                <span className="text-right">$ 100</span>
                <span className="mt-5 text-2xl">Total</span>
                <span className="mt-5 text-2xl text-right">$ 100</span>
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

                <Link
                  className="flex btn-primary justify-center"
                  href={'/orders/123'}
                >
                  Colocar orden
                </Link>
              </div>
            </div>
          </div>
          {/* End Summary */}
        </div>
      </div>
    </div>
  );
}
