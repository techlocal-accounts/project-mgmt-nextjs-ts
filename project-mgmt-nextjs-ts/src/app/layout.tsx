import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/hooks/useTheme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Management - Fast, Accessible, Offline-ready',
  description: 'Next.js + TypeScript frontend scaffold with Kanban, Timeline/Gantt, Search, Analytics, and PWA support.',
  keywords: ['project management', 'kanban', 'gantt', 'nextjs', 'typescript', 'pwa'],
  authors: [{ name: 'Project Management Team' }],
  creator: 'Project Management Team',
  publisher: 'Project Management Team',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://project-management-demo.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Project Management - Fast, Accessible, Offline-ready',
    description: 'Next.js + TypeScript frontend scaffold with Kanban, Timeline/Gantt, Search, Analytics, and PWA support.',
    url: 'https://project-management-demo.vercel.app',
    siteName: 'Project Management',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Project Management Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Management - Fast, Accessible, Offline-ready',
    description: 'Next.js + TypeScript frontend scaffold with Kanban, Timeline/Gantt, Search, Analytics, and PWA support.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0b5cff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Project Management" />
        <meta name="msapplication-TileColor" content="#0b5cff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}