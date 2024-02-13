import { authMiddleware } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

// prc: atajo para pagina
export default async function ProfilePage() {
  const session = await authMiddleware();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/profile'); // no hay que poner return porque la función redirect devuelve "never"
    redirect('/');
  }
  return (
    <div>
      <Title title={'Perfil'} />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
