import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { AIAssistantProvider } from '@/context/AIAssistantContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dayflow HRMS',
  description: 'Human Resource Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AIAssistantProvider>
            {children}
          </AIAssistantProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

