
import type { Metadata } from 'next';
import { Inter, Roboto, Lora, Source_Code_Pro, Playfair_Display, Dancing_Script, Roboto_Mono, JetBrains_Mono, Fira_Code, Space_Mono, IBM_Plex_Mono, Geist_Mono } from 'next/font/google';
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

// Additional monospace fonts for project cards
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-space-mono',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gabriel Mancillas - Data Science Portfolio',
  description: 'Data Science Graduate Student & Website Developer. Explore my projects, experience, and professional journey in data science and web development.',
  keywords: 'Gabriel Mancillas, Data Science, Web Development, Portfolio, Graduate Student, Data Engineer, Website Developer',
  authors: [{ name: 'Gabriel Mancillas' }],
  creator: 'Gabriel Mancillas',
  publisher: 'Gabriel Mancillas',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Gabriel Mancillas - Data Science Portfolio',
    description: 'Data Science Graduate Student & Website Developer. Explore my projects, experience, and professional journey.',
    url: 'https://gabriel-mancillas-portfolio-a0huuqr98-gabeleo24s-projects.vercel.app',
    siteName: 'Gabriel Mancillas Portfolio',
    images: [
      {
        url: '/AdobeStock_432194964.jpeg',
        width: 1200,
        height: 630,
        alt: 'Gabriel Mancillas Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Mancillas - Data Science Portfolio',
    description: 'Data Science Graduate Student & Website Developer',
    images: ['/AdobeStock_432194964.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${roboto.variable} ${lora.variable} ${sourceCodePro.variable} ${playfairDisplay.variable} ${dancingScript.variable} ${robotoMono.variable} ${jetbrainsMono.variable} ${firaCode.variable} ${spaceMono.variable} ${ibmPlexMono.variable} scroll-smooth`}
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
