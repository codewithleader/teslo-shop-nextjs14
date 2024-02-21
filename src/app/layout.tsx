import type { Metadata } from 'next';
//
import { inter } from '@/config/fonts';
import './globals.css';
import { Providers } from '@/components';

// Metadata Template: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template
export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop', // title.template can be used to add a prefix or a suffix to titles defined in child route segments.
    default: 'Home - Teslo | Shop', // a default is required when creating a template
  },
  description: 'NextJS v14',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
