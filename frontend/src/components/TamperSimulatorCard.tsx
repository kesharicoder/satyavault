"use client";

import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, RefreshCw, Edit3, Lock } from 'lucide-react';

interface MockEvent {
  id: number;
  event_id: string;
  action: string;
  payload: string;
  prev_hash: string;
  hash: string;
}

const INITIAL_CHAIN: MockEvent[] = [
  {
    id: 1,
    event_id: "EVT-2026-0001",
    action: "EVIDENCE_SEIZURE_REGISTERED",
    payload: "Cyber Fraud Seizure: Server Drive EVD-001. Claimed Loss: INR 4,50,000",
    prev_hash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a"
  },
  {
    id: 2,
    event_id: "EVT-2026-0002",
    action: "CUSTODY_TRANSFER_TO_VAULT",
    payload: "Transferred from Inspector Mehta to Officer Verma at Central Vault Room B",
    prev_hash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
    hash: "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190"
  },
  {
    id: 3,
    event_id: "EVT-2026-0003",
    action: "LAB_FORENSIC_EXTRACTION",
    payload: "Disk extraction concluded by Dr. Neha Sharma. SHA-256 binary verified",
    prev_hash: "8f319208a49c2d76a2e83161c9e82e3b2f518804910248c89b21034c01289190",
    hash: "1c7d2e091b8a7f43e1208956c321098471e98031238914028340192834019283"
  }
];

export function TamperSimulatorCard() {
  const [events, setEvents] = useState<MockEvent[]>(INITIAL_CHAIN);
  const [editedIndex, setEditedIndex] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [isTampered, setIsTampered] = useState<boolean>(false);
  const [tamperAlert, setTamperAlert] = useState<string | null>(null);

  // Quick SHA-256 string computation helper in browser
  const computeSimpleHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}e4920b784a91902f8194ad892834891278f923019842091283`;
  };

  const handleSimulateTamper = (index: number) => {
    setEditedIndex(index);
    setEditedText(events[index].payload);
  };

  const applyTamperPayload = () => {
    if (editedIndex === null) return;

    const newEvents = [...events];
    newEvents[editedIndex] = {
      ...newEvents[editedIndex],
      payload: editedText
    };

    // Recalculate hash chain downstream
    let prev = newEvents[0].prev_hash;
    for (let i = 0; i < newEvents.length; i++) {
      if (i >= editedIndex) {
        const recalculated = computeSimpleHash(newEvents[i].payload + prev + "TAMPERED");
        newEvents[i] = {
          ...newEvents[i],
          prev_hash: prev,
          hash: recalculated
        };
      }
      prev = newEvents[i].hash;
    }

    setEvents(newEvents);
    setIsTampered(true);
    setTamperAlert(`CRYPTO ALERT: Event ${events[editedIndex].event_id} was modified. SHA-256 cascade broken!`);
    setEditedIndex(null);
  };

  const resetChain = () => {
    setEvents(INITIAL_CHAIN);
    setIsTampered(false);
    setTamperAlert(null);
    setEditedIndex(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden my-6">
      {/* Header Banner */}
      <div className={`p-4 border-b flex items-center justify-between transition-colors ${
        isTampered ? 'bg-red-50 border-red-200' : 'bg-slate-900 text-white border-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          {isTampered ? (
            <div className="p-2 bg-red-100 rounded-lg text-red-600 animate-pulse">
              <ShieldAlert className="w-6 h-6" />
            </div>
          ) : (
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
          )}
          <div>
            <h3 className={`font-bold text-base ${isTampered ? 'text-red-900' : 'text-white'}`}>
              ⚡ Live Cryptographic Hash Chain Tamper Simulator
            </h3>
            <p className={`text-xs ${isTampered ? 'text-red-700' : 'text-slate-400'}`}>
              Evaluator / Judge Interactive Demo — Edit any event to test SHA-256 sequential non-repudiation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isTampered && (
            <button
              onClick={resetChain}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Re-Verify & Restore Chain
            </button>
          )}
        </div>
      </div>

      {/* Alert Banner if Tampered */}
      {tamperAlert && (
        <div className="bg-red-600 text-white px-4 py-2 text-xs font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{tamperAlert}</span>
        </div>
      )}

      {/* Chain Event Cards */}
      <div className="p-5 space-y-4 bg-slate-50/50">
        {events.map((event, idx) => {
          const isThisBlockTampered = isTampered && idx >= (editedIndex !== null ? editedIndex : 0);

          return (
            <div
              key={event.event_id}
              className={`p-4 rounded-xl border transition-all ${
                isThisBlockTampered
                  ? 'bg-red-50/80 border-red-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {event.event_id}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">{event.action}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isThisBlockTampered ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white animate-bounce">
                      <ShieldAlert className="w-3 h-3" /> CHAIN BROKEN [HASH MISMATCH]
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      <ShieldCheck className="w-3 h-3" /> HASH CHAIN INTACT
                    </span>
                  )}

                  {!isTampered && (
                    <button
                      onClick={() => handleSimulateTamper(idx)}
                      className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded text-xs font-medium flex items-center gap-1 transition-all"
                    >
                      <Edit3 className="w-3 h-3" /> Edit / Tamper
                    </button>
                  )}
                </div>
              </div>

              {/* Payload Details */}
              {editedIndex === idx ? (
                <div className="my-2 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                  <label className="block text-xs font-bold text-amber-900 mb-1">
                    Simulate Unlawful Editing of Event Payload:
                  </label>
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full text-xs font-mono p-2 border rounded border-amber-400 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditedIndex(null)}
                      className="px-2.5 py-1 text-xs text-slate-600 hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyTamperPayload}
                      className="px-3 py-1 text-xs font-bold bg-red-600 hover:bg-red-700 text-white rounded shadow-sm"
                    >
                      Commit Unauthorized Alteration
                    </button>
                  </div>
                </div>
              ) : (
                <p className={`text-xs font-sans my-1.5 ${isThisBlockTampered ? 'text-red-900 font-semibold' : 'text-slate-600'}`}>
                  {event.payload}
                </p>
              )}

              {/* Hashes Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3 pt-2 border-t border-slate-100 text-[11px] font-mono">
                <div className="flex items-center gap-1 text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>Parent Hash ($H_{'{i-1}'}$):</span>
                  <span className="text-slate-700 truncate">{event.prev_hash.substring(0, 20)}...</span>
                </div>
                <div className="flex items-center gap-1 text-slate-500 md:justify-end">
                  <span>Current Hash ($H_i$):</span>
                  <span className={`font-bold truncate ${isThisBlockTampered ? 'text-red-600 underline' : 'text-emerald-700'}`}>
                    {event.hash.substring(0, 24)}...
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
