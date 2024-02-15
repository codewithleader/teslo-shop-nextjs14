import { authMiddleware } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authMiddleware();
  if (session?.user) {
    redirect('/');
  }
  return (
    <main className="flex justify-center">
      <div className="w-[450px] px-10">{children}</div>
    </main>
  );
}
