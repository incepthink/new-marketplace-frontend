import './globals.css';
import type { Metadata } from 'next';
import { Orbitron, Kanit, Rubik, Questrial } from 'next/font/google';
import ReactQueryProvider from '../utils/providers/ReactQueryProvider';
import { AuthProvider } from '@/utils/providers/AuthProvider';
import { AlertProvider } from '@/utils/providers/AlertProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Hashcase Marketplace',
  description: 'A complete NFT marketplace on mantle',
};

const questrial = Questrial({
  subsets: ['latin'],
  weight: '400',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={questrial.className}>
      <body>
        <AuthProvider>
          <AlertProvider>
            <ReactQueryProvider>
              <Navbar />
              {children}
              <Footer />
            </ReactQueryProvider>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
