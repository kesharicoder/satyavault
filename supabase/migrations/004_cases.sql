-- Migration 004: Cases and Case Assignments
create table public.cases (
  id uuid primary key default gen_random_uuid(),
  case_number text unique not null,
  title text not null,
  case_type text not null,
  jurisdiction text,
  department text,
  priority text not null default 'normal',
  status public.case_status not null default 'draft',
  classification text not null default 'restricted',
  assigned_investigator uuid references public.profiles(id),
  opened_at timestamptz,
  closed_at timestamptz,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.case_assignments (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  user_id uuid not null references public.profiles(id) on delete restrict,
  assignment_type text not null,
  assigned_by uuid not null references public.profiles(id),
  assigned_at timestamptz not null default now(),
  revoked_at timestamptz
);
