import React from "react";
import Link from "next/link";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sprout 
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200 font-sans border-t border-slate-800">
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
             <Image src="/images/logo.png" alt="গোলাঘর" width={40} height={40} />
              <span className="text-2xl font-bold font-tiro-bangla text-white">গোলাঘর</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              প্রযুক্তির ছোঁয়ায় বাচুক কৃষকের স্বপ্ন। আমরা কাজ করছি বাংলাদেশের খাদ্য অপচয় রোধে এবং কৃষকদের জীবনমান উন্নয়নে।
            </p>
            
            {/* SDG Badge */}
            <div className="inline-flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
              <div className="bg-amber-500 text-slate-900 font-bold text-xs px-2 py-1 rounded">
                SDG 12.3
              </div>
              <span className="text-xs font-semibold text-slate-300">
                টেকসই উন্নয়ন লক্ষ্যমাত্রা
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-tiro-bangla">প্রয়োজনীয় লিংক</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> হোম
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hover:bg-emerald-500"></span> আমাদের সম্পর্কে
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hover:bg-emerald-500"></span> ফিচারসমূহ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full hover:bg-emerald-500"></span> যোগাযোগ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-tiro-bangla">যোগাযোগ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-400">
                  কৃষি ভবন, খামারবাড়ি, <br /> ফার্মগেট, ঢাকা-১২১৫
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-400">+৮৮০ ১৭০০-০০০০০০</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-400">info@golaghor.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 font-tiro-bangla">আবহাওয়া আপডেট</h3>
            <p className="text-slate-400 text-sm mb-4">
              ঝড়-বৃষ্টির আগাম বার্তা পেতে আপনার ইমেইল দিন।
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="আপনার ইমেইল লিখুন" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500"
                />
                <button 
                  type="button"
                  className="absolute right-1.5 top-1.5 p-1.5 bg-emerald-600 rounded-md text-white hover:bg-emerald-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} গোলাঘর (Golaghor) | সর্বস্বত্ব সংরক্ষিত</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">গোপনীয়তা নীতি</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">শর্তাবলী</Link>
           
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Component for Social Icons
function SocialLink({ href, icon }) {
  return (
    <Link 
      href={href} 
      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all duration-300"
    >
      {icon}
    </Link>
  );
}