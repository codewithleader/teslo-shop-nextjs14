// More: https://nextjs.org/docs/app/api-reference/file-conventions/error
'use client';
import { useEffect } from 'react';
import { ErrorComponent } from '@/components';

// error.tsx have error props
interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorComponent message={error.message} errorCodeNumber={'500'} />;
}
