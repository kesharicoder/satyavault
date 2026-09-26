-- Migration 011: Generated Reports Metadata
create table public.generated_reports (
  id uuid primary key default gen_random_uuid(),
  report_number text unique not null,
  title text not null,
  report_type text not null,
  case_id uuid references public.cases(id) on delete restrict,
  storage_bucket text not null,
  storage_path text not null,
  sha256_hash text not null,
  generated_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);
