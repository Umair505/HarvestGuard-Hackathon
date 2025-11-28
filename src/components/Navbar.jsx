"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Home,
  Wheat,
  Cloud,
  AlertTriangle,
  ScanLine,
  User,
  LogIn,
  Menu,
  X,
  LogOut,
  UserCircle,
} from "lucide-react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export const Navbar = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    setShowLogoutModal(true);
    setIsDropdownOpen(false);
  };

  const confirmLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully!");
    setShowLogoutModal(false);
  };

  const navItems = [
    { label: "হোম", href: "/", icon: Home },
    // { label: "ফসল", href: "/crops", icon: Wheat },
    { label: "আবহাওয়া", href: "/weather", icon: Cloud },
    { label: "ঝুঁকি", href: "/risk-dashboard", icon: AlertTriangle },
    { label: "স্ক্যান", href: "/scanner", icon: ScanLine },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-white to-white/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="relative">
               
                 <Link href="/"> <Image src="/images/logo.png" alt="Logo" width={80} height={80} /></Link>
              </div>
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

            {/* Crop Batch Registration — ONLY VISIBLE IF LOGGED IN */}
            {isLoggedIn && (
              <a
                href="/batchregistration"
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition-all"
                style={{
                  animation: "slideDown 0.5s ease-out 0.45s both",
                }}
              >
                ফসল ব্যাচ নিবন্ধন
              </a>
            )}

            {/* Profile Avatar with Dropdown / Login */}
            <div
              className="ml-4 relative"
              style={{ animation: "slideDown 0.5s ease-out 0.5s both" }}
              ref={dropdownRef}
            >
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        width={40}
                        height={40}
                        alt="user avatar"
                        className="rounded-full border-2 border-emerald-500 hover:border-emerald-600 transition-all cursor-pointer"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-500 hover:border-emerald-600 transition-all cursor-pointer">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {session?.user?.name || "ব্যবহারকারী"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session?.user?.email}
                        </p>
                      </div>
                      
                      <a
                        href="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle className="h-4 w-4 text-emerald-600" />
                        <span>প্রোফাইল</span>
                      </a>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>লগআউট</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <a
                  href="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition"
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
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[500px]" : "max-h-0"
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
                    : "none",
                }}
              >
                <Icon className="h-5 w-5 text-emerald-600" />
                <span className="text-gray-700 font-medium font-hind">{item.label}</span>
              </a>
            );
          })}

          {/* Crop Batch Registration Mobile — Only if logged in */}
          {isLoggedIn && (
            <a
              href="/batch-registration"
              className="flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg shadow-md"
            >
              ফসল ব্যাচ নিবন্ধন
            </a>
          )}

          {/* Mobile Profile Section */}
          <div className="pt-2 space-y-2">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      width={40}
                      height={40}
                      alt="user avatar"
                      className="rounded-full border-2 border-emerald-500"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {session?.user?.name || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <a
                  href="/profile"
                  className="flex items-center justify-center space-x-2 px-4 py-3 bg-emerald-600 text-white rounded-lg shadow-md"
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="font-medium font-hind">প্রোফাইল</span>
                </a>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg shadow-md"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium font-hind">লগআউট</span>
                </button>
              </>
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

      {/* Logout Confirmation Modal */}
      <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-gray-900">
              লগআউট নিশ্চিত করুন
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              আপনি কি নিশ্চিত যে আপনি লগআউট করতে চান?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
              বাতিল
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmLogout}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              লগআউট
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <style dangerouslySetInnerHTML={{__html: `
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
      `}} />
    </nav>
  );
};