-- Migration 003: User Profiles and Roles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete restrict,
  user_code text unique not null,
  full_name text not null,
  department text,
  designation text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  user_id uuid not null references public.profiles(id) on delete restrict,
  role public.app_role not null,
  assigned_by uuid references public.profiles(id),
  assigned_at timestamptz not null default now(),
  primary key (user_id, role)
);
