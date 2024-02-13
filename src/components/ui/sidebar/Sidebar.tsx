'use client';

// import Link from 'next/link';
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from 'react-icons/io5';
import clsx from 'clsx';
//
import { SidebarLink, SidebarLinkProps } from './SidebarLink';
import { useUIStore } from '@/store';
import { logout } from '@/actions';

const userMenuItems: SidebarLinkProps[] = [
  {
    title: 'Perfil',
    path: '/profile',
    icon: <IoPersonOutline size={30} />,
  },
  {
    title: 'Ordenes',
    path: '/orders',
    icon: <IoTicketOutline size={30} />,
  },
  {
    title: 'Ingresar',
    path: '/auth/login',
    icon: <IoLogInOutline size={30} />,
  },
];

const adminMenuItems: SidebarLinkProps[] = [
  {
    title: 'Productos',
    path: '/',
    icon: <IoShirtOutline size={30} />,
  },
  {
    title: 'Ordenes',
    path: '/',
    icon: <IoTicketOutline size={30} />,
  },
  {
    title: 'Usuarios',
    path: '/',
    icon: <IoPeopleOutline size={30} />,
  },
];

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);

  return (
    <div>
      {isSideMenuOpen && (
        /* Gray Background */
        <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
      )}

      {isSideMenuOpen && (
        /* Blur */
        <div
          onClick={closeSideMenu}
          className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
        />
      )}

      {/* SideMenu */}
      <nav
        // clsx: Es una dependencia que ayuda a aplicar clases de TailwindCSS condicionalmente
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          },
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Input Search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 transition-colors duration-300"
          />
        </div>

        {/* Menu */}

        {/* User Menu */}
        {userMenuItems.map((item) => (
          <SidebarLink key={item.title} {...item} />
        ))}

        {/* Sign Out Button */}
        <button
          onClick={() => logout()}
          className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={30} />
          <span className="ml-3 text-xl">Salir</span>
        </button>

        {/* Line separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        {/* Admin Menu */}
        {adminMenuItems.map((item) => (
          <SidebarLink key={item.title} {...item} />
        ))}
        {/* <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoPersonOutline size={30} />
          <span className='ml-3 text-xl'>Perfil</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoTicketOutline size={30} />
          <span className='ml-3 text-xl'>Ordenes</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoLogInOutline size={30} />
          <span className='ml-3 text-xl'>Ingresar</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoLogOutOutline size={30} />
          <span className='ml-3 text-xl'>Salir</span>
        </Link> */}

        {/* Line separator */}
        {/* <div className='w-full h-px bg-gray-200 my-10' /> */}

        {/* Admin Menu */}

        {/* <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoShirtOutline size={30} />
          <span className='ml-3 text-xl'>Productos</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoTicketOutline size={30} />
          <span className='ml-3 text-xl'>Ordenes</span>
        </Link>

        <Link
          href={'/'}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoPersonOutline size={30} />
          <span className='ml-3 text-xl'>Usuarios</span>
        </Link> */}
      </nav>
    </div>
  );
};
