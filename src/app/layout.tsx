
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Import Inter
import { Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

// Setup Inter font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // CSS variable for Inter
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LinkPro - Professional Portfolio',
  description: 'Showcase your professional experience, projects, and skills with LinkPro.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased flex flex-col min-h-screen"> {/* Inter is applied via globals.css now */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
