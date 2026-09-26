import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Lock, Info, MinusCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'verified' | 'pending' | 'failed' | 'restricted' | 'info' | 'inactive' | string;
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const normalized = status.toLowerCase();

  switch (normalized) {
    case 'verified':
    case 'active':
    case 'completed':
    case 'ready':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-govgreen border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {label || 'Verified'}
        </span>
      );
    case 'pending':
    case 'queued':
    case 'investigation':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-govamber border border-amber-300">
          <Clock className="w-3.5 h-3.5" />
          {label || 'Pending'}
        </span>
      );
    case 'failed':
    case 'mismatch':
    case 'action_required':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-govred border border-red-300">
          <AlertTriangle className="w-3.5 h-3.5" />
          {label || 'Failed'}
        </span>
      );
    case 'restricted':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-200 text-navy border border-slate-300">
          <Lock className="w-3.5 h-3.5 text-saffron" />
          {label || 'Restricted'}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-muted border border-border">
          <Info className="w-3.5 h-3.5" />
          {label || status}
        </span>
      );
  }
};
