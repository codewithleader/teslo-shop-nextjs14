import NextAuth, { type NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcryptjs from 'bcryptjs';
import { z } from 'zod';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    jwt({ token, user }) {
      // console.log('jwt Elis:', { token, user });
      if (user) {
        token.data = user;
      }
      return token;
    },

    session({ session, token }) {
      // console.log('session Elis:', { session, token });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.user = token.data as any;
      return session;
    },
  },
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;
        // Buscar el correo
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (!user) return null;
        // Comparar las contraseñas
        if (!bcryptjs.compareSync(password, user.password)) return null;
        // Regresar el usuario
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword; // Quedaría "session: { user: userWithoutPassword, expires: '2024-03-13T15:58:47.816Z' }"
      },
    }),
  ],
};
// } satisfies NextAuthConfig;

export const {
  signIn,
  signOut,
  auth: authMiddleware,
  handlers,
} = NextAuth(authConfig);
