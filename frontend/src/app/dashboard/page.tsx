"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const activeUser = getCurrentUser();
    router.replace(activeUser.portal_path || '/dashboard/investigator');
  }, [router]);

  return (
    <div className="p-8 text-center text-xs text-muted">
      Redirecting to your assigned single-role portal...
    </div>
  );
}
