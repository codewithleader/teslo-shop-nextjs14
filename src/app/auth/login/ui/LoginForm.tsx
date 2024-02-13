'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoInformationOutline,
} from 'react-icons/io5';
import { authenticate } from '@/actions';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  useEffect(() => {
    if (errorMessage === 'Success') {
      router.replace('/');
    }
  }, [errorMessage, router]);

  console.log({ errorMessage });
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

      <div
        className="flex mb-2 h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">Credenciales no válidas</p>
          </>
        )}
      </div>

      <LoginButton />
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      disabled={pending}
    >
      Ingresar
    </button>
  );
}
