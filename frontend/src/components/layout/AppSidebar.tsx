"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainNavigation } from '@/config/navigation';
import { getCurrentUser, UserProfile } from '@/lib/auth';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  FileSpreadsheet, 
  AlertTriangle, 
  Printer, 
  Users,
  BrainCircuit,
  Bot,
  ShieldAlert,
  FolderArchive,
  KeyRound,
  Building2,
  Settings,
  Activity,
  Bell,
  HelpCircle,
  User,
  X
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  BrainCircuit: <BrainCircuit className="w-4 h-4" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4" />,
  Search: <Search className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  CheckCircle2: <CheckCircle2 className="w-4 h-4" />,
  FileSpreadsheet: <FileSpreadsheet className="w-4 h-4" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4" />,
  AlertTriangle: <AlertTriangle className="w-4 h-4" />,
  Printer: <Printer className="w-4 h-4" />,
  FolderArchive: <FolderArchive className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  KeyRound: <KeyRound className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Settings: <Settings className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Bell: <Bell className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  User: <User className="w-4 h-4" />,
};

interface AppSidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const activeUser = user || {
    role: 'investigator',
    role_label: 'Investigator',
    portal_path: '/dashboard/investigator',
    name: 'Inspector Aarav Mehta'
  };

  // Filter navigation items strictly based on role
  const authorizedNavItems = mainNavigation.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(activeUser.role);
  });

  const sidebarContent = (
    <div className="p-4 flex flex-col h-full space-y-4">
      <div className="flex justify-between items-center md:hidden pb-2 border-b border-border">
        <span className="text-xs font-bold text-navy uppercase tracking-wider">Navigation Menu</span>
        <button onClick={onCloseMobile} className="p-1 text-muted hover:text-navy">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
        <div className="px-3 py-1 text-[11px] font-bold text-muted uppercase tracking-wider hidden md:block">
          Portal Directory
        </div>
        {authorizedNavItems.map((item) => {
          const targetHref = item.title === "Dashboard" ? (activeUser.portal_path || "/dashboard/investigator") : item.href;
          const isActive = pathname === targetHref || (targetHref !== '/' && pathname.startsWith(targetHref));
          
          return (
            <Link
              key={item.href}
              href={targetHref}
              onClick={onCloseMobile}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-navy text-white shadow-sm font-bold'
                  : 'text-text hover:bg-background hover:text-navy'
              }`}
            >
              <span className={isActive ? 'text-saffron' : 'text-muted'}>
                {iconMap[item.iconName] || <FileText className="w-4 h-4" />}
              </span>
              <span className="truncate">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-3 border-t border-border">
        <div className="bg-background p-2.5 rounded-lg border border-border">
          <p className="text-[11px] font-bold text-navy flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-govgreen animate-pulse"></span>
            System Status: Verified
          </p>
          <p className="text-[10px] text-muted mt-0.5">SHA-256 audit ledger active.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-surface border-r border-border min-h-[calc(100vh-80px)] shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative bg-surface w-72 max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
