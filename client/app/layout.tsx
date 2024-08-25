import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import { cn } from '@/lib/utils';
import { ReduxProvider } from './_redux/ReduxProvider';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'MediPath',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <body className={cn(font.className, 'bg-primary-50 text-sm')}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
