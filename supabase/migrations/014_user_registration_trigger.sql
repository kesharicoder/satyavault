-- Migration 014: User Registration Trigger for Profile & Role Creation
-- Automatically creates a public profile & user_roles record when a new user signs up in Supabase auth

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, user_code, full_name, department, designation)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_code', 'USR-' || upper(substr(md5(random()::text), 1, 5))),
    coalesce(new.raw_user_meta_data->>'full_name', coalesce(new.email, 'Vault User')),
    coalesce(new.raw_user_meta_data->>'department', 'General'),
    coalesce(new.raw_user_meta_data->>'designation', 'Officer')
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    department = excluded.department,
    user_code = excluded.user_code;

  insert into public.user_roles (user_id, role)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'role')::public.app_role, 'investigator'::public.app_role)
  )
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

-- Trigger execution on auth.users table insertion
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
