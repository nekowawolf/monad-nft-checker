import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Monad NFT Checker',
  description: 'Check your eligibility for Monad NFT projects',
  icons: {
    icon: 
      { url: '/favicon.ico' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}