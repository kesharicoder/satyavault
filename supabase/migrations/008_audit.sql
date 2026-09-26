-- Migration 008: Hash-Chained Audit Events Ledger
create table public.audit_events (
  id bigint generated always as identity primary key,
  event_id uuid unique not null default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  resource_type text not null,
  resource_id text,
  result text not null,
  reason text,
  ip_address inet,
  user_agent text,
  correlation_id text,
  previous_event_hash text,
  event_hash text not null,
  created_at timestamptz not null default now()
);
