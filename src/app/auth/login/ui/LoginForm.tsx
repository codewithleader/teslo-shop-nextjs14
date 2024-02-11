'use client';

import { authenticate } from '@/actions';
import { useFormState } from 'react-dom';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  console.log('LoginForm.tsx:', { state });
  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email" // 👀 obligatorio el name para que no de error en @/actions/auth/login.ts
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <button type="submit" className="btn-primary">
        Ingresar
      </button>
    </form>
  );
};
