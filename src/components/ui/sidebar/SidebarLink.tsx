import { useUIStore } from '@/store';
import Link from 'next/link';

export interface SidebarLinkProps {
  title: string;
  path: string;
  icon: JSX.Element;
}

export const SidebarLink = ({ title, path, icon }: SidebarLinkProps) => {
  const closeSideMenu = useUIStore((state) => state.closeSideMenu);
  return (
    <Link
      href={path}
      onClick={closeSideMenu}
      className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
    >
      {icon}
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  );
};
