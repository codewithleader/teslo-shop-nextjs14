import { authMiddleware } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authMiddleware();
  if (!session?.user) {
    redirect('/auth/login?redirectTo=/checkout/address');
  }
  return <>{children}</>;
}


<!-- TODO: esto es para cuando el middleware.ts no funcione pero en esta version si funciona asi que no es necesario para la authenticacion -->