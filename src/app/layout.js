import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const roboto = Roboto({ subsets: ["latin"], weight:['400','500','700'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={roboto.className}>
      <main className="max-w-7xl mx-auto p-6 flex flex-col h-screen">
      <Header/>
      {children}
      <Footer/>
      </main>
      </body>
  </html>
  );
}