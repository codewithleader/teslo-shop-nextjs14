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
