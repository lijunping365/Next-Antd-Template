import React from 'react';
import '@/styles/globals.css';
import { AppProps } from 'next/app';
import { AuthProvider } from '@/components/Provider/AuthProvider';
import { ThemeProvider } from '@/components/Provider/ThemeProvider';

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <ThemeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
