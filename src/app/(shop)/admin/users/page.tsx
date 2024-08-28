export const revalidate = 0;

import { redirect } from 'next/navigation';
//
import { Title } from '@/components';
import { getPaginatedOrders } from '@/actions';
import { UsersTable } from './ui/UsersTable';

export default async function AdminUsersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect('/auth/login?callbackUrl=/admin/users');
  }

  if (orders.length === 0) {
    redirect('/auth/login?callbackUrl=/admin/users');
  }

  return (
    // https://tailwindcomponents.com/component/hoverable-table
    <>
      <Title title="Administrador de usuarios" />

      <div className="mb-10">
        <UsersTable />
      </div>
    </>
  );
}
