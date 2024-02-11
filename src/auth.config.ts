import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        console.log({ email, password });
        // Buscar el correo
        // Comparar las contraseñas
        // Regresar el usuario
        return null;
      },
    }),
  ],
};
// } satisfies NextAuthConfig;

export const { signIn, signOut, auth: authMiddleware } = NextAuth(authConfig);
