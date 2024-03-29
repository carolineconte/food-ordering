import "./globals.css";

import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppProvider } from '@/components/AppContext'
import CartButton from '@/components/layout/CartButton'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata = {
  title: "FIORELLA",
  description: "Full stack-project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white scroll-smooth h-screen">
      <body className={roboto.className}>
        <AppProvider>
          <Toaster />
            <Header />
          <main className="mx-auto flex flex-col w-11/12">
            {children}
          </main>
            <CartButton />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
