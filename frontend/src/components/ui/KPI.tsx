import React from 'react';

interface KPIProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
}

export const KPI: React.FC<KPIProps> = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-surface p-5 rounded-xl border border-border shadow-sm flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-muted uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-navy mt-1">{value}</h3>
        {subtitle && <p className="text-xs text-muted mt-1">{subtitle}</p>}
      </div>
      {icon && (
        <div className="p-3 bg-background rounded-lg border border-border text-govblue">
          {icon}
        </div>
      )}
    </div>
  );
};
