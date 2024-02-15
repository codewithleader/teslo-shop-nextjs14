'use server';

import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  // const callbackUrl = formData.get('callbackUrl')?.toString() || '/';
  try {
    // console.log(Object.fromEntries(formData));
    // const result =
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    // // Si signIn es exitoso y hay un callbackUrl, redirecciona manualmente
    // if (result.ok && callbackUrl) {
    //   return { ok: true, redirectUrl: callbackUrl }; // Devuelve el URL para redireccionar
    // }

    // return { ok: true };
    return 'Success';
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    console.error(error);
    throw error;
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false });
    return { ok: true };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};
