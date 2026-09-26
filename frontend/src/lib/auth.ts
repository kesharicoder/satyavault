export interface UserProfile {
  id: string;
  user_code: string;
  name: string;
  role: 'investigator' | 'custody_officer' | 'forensic_officer' | 'prosecutor' | 'court_officer' | 'security_auditor' | 'administrator';
  role_label: string;
  department: string;
  email: string;
  portal_path: string;
}

export const PRESET_USERS: UserProfile[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    user_code: 'INV-001',
    name: 'Inspector Aarav Mehta',
    role: 'investigator',
    role_label: 'Investigator',
    department: 'Cyber Crime Division',
    email: 'aarav.mehta@satyavault.local',
    portal_path: '/dashboard/investigator',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    user_code: 'CUST-002',
    name: 'Officer Rahul Verma',
    role: 'custody_officer',
    role_label: 'Custody Officer',
    department: 'Central Evidence Vault',
    email: 'rahul.verma@satyavault.local',
    portal_path: '/dashboard/custody',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    user_code: 'FOR-003',
    name: 'Dr. Neha Sharma',
    role: 'forensic_officer',
    role_label: 'Forensic Officer',
    department: 'Digital Forensics Lab',
    email: 'neha.sharma@satyavault.local',
    portal_path: '/dashboard/forensic',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    user_code: 'PROS-004',
    name: 'Adv. Priya Nair',
    role: 'prosecutor',
    role_label: 'Prosecutor / Legal Officer',
    department: 'Directorate of Prosecution',
    email: 'priya.nair@satyavault.local',
    portal_path: '/dashboard/prosecutor',
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    user_code: 'CRT-005',
    name: 'Justice S. K. Roy',
    role: 'court_officer',
    role_label: 'Court Officer',
    department: 'Sessions Court Division',
    email: 'court.officer@satyavault.local',
    portal_path: '/dashboard/court',
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    user_code: 'AUD-006',
    name: 'Amitav Ghosh',
    role: 'security_auditor',
    role_label: 'Security Auditor',
    department: 'Internal Security Audit',
    email: 'amitav.ghosh@satyavault.local',
    portal_path: '/dashboard/security-auditor',
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    user_code: 'ADM-007',
    name: 'Chief Administrator',
    role: 'administrator',
    role_label: 'Administrator',
    department: 'IT Operations',
    email: 'admin@satyavault.local',
    portal_path: '/dashboard/admin',
  },
];

const STORAGE_KEY = 'satya_vault_session_user';

export function getCurrentUser(): UserProfile {
  if (typeof window === 'undefined') return PRESET_USERS[0];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return PRESET_USERS[0];
}

export function loginUser(user: UserProfile): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
}

export function authenticateUserCredentials({
  identifier,
  role,
}: {
  identifier: string;
  role: UserProfile['role'];
}): UserProfile {
  const match = PRESET_USERS.find(
    (u) =>
      u.email.toLowerCase() === identifier.trim().toLowerCase() ||
      u.user_code.toLowerCase() === identifier.trim().toLowerCase() ||
      u.role === role
  );

  if (match) {
    loginUser(match);
    return match;
  }

  const rolePortalMap: Record<UserProfile['role'], { path: string; label: string }> = {
    investigator: { path: '/dashboard/investigator', label: 'Investigator' },
    custody_officer: { path: '/dashboard/custody', label: 'Custody Officer' },
    forensic_officer: { path: '/dashboard/forensic', label: 'Forensic Officer' },
    prosecutor: { path: '/dashboard/prosecutor', label: 'Prosecutor / Legal Officer' },
    court_officer: { path: '/dashboard/court', label: 'Court Officer' },
    security_auditor: { path: '/dashboard/security-auditor', label: 'Security Auditor' },
    administrator: { path: '/dashboard/admin', label: 'Administrator' },
  };

  const meta = rolePortalMap[role];
  const user: UserProfile = {
    id: `usr-${Date.now()}`,
    user_code: identifier.toUpperCase().includes('USR') ? identifier : `USR-${identifier.slice(0, 4).toUpperCase()}`,
    name: identifier.includes('@') ? identifier.split('@')[0] : `Officer ${identifier}`,
    role: role,
    role_label: meta.label,
    department: 'Judicial Operations',
    email: identifier.includes('@') ? identifier : `${identifier}@satyavault.local`,
    portal_path: meta.path,
  };

  loginUser(user);
  return user;
}

export function signUpUser(newUserData: {
  name: string;
  user_code: string;
  department: string;
  role: UserProfile['role'];
  email: string;
}): UserProfile {
  const rolePortalMap: Record<UserProfile['role'], { path: string; label: string }> = {
    investigator: { path: '/dashboard/investigator', label: 'Investigator' },
    custody_officer: { path: '/dashboard/custody', label: 'Custody Officer' },
    forensic_officer: { path: '/dashboard/forensic', label: 'Forensic Officer' },
    prosecutor: { path: '/dashboard/prosecutor', label: 'Prosecutor / Legal Officer' },
    court_officer: { path: '/dashboard/court', label: 'Court Officer' },
    security_auditor: { path: '/dashboard/security-auditor', label: 'Security Auditor' },
    administrator: { path: '/dashboard/admin', label: 'Administrator' },
  };

  const meta = rolePortalMap[newUserData.role];

  const newUser: UserProfile = {
    id: `usr-${Date.now()}`,
    user_code: newUserData.user_code || `USR-${Math.floor(100 + Math.random() * 900)}`,
    name: newUserData.name,
    role: newUserData.role,
    role_label: meta.label,
    department: newUserData.department,
    email: newUserData.email,
    portal_path: meta.path,
  };

  loginUser(newUser);
  return newUser;
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

