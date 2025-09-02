import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/ThemeProvider';
import './globals.css';
import { AppManagerProvider } from '@/providers/AppManagerProvider';

const siteUrl = 'https://komeniki.net';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'komeniki',
    template: `%s | komeniki`,
  },
  description: 'komeniki (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。制作したプロジェクト、スキル、実績などを紹介しています。',
  keywords: ['komeniki', 'ganondorofu', 'portfolio', 'ポートフォリオ', '学生', '開発者', 'React', 'TypeScript', 'Next.js'],
  authors: [{ name: 'komeniki', url: siteUrl }],
  creator: 'komeniki',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'komeniki',
    description: 'komeniki (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。',
    siteName: 'komeniki',
    images: [
      {
        url: `${siteUrl}/ogp.png`,
        width: 1200,
        height: 630,
        alt: 'komeniki OGP Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ganondorofu_sub',
    title: 'komeniki',
    description: 'komeniki (ganondorofu) - 学生 / ホビイスト開発者としてのポートフォリオサイト。',
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
          <AppManagerProvider>
            {children}
            <Toaster />
          </AppManagerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
