"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, Bell, Globe, UserCheck, Menu, X, LogIn, UserPlus, LogOut } from 'lucide-react';
import { getCurrentUser, logoutUser, UserProfile } from '@/lib/auth';

interface GovernmentHeaderProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

const PUBLIC_ROUTES = ['/', '/about', '/how-it-works', '/security-policy', '/accessibility', '/help', '/contact', '/login'];

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    router.push('/login');
  };

  return (
    <header className="w-full bg-navy text-white shadow-md border-b-2 border-saffron sticky top-0 z-40">
      {/* Top Banner Notice */}
      <div className="bg-navy-dark text-xs px-4 py-1 flex justify-between items-center border-b border-navy-light text-slate-300">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-saffron text-navy font-bold px-1.5 py-0.5 rounded text-[10px] shrink-0">
            SIH 2026 PROTOTYPE
          </span>
          <span className="truncate text-[11px] md:text-xs">
            Official Secure Digital Document & Evidence Vault Platform
          </span>
        </div>
        <div className="flex items-center space-x-4 shrink-0">
          <button 
            onClick={() => setLang(lang === 'EN' ? 'HI' : 'EN')} 
            className="flex items-center space-x-1 hover:text-saffron transition-colors text-xs"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'EN' ? 'English' : 'हिंदी'}</span>
          </button>
          <a href="#main-content" className="hidden sm:inline hover:underline text-xs">
            Skip to Content
          </a>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* Mobile Menu Toggle */}
          {!isPublicRoute && onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="md:hidden p-2 text-slate-200 hover:text-white hover:bg-navy-light rounded-lg transition-colors focus:outline-none"
              aria-label="Toggle Navigation Drawer"
            >
              {isMobileSidebarOpen ? <X className="w-6 h-6 text-saffron" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <Link href={isPublicRoute ? '/' : (currentUser?.portal_path || '/dashboard/investigator')} className="flex items-center space-x-3 group">
            <div className="bg-govblue p-2 rounded-lg border border-saffron/40 group-hover:border-saffron transition-colors">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-saffron" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                SATYA VAULT
              </h1>
              <p className="text-[10px] md:text-xs text-slate-300 hidden sm:block">
                Secure Digital Evidence & Audit Platform
              </p>
            </div>
          </Link>
        </div>

        {/* Public Header Links vs Authenticated Officer Profile */}
        {isPublicRoute ? (
          <nav className="flex items-center space-x-2 md:space-x-4">
            <Link href="/" className="text-xs font-semibold text-slate-200 hover:text-saffron transition-colors hidden md:inline">
              Home
            </Link>
            <Link href="/about" className="text-xs font-semibold text-slate-200 hover:text-saffron transition-colors hidden md:inline">
              About
            </Link>
            <Link href="/how-it-works" className="text-xs font-semibold text-slate-200 hover:text-saffron transition-colors hidden md:inline">
              How It Works
            </Link>
            <Link href="/security-policy" className="text-xs font-semibold text-slate-200 hover:text-saffron transition-colors hidden lg:inline">
              Security Policy
            </Link>

            <div className="flex items-center space-x-2 pl-2">
              <Link
                href="/login?tab=signin"
                className="bg-navy-light hover:bg-navy text-slate-100 font-semibold text-xs px-3 py-1.5 rounded-lg border border-slate-600 transition-colors flex items-center gap-1"
              >
                <LogIn className="w-3.5 h-3.5 text-saffron" /> Sign In
              </Link>
              <Link
                href="/login?tab=signup"
                className="bg-saffron hover:bg-saffron-light text-navy font-bold text-xs px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
              >
                <UserPlus className="w-3.5 h-3.5" /> Sign Up
              </Link>
            </div>
          </nav>
        ) : (
          <div className="flex items-center space-x-3">
            <Link href="/notifications" className="p-2 text-slate-300 hover:text-white hover:bg-navy-light rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-saffron rounded-full"></span>
            </Link>

            {/* Exclusive Authenticated Officer Profile Display (No Dropdown Switcher) */}
            <div className="flex items-center space-x-2.5 bg-navy-light px-3 py-1.5 rounded-xl border border-saffron/30">
              <UserCheck className="w-4 h-4 text-saffron shrink-0" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-none">{currentUser?.name || 'Inspector Aarav Mehta'}</p>
                <p className="text-[10px] text-saffron font-medium">{currentUser?.role_label || 'Investigator'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm"
              title="Logout session"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
