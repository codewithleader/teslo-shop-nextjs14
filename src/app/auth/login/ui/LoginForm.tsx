'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import {
  IoEyeOffOutline,
  IoEyeOutline,
  IoInformationOutline,
} from 'react-icons/io5';
//
import { authenticate } from '@/actions';

export const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    if (errorMessage === 'Success') window.location.replace(callbackUrl);
  }, [errorMessage, callbackUrl]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        id="email"
        name="email" // 👀 obligatorio el name para que no de error en @/actions/auth/login.ts
      />

      <label htmlFor="password">Contraseña</label>
      <div className="relative flex items-center mb-5">
        <input
          className="px-5 py-2 border bg-gray-200 rounded w-full pr-10"
          type={isEyeOpen ? 'text' : 'password'}
          id="password"
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
        {errorMessage && errorMessage !== 'Success' && (
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
  const [disabled, setDisabled] = useState<boolean>(false);
  const { pending } = useFormStatus();
  // Pending comienza en false, cambia a true y rapidamente vuelve a false asi que el boton se volvería a activar antes de redireccionar, con el state disabled, setDisabled en el momento que pending cambie a true se setea disabled a true y jamás se vuelve a activar el botón. Para eso es el useEffect
  useEffect(() => {
    if (pending) setDisabled(true);
  }, [pending]);

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !disabled,
        'btn-disabled': disabled,
      })}
      disabled={disabled}
    >
      Ingresar
    </button>
  );
}
