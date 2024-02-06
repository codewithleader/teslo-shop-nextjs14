'use client';

import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { generatePaginationNumbers } from '@/utils';

interface Props {
  totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pageString = searchParams.get('page') ?? '1';
  const currentPage = isNaN(+pageString) ? 1 : +pageString;
  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathname);
  }
  const allPages = generatePaginationNumbers(currentPage, totalPages);
  // console.log({ currentPage, totalPages, allPages });

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams); // URLSearchParams: No hay que importar, ya viene en Javascript. Sirve para construir los parámetros de la URL. Algo asi como localStorage.set() y localStorage.get(), más o menos
    if (pageNumber === '...') {
      return `${pathname}?${params.toString()}`; // Muestra la misma página actual pero mueve la vista hasta arriba.
    }
    if (+pageNumber <= 0) {
      return `${pathname}`; // Muestra la página sin searchParams (ejemplo: '/men')
    }
    if (+pageNumber > totalPages) {
      return `${pathname}?${params.toString()}`; // Muestra la misma página actual (la última) pero mueve la vista hasta arriba.
    }
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className='flex justify-center mt-10 mb-32'>
        <nav>
          <ul className='flex items-center list-style-none'>
            <li className='page-item'>
              <Link
                // Classes para deshabilitado: // className='page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none'
                className={clsx(
                  'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none',
                  {
                    'text-gray-800 hover:text-gray-800 hover:bg-gray-200':
                      currentPage >= 2,
                    'text-gray-400 pointer-events-none': currentPage < 2,
                  }
                )}
                href={createPageUrl(currentPage - 1)}
              >
                <IoChevronBackOutline size={20} />
              </Link>
            </li>

            {allPages.map((page, index) => (
              <li
                key={page + '-' + index}
                className={clsx('page-item', {
                  active: currentPage === page,
                })}
              >
                <Link
                  className={clsx(
                    'page-link relative block py-1.5 px-4 rounded border-0 outline-none transition-all duration-300',
                    {
                      'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none':
                        currentPage !== page,
                      'bg-blue-600 text-white hover:text-white hover:bg-blue-700 shadow-md focus:shadow-md':
                        currentPage === page,
                    }
                  )}
                  href={createPageUrl(page)}
                >
                  {page}
                </Link>
              </li>
            ))}

            {/* <li className='page-item active'>
              <Link
                className='page-link relative block py-1.5 px-4 rounded border-0 bg-blue-600 outline-none transition-all duration-300 text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md'
                href='#'
              >
                2 <span className='visually-hidden'></span>
              </Link>
            </li> */}
            <li className='page-item'>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 focus:shadow-none',
                  {
                    'text-gray-800 hover:text-gray-800 hover:bg-gray-200':
                      currentPage < totalPages,
                    'text-gray-400 pointer-events-none':
                      currentPage === totalPages,
                  }
                )}
                href={createPageUrl(currentPage + 1)}
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
