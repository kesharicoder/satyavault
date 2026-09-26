import React from 'react';

export const GovernmentFooter: React.FC = () => {
  return (
    <footer className="w-full bg-navy border-t border-navy-light text-slate-400 text-xs py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div>
          <p className="font-semibold text-slate-300">Satya Vault — SIH 2026 Prototype</p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Designed for secure digital evidence, custody management, and audit verification. Synthetic data only.
          </p>
        </div>
        <div className="flex space-x-6">
          <a href="/docs/SECURITY.md" className="hover:text-saffron transition-colors">Security Policy</a>
          <a href="/docs/PRIVACY.md" className="hover:text-saffron transition-colors">Privacy Standard</a>
          <a href="/help" className="hover:text-saffron transition-colors">Help Desk</a>
        </div>
      </div>
    </footer>
  );
};
