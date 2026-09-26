export interface NavItem {
  title: string;
  href: string;
  iconName: string;
  roles?: string[]; // If undefined, accessible by all roles
}

export const mainNavigation: NavItem[] = [
  { 
    title: "Dashboard", 
    href: "/dashboard", 
    iconName: "LayoutDashboard",
    roles: ["investigator", "custody_officer", "forensic_officer", "prosecutor", "court_officer", "security_auditor", "administrator"] 
  },
  { 
    title: "Case Directory", 
    href: "/cases", 
    iconName: "Briefcase",
    roles: ["investigator", "custody_officer", "forensic_officer", "prosecutor", "court_officer", "security_auditor", "administrator"] 
  },
  { 
    title: "Document Vault", 
    href: "/documents", 
    iconName: "FileText",
    roles: ["investigator", "custody_officer", "forensic_officer", "prosecutor", "administrator"] 
  },
  { 
    title: "Document Intelligence", 
    href: "/document-intelligence", 
    iconName: "BrainCircuit",
    roles: ["investigator", "forensic_officer", "prosecutor", "administrator"] 
  },
  { 
    title: "Evidence Registry", 
    href: "/evidence", 
    iconName: "ShieldCheck",
    roles: ["investigator", "custody_officer", "forensic_officer", "administrator"] 
  },
  { 
    title: "AI Search", 
    href: "/ai-search", 
    iconName: "Search",
    roles: ["investigator", "forensic_officer", "prosecutor", "administrator"] 
  },
  { 
    title: "Case Assistant", 
    href: "/case-assistant", 
    iconName: "Bot",
    roles: ["investigator", "prosecutor", "administrator"] 
  },
  { 
    title: "Integrity Verification", 
    href: "/integrity-verification", 
    iconName: "CheckCircle2",
    roles: ["investigator", "custody_officer", "forensic_officer", "court_officer", "security_auditor", "administrator"] 
  },
  { 
    title: "Audit Logs", 
    href: "/audit", 
    iconName: "FileSpreadsheet", 
    roles: ["security_auditor", "administrator"] 
  },
  { 
    title: "Security Dashboard", 
    href: "/security-dashboard", 
    iconName: "ShieldAlert", 
    roles: ["security_auditor", "administrator"] 
  },
  { 
    title: "Security Alerts", 
    href: "/security-alerts", 
    iconName: "AlertTriangle", 
    roles: ["security_auditor", "administrator"] 
  },
  { 
    title: "Reports", 
    href: "/reports", 
    iconName: "Printer",
    roles: ["investigator", "custody_officer", "forensic_officer", "prosecutor", "court_officer", "security_auditor", "administrator"] 
  },
  { 
    title: "Case Bundles", 
    href: "/case-bundles", 
    iconName: "FolderArchive",
    roles: ["investigator", "custody_officer", "forensic_officer", "prosecutor", "court_officer", "security_auditor", "administrator"] 
  },
  { 
    title: "Users & Roles", 
    href: "/users", 
    iconName: "Users", 
    roles: ["administrator"] 
  },
  { 
    title: "Roles & Matrix", 
    href: "/roles-permissions", 
    iconName: "KeyRound", 
    roles: ["administrator"] 
  },
  { 
    title: "Departments", 
    href: "/departments", 
    iconName: "Building2", 
    roles: ["administrator"] 
  },
  { 
    title: "System Settings", 
    href: "/system-settings", 
    iconName: "Settings", 
    roles: ["administrator"] 
  },
  { 
    title: "System Status", 
    href: "/system-status", 
    iconName: "Activity" 
  },
  { 
    title: "Notifications", 
    href: "/notifications", 
    iconName: "Bell" 
  },
  { 
    title: "Help & Support", 
    href: "/help", 
    iconName: "HelpCircle" 
  },
  { 
    title: "My Profile", 
    href: "/profile", 
    iconName: "User" 
  },
];
