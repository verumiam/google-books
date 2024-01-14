import '@/styles/globals.css';
import type { Metadata } from 'next';
import { StoreProvider } from '@/store/StoreProvider';
import Header from '@/components/shared/header';

export const metadata: Metadata = {
  title: 'Читай город',
  description: 'Читай город - магазин книг, большой ассортимент книг, жанры на любой вкус',
  keywords: 'books, art, biography, medical, computers, history, poetry',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
