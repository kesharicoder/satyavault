-- Migration 006: Evidence Items
create table public.evidence (
  id uuid primary key default gen_random_uuid(),
  evidence_id text unique not null,
  case_id uuid not null references public.cases(id) on delete restrict,
  evidence_type text not null,
  description text not null,
  source text,
  collected_at timestamptz,
  collected_by uuid references public.profiles(id),
  current_custodian uuid references public.profiles(id),
  current_location text,
  status text not null default 'collected',
  reference_hash text,
  source_document_id uuid references public.documents(id),
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
