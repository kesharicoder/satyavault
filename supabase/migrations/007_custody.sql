-- Migration 007: Custody Transfer Events
create table public.custody_events (
  id uuid primary key default gen_random_uuid(),
  evidence_id uuid not null references public.evidence(id) on delete restrict,
  from_user_id uuid references public.profiles(id),
  to_user_id uuid references public.profiles(id),
  action text not null,
  purpose text not null,
  location text not null,
  verification_result public.integrity_result not null default 'not_checked',
  remarks text,
  event_hash text not null,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);
