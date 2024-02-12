'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { authenticate } from '@/actions';

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined);
  const [isEyeOpen, setIsEyeOpen] = useState(true);
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
      <div className="relative flex items-center mb-5">
        <input
          className="px-5 py-2 border bg-gray-200 rounded w-full pr-10"
          type={isEyeOpen ? 'text' : 'password'}
          name="password"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 px-3 flex items-center justify-center bg-transparent"
          onClick={() => setIsEyeOpen((prev) => !prev)}
          aria-label={isEyeOpen ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {isEyeOpen ? (
            <IoEyeOutline size={24} />
          ) : (
            <IoEyeOffOutline size={24} />
          )}
        </button>
      </div>

      <button type="submit" className="btn-primary">
        Ingresar
      </button>
    </form>
  );
};
