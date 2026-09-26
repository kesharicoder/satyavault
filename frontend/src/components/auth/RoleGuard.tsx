"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, UserProfile } from '@/lib/auth';

interface RoleGuardProps {
  allowedRole: UserProfile['role'];
  children: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRole, children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const activeUser = getCurrentUser();
    setUser(activeUser);

    if (activeUser.role === allowedRole || activeUser.role === 'administrator') {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
      router.push('/unauthorized');
    }
  }, [allowedRole, router]);

  if (!isAuthorized) {
    return (
      <div className="p-8 text-center text-xs text-muted">
        Verifying role authorization context...
      </div>
    );
  }

  return <>{children}</>;
};
