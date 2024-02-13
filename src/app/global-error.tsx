'use client';
import { ErrorComponent } from '@/components';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
  return <ErrorComponent message={error.message} errorCodeNumber={'500'} />;
}
