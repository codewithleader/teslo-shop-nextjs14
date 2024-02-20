import { authMiddleware } from '@/auth.config';
import { Footer, Sidebar, TopMenu } from '@/components';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authMiddleware();
  return (
    <main
      //
      className="min-h-screen"
    >
      <TopMenu userName={session?.user.name ?? 'Inicia Sesión'} />
      <Sidebar />

      <div>{children}</div>

      <Footer />
    </main>
  );
}
