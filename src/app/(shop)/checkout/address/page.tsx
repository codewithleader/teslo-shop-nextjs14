import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries, getUserAddress } from '@/actions';
import { authMiddleware } from '@/auth.config';

export default async function AddressPage() {
  const countries = await getCountries();
  const session = await authMiddleware();
  if (!session?.user) {
    return <h3 className="text-5xl">500 - No hay sesión de usuario</h3>;
  }
  const userDBAddress = (await getUserAddress(session.user.id)) ?? undefined;
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 md:px-0">
      <div className="w-full lg:w-[1000px] flex flex-col justify-center text-left">
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userDBAddress={userDBAddress} />
      </div>
    </div>
  );
}
