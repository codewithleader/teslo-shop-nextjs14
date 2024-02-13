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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        console.log({ userWithoutPassword });
        return userWithoutPassword; // Quedaría "session: { user: userWithoutPassword, expires: '2024-03-13T15:58:47.816Z' }"
      },
    }),
  ],
};
// } satisfies NextAuthConfig;

export const { signIn, signOut, auth: authMiddleware } = NextAuth(authConfig);
