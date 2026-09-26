"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { GovernmentHeader } from '@/components/layout/GovernmentHeader';
import { GovernmentFooter } from '@/components/layout/GovernmentFooter';
import { AppSidebar } from '@/components/layout/AppSidebar';

const PUBLIC_ROUTES = ['/', '/about', '/how-it-works', '/security-policy', '/accessibility', '/help', '/contact', '/login'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Satya Vault — Secure Digital Evidence & Audit Platform</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-text">
        <GovernmentHeader
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          isMobileSidebarOpen={isMobileSidebarOpen}
        />
        
        {isPublicRoute ? (
          /* Public Web Pages Layout (No Sidebar) */
          <main id="main-content" className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </main>
        ) : (
          /* Authenticated Portal Layout (With AppSidebar) */
          <div className="flex flex-1 max-w-7xl w-full mx-auto">
            <AppSidebar
              isMobileOpen={isMobileSidebarOpen}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
            <main id="main-content" className="flex-1 p-4 md:p-6 min-w-0 overflow-x-hidden">
              {children}
            </main>
          </div>
        )}

        <GovernmentFooter />
      </body>
    </html>
  );
}
