-- Migration 012: Row-Level Security Policies and Helper Functions (Strict RBAC Enforced)

-- Enable RLS on all sensitive tables
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.cases enable row level security;
alter table public.case_assignments enable row level security;
alter table public.documents enable row level security;
alter table public.document_versions enable row level security;
alter table public.evidence enable row level security;
alter table public.custody_events enable row level security;
alter table public.audit_events enable row level security;
alter table public.document_chunks enable row level security;
alter table public.alerts enable row level security;
alter table public.notifications enable row level security;

-- Helper Functions
create or replace function public.current_user_has_role(required_role public.app_role)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()::uuid
      and role = required_role
  );
$$;

create or replace function public.can_access_case(target_case_id uuid)
returns boolean
language sql
security definer
set search_path = public
as $$
  select
    public.current_user_has_role('administrator')
    or public.current_user_has_role('security_auditor')
    or exists (
      select 1
      from public.case_assignments ca
      where ca.case_id = target_case_id
        and ca.user_id = auth.uid()::uuid
        and ca.revoked_at is null
    )
    or exists (
      select 1
      from public.cases c
      where c.id = target_case_id
        and c.created_by = auth.uid()::uuid
    );
$$;

-- Profiles & User Roles Policies (Manage Users / Roles: Administrator Only)
create policy "users can view their own profile or elevated roles view all"
on public.profiles for select to authenticated
using (id = auth.uid()::uuid or public.current_user_has_role('administrator') or public.current_user_has_role('security_auditor'));

create policy "users can update their own profile or admin can manage"
on public.profiles for update to authenticated
using (id = auth.uid()::uuid or public.current_user_has_role('administrator'));

create policy "only administrators can manage user roles"
on public.user_roles for all to authenticated
using (public.current_user_has_role('administrator'))
with check (public.current_user_has_role('administrator'));

-- Cases Policies (Create Case: Investigator or Administrator Only)
create policy "authorized users can view assigned cases"
on public.cases for select to authenticated
using (public.can_access_case(id));

create policy "only investigators and administrators can create cases"
on public.cases for insert to authenticated
with check (
  created_by = auth.uid()::uuid 
  and (public.current_user_has_role('investigator') or public.current_user_has_role('administrator'))
);

create policy "case owners and administrators can update cases"
on public.cases for update to authenticated
using (created_by = auth.uid()::uuid or public.current_user_has_role('administrator'))
with check (created_by = auth.uid()::uuid or public.current_user_has_role('administrator'));

-- Documents Policies (Upload Document: Investigator, Custody Off, Forensic Off, Prosecutor, Admin)
create policy "users can view case documents"
on public.documents for select to authenticated
using (public.can_access_case(case_id));

create policy "authorized roles can insert case documents"
on public.documents for insert to authenticated
with check (
  public.can_access_case(case_id) 
  and created_by = auth.uid()::uuid
  and (
    public.current_user_has_role('investigator')
    or public.current_user_has_role('custody_officer')
    or public.current_user_has_role('forensic_officer')
    or public.current_user_has_role('prosecutor')
    or public.current_user_has_role('administrator')
  )
);

-- Document Versions Policies
create policy "users can view version details"
on public.document_versions for select to authenticated
using (exists (select 1 from public.documents d where d.id = document_id and public.can_access_case(d.case_id)));

-- Evidence Policies (Register Evidence: Investigator, Custody Off, Forensic Off, Admin Only)
create policy "users can view case evidence"
on public.evidence for select to authenticated
using (public.can_access_case(case_id));

create policy "authorized roles can register evidence"
on public.evidence for insert to authenticated
with check (
  public.can_access_case(case_id)
  and (
    public.current_user_has_role('investigator')
    or public.current_user_has_role('custody_officer')
    or public.current_user_has_role('forensic_officer')
    or public.current_user_has_role('administrator')
  )
);

-- Custody Policies (Initiate & Complete Transfers: Authorized Roles Only)
create policy "users can view custody events"
on public.custody_events for select to authenticated
using (exists (select 1 from public.evidence e where e.id = evidence_id and public.can_access_case(e.case_id)));

create policy "authorized roles can initiate custody events"
on public.custody_events for insert to authenticated
with check (
  public.current_user_has_role('investigator')
  or public.current_user_has_role('custody_officer')
  or public.current_user_has_role('forensic_officer')
  or public.current_user_has_role('administrator')
);

create policy "custody and forensic officers can complete transfers"
on public.custody_events for update to authenticated
using (
  public.current_user_has_role('custody_officer')
  or public.current_user_has_role('forensic_officer')
  or public.current_user_has_role('administrator')
)
with check (
  public.current_user_has_role('custody_officer')
  or public.current_user_has_role('forensic_officer')
  or public.current_user_has_role('administrator')
);

-- Audit Policies (View Audit Logs: Security Auditor and Administrator Only)
create policy "auditors and administrators can view audit events"
on public.audit_events for select to authenticated
using (public.current_user_has_role('security_auditor') or public.current_user_has_role('administrator'));

create policy "authenticated users can create audit events"
on public.audit_events for insert to authenticated
with check (actor_id = auth.uid()::uuid);

revoke update, delete on public.audit_events from authenticated;
