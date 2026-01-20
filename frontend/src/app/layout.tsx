import type { Metadata } from 'next';
import { Tajawal, Cairo } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/contexts/ThemeContext';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'سونو | بوابة الصحافة الطبية والأخبار - الصحة حضارة',
  description:
    'سونو هي منصتكم الأولى للأخبار الطبية الموثوقة، الأبحاث المتطورة، والرؤى السريرية. نربط الفجوة بين العلوم الطبية والفهم العام بشعارنا: الصحة حضارة... مصر أصلها.',
  keywords:
    'أخبار طبية, سونو, صحافة صحية, أبحاث طبية, دراسات سريرية, أخبار الصحة مصر, الصحافة الطبية العربية, الصحة حضارة',
  authors: [{ name: 'فريق تحرير سونو' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'سونو | بوابة الصحافة الطبية والأخبار',
    description:
      'أخبار طبية موثوقة، أبحاث، وتحليلات من الخبراء - الصحة حضارة... مصر أصلها',
    url: 'https://sono.news',
    siteName: 'سونو NEWS',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سونو | بوابة الصحافة الطبية والأخبار',
    description: 'أخبار طبية موثوقة، أبحاث، وتحليلات من الخبراء',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} ${cairo.variable} antialiased bg-background text-foreground font-arabic`}>
        <ThemeProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0B1829',
                color: '#fff',
                boxShadow: '0 8px 24px -4px rgba(11, 24, 41, 0.2)',
                borderRadius: '12px',
                padding: '16px 20px',
                fontSize: '15px',
                border: '1px solid rgba(191, 155, 80, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#BF9B50',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
