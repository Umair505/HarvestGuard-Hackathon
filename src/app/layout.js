import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Hind_Siliguri, Tiro_Bangla } from "next/font/google";
import Footer from "@/components/Footer";
import NextAuthProvider from "./Providers/NextAuthProvider";
import { Toaster } from "sonner";
import ScrollToTopAdvanced from "@/components/ScrollToTopAdvanced";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "HarvestGuard",
  description: "Monitor and protect your crops with real-time data analytics.",
};
// ফন্ট কনফিগারেশন
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind",
});

const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: ["400"],
  variable: "--font-tiro",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.variable} ${tiroBangla.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Navbar />
          <ScrollToTopAdvanced />
          <ToastContainer />
          <Toaster position="top-right" richColors />
          <div className="min-h-screen flex flex-col">{children}</div>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
