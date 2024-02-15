'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import clsx from 'clsx';
//
import { login, registerUser } from '@/actions';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    const { name, email, password } = data;
    const res = await registerUser(name, email, password);
    if (!res.ok) {
      setErrorMessage(res.message);
      return;
    }
    await login(email.toLowerCase(), password);

    window.location.replace('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
      noValidate
    >
      <label htmlFor="name">Nombre completo</label>
      <input
        autoFocus
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name,
        })}
        type="text"
        id="name"
        {...register('name', { required: true })}
      />

      {/* {errors.name?.type === 'required' && (
        <span className="text-red-500">El campo Nombre es obligatorio</span>
      )} */}

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email,
        })}
        type="email"
        id="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="password">Contraseña</label>
      <div className="relative flex items-center mb-5">
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded w-full pr-10', {
            'border-red-500': errors.password,
          })}
          type={isEyeOpen ? 'text' : 'password'}
          id="password"
          {...register('password', { required: true, minLength: 6 })}
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
      <span className="text-red-500">{errorMessage}</span>
      <button className="btn-primary">Crear cuenta</button>
    </form>
  );
};
