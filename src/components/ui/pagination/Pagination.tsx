import Link from 'next/link';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  return (
    <>
      {/* component */}
      <div className='flex justify-center mt-10 mb-32'>
        <nav>
          <ul className='flex items-center list-style-none'>
            <li className='page-item'>
              <Link
                // Classes para deshabilitado: // className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none'
                className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                href='#'
              >
                <IoChevronBackOutline size={20} />
              </Link>
            </li>
            <li className='page-item'>
              <Link
                className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                href='#'
              >
                1
              </Link>
            </li>
            <li className='page-item active'>
              <Link
                className='page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
                href='#'
              >
                2 <span className='visually-hidden'></span>
              </Link>
            </li>
            <li className='page-item'>
              <Link
                className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                href='#'
              >
                3
              </Link>
            </li>
            <li className='page-item'>
              <Link
                className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
                href='#'
              >
                <IoChevronForwardOutline size={20} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
