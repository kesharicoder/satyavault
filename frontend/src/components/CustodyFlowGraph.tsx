"use client";

import React, { useEffect, useState } from 'react';
import { ArrowRight, ShieldCheck, Clock, Building, UserCheck, AlertCircle, FileLock2 } from 'lucide-react';

interface FlowNode {
  step: number;
  stage: string;
  title: string;
  custodian: string;
  location: string;
  status: string;
  timestamp: string;
  sha256: string;
}

export function CustodyFlowGraph({ evidenceId = "EV-2026-0017" }: { evidenceId?: string }) {
  const [nodes, setNodes] = useState<FlowNode[]>([]);

  useEffect(() => {
    fetch(`/api/v1/custody/flow-graph/${evidenceId}`)
      .then(res => res.json())
      .then(data => setNodes(Array.isArray(data.nodes) ? data.nodes : []))
      .catch(() => setNodes([]));
  }, [evidenceId]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 my-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 mb-6">
        <div>
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <FileLock2 className="w-5 h-5 text-govblue" /> Interactive Chain of Custody Lifecycle Flowchart
          </h3>
          <p className="text-xs text-slate-500">Node graph mapping physical & digital custody transfers from initial seizure to court presentation</p>
        </div>
        <span className="text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
          {evidenceId}
        </span>
      </div>

      {/* Horizontal Lifecycle Node Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {nodes.map((n, idx) => {
          const isCompleted = n.status === 'completed';
          const isPending = n.status === 'pending_receiver_approval';

          return (
            <div
              key={n.step}
              className={`p-4 rounded-xl border transition-all relative flex flex-col justify-between ${
                isCompleted
                  ? 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                  : isPending
                  ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-400/20'
                  : 'bg-slate-50/30 border-dashed border-slate-200 opacity-60'
              }`}
            >
              {/* Connector Arrow (desktop) */}
              {idx < nodes.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 bg-white border border-slate-300 rounded-full text-slate-400">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-900 text-white">
                    Step 0{n.step}
                  </span>
                  {isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Signed
                    </span>
                  )}
                  {isPending && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 border border-amber-400 px-2 py-0.5 rounded-full animate-pulse">
                      Pending 2-Person Approval
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-xs text-slate-900 mb-1">{n.title}</h4>
                <p className="text-[11px] text-slate-600 font-medium mb-3">{n.custodian}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[10px] space-y-1 text-slate-500">
                <div className="flex items-center gap-1 truncate" title={n.location}>
                  <Building className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{n.location}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-slate-600">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{n.timestamp}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
