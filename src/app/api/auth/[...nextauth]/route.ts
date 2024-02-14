import { handlers } from '@/auth.config';

export const { GET, POST } = handlers;

// Esto es para que no salga el error GET http://localhost:3000/api/auth/session 404 (Not Found)
