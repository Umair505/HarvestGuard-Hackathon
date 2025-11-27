import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import { Hind_Siliguri, Tiro_Bangla } from 'next/font/google'
import Footer from "@/components/Footer";
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
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
})

const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: ['400'], 
  variable: '--font-tiro',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${hindSiliguri.variable} ${tiroBangla.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />

        <ToastContainer />
        {children}
        <Footer />
      </body>
    </html>
  );
}
