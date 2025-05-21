
import type { Metadata } from 'next';
import { Inter, Roboto, Lora, Source_Code_Pro, Playfair_Display, Dancing_Script } from 'next/font/google';
import { Geist_Mono } from 'next/font/google'; // Retaining Geist Mono for other uses if any
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';

// Setup Inter font (already exists, keeping)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', 
  display: 'swap',
});

const geistMono = Geist_Mono({ // Retaining Geist Mono
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// New fonts for the animated AboutMe section
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
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
    <html 
      lang="en" 
      className={`${inter.variable} ${geistMono.variable} ${roboto.variable} ${lora.variable} ${sourceCodePro.variable} ${playfairDisplay.variable} ${dancingScript.variable} scroll-smooth`}
    >
      <body className="antialiased flex flex-col min-h-screen">
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
