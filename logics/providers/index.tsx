'use client';

import { ReactNode } from 'react';

import ThemeProvider from './ThemeProvider';
import ReactQueryProvider from './ReactQueryProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
}
