import { titleFont } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  message?: string;
  errorCodeNumber?: string;
}

export const ErrorComponent = ({ message, errorCodeNumber }: Props) => {
  return (
    <div className='flex flex-col-reverse md:flex-row height-custom w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        {/* Note: 'antialiased': Suavisa la fuente */}
        <h2 className={`${titleFont.className} antialiased text-9xl`}>
          {errorCodeNumber ? errorCodeNumber : '404'}
        </h2>
        <p className='font-semibold text-xl'>
          {message ? message : 'Ooops! Página no encontrada'}
        </p>
        <p className='font-light'>
          <span>Puedes regresar al </span>
          <Link
            href={'/'}
            className='font-normal hover:underline transition-all'
          >
            Inicio
          </Link>
        </p>
      </div>

      {/* Image */}
      <div className='px-5 mx-5 mt-12 md:mt-0'>
        <Image
          src={'/imgs/starman_750x750.png'}
          alt='Starman'
          className='p-10 md:p-0'
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};
