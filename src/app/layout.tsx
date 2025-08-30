import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AppManagerProvider } from '@/providers/AppManagerProvider';
import './globals.css';

const siteUrl = 'https://komeniki.net';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'yoneyone Portfolio',
    template: `%s | yoneyone Portfolio`,
  },
  description: 'yoneyone (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。制作したプロジェクト、スキル、実績などを紹介しています。',
  keywords: ['yoneyone', 'ganondorofu', 'portfolio', 'ポートフォリオ', '学生', '開発者', 'React', 'TypeScript', 'Next.js'],
  authors: [{ name: 'yoneyone', url: siteUrl }],
  creator: 'yoneyone',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'yoneyone Portfolio',
    description: 'yoneyone (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。',
    siteName: 'yoneyone Portfolio',
    images: [
      {
        url: `${siteUrl}/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'yoneyone Portfolio OGP Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ganondorofu_sub',
    title: 'yoneyone Portfolio',
    description: 'yoneyone (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。',
    images: [`${siteUrl}/ogp.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
