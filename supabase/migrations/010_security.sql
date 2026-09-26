-- Migration 010: Processing Jobs, Alerts, and System Notifications
create table public.processing_jobs (
  id uuid primary key default gen_random_uuid(),
  job_type text not null,
  resource_type text not null,
  resource_id text not null,
  status public.processing_status not null default 'queued',
  error_message text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  severity text not null default 'medium',
  category text not null,
  description text not null,
  resource_type text,
  resource_id text,
  affected_user_id uuid references public.profiles(id),
  status text not null default 'open',
  review_notes text,
  reviewed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  link text,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
