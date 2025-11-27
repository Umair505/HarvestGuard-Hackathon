"use client"
import React, { useState, useEffect } from 'react';
import { Home, Wheat, Cloud, AlertTriangle, ScanLine, User, LogIn, Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Check login status from localStorage
  useEffect(() => {
    const user = localStorage.getItem('harvestguard_user');
    setIsLoggedIn(!!user);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'হোম', href: '/', icon: Home },
    { label: 'ফসল', href: '/crops', icon: Wheat },
    { label: 'আবহাওয়া', href: '/weather', icon: Cloud },
    { label: 'ঝুঁকি', href: '/risk', icon: AlertTriangle },
    { label: 'স্ক্যান', href: '/scan', icon: ScanLine },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-white to-white/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-400 rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 rounded-full">
                  <Wheat className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent font-tiro">
                গোলাঘর
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-emerald-50"
                  style={{
                    animation: `slideDown 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 font-medium font-hind group-hover:text-emerald-600 transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </a>
              );
            })}

            {/* Profile/Login Button */}
            <div
              className="ml-4"
              style={{
                animation: 'slideDown 0.5s ease-out 0.5s both',
              }}
            >
              {isLoggedIn ? (
                <a
                  href="/profile"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium font-hind">প্রোফাইল</span>
                </a>
              ) : (
                <a
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="font-medium font-hind">লগইন</span>
                </a>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-emerald-50 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-100">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
                style={{
                  animation: isMobileMenuOpen
                    ? `slideRight 0.3s ease-out ${index * 0.05}s both`
                    : 'none',
                }}
              >
                <Icon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium font-hind">
                  {item.label}
                </span>
              </a>
            );
          })}
          <div className="pt-2">
            {isLoggedIn ? (
              <a
                href="/profile"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg shadow-md"
              >
                <User className="h-5 w-5" />
                <span className="font-medium font-hind">প্রোফাইল</span>
              </a>
            ) : (
              <a
                href="/login"
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md"
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium font-hind">লগইন / নিবন্ধন</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};