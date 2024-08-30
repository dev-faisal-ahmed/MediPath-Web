import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import { Poppins } from 'next/font/google';
import { ReduxProvider } from './_redux/ReduxProvider';
import { cn } from '@/lib/utils';
import './globals.css';

const font = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'MediPath',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en'>
      <link
        rel='shortcut icon'
        href='/images/medipath.jpg'
        type='image/x-icon'
      />

      <body className={cn(font.className, 'bg-primary-50 text-sm')}>
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster richColors duration={6000} />
      </body>
    </html>
  );
}
