-- Seed Auth Users to satisfy foreign key constraint on public.profiles(id) -> auth.users(id)
insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
values
  ('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'aarav.mehta@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Inspector Aarav Mehta","user_code":"INV-001"}', now(), now()),
  ('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'rahul.verma@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Officer Rahul Verma","user_code":"CUST-002"}', now(), now()),
  ('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'neha.sharma@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Dr. Neha Sharma","user_code":"FOR-003"}', now(), now()),
  ('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'priya.nair@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Adv. Priya Nair","user_code":"PROS-004"}', now(), now()),
  ('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'court.officer@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Justice S. K. Roy","user_code":"CRT-005"}', now(), now()),
  ('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'amitav.ghosh@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Amitav Ghosh","user_code":"AUD-006"}', now(), now()),
  ('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@satyavault.local', '$2a$10$abcdefghijklmnopqrstuu', now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Chief Administrator","user_code":"ADM-007"}', now(), now())
on conflict (id) do nothing;

insert into public.profiles (id, user_code, full_name, department, designation, phone)
values
  ('11111111-1111-1111-1111-111111111111', 'INV-001', 'Inspector Aarav Mehta', 'Cyber Crime Division', 'Senior Investigator', '+919876543210'),
  ('22222222-2222-2222-2222-222222222222', 'CUST-002', 'Officer Rahul Verma', 'Central Evidence Vault', 'Custody In-Charge', '+919876543211'),
  ('33333333-3333-3333-3333-333333333333', 'FOR-003', 'Dr. Neha Sharma', 'Digital Forensics Lab', 'Forensic Examiner', '+919876543212'),
  ('44444444-4444-4444-4444-444444444444', 'PROS-004', 'Adv. Priya Nair', 'Directorate of Prosecution', 'Public Prosecutor', '+919876543213'),
  ('55555555-5555-5555-5555-555555555555', 'CRT-005', 'Justice S. K. Roy', 'Sessions Court Division', 'Court Officer', '+919876543214'),
  ('66666666-6666-6666-6666-666666666666', 'AUD-006', 'Amitav Ghosh', 'Internal Security Audit', 'Security Auditor', '+919876543215'),
  ('77777777-7777-7777-7777-777777777777', 'ADM-007', 'Chief Administrator', 'IT Operations', 'Chief Administrator', '+919876543216')
on conflict (id) do update set
  full_name = excluded.full_name,
  department = excluded.department,
  user_code = excluded.user_code;

insert into public.user_roles (user_id, role)
values
  ('11111111-1111-1111-1111-111111111111', 'investigator'),
  ('22222222-2222-2222-2222-222222222222', 'custody_officer'),
  ('33333333-3333-3333-3333-333333333333', 'forensic_officer'),
  ('44444444-4444-4444-4444-444444444444', 'prosecutor'),
  ('55555555-5555-5555-5555-555555555555', 'court_officer'),
  ('66666666-6666-6666-6666-666666666666', 'security_auditor'),
  ('77777777-7777-7777-7777-777777777777', 'administrator')
on conflict (user_id, role) do nothing;

-- Sample Synthetic Case
insert into public.cases (id, case_number, title, case_type, jurisdiction, department, priority, status, created_by)
values (
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'FIR-2026-DEL-0482',
  'Operation Cyber Shield — Financial Fraud Probe',
  'Cyber Crime',
  'New Delhi Judicial District',
  'Cyber Crime Division',
  'high',
  'investigation',
  '11111111-1111-1111-1111-111111111111'
) on conflict (id) do nothing;

insert into public.case_assignments (case_id, user_id, assignment_type, assigned_by)
values
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '11111111-1111-1111-1111-111111111111', 'lead_investigator', '77777777-7777-7777-7777-777777777777'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '22222222-2222-2222-2222-222222222222', 'custody_officer', '77777777-7777-7777-7777-777777777777'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '33333333-3333-3333-3333-333333333333', 'forensic_examiner', '77777777-7777-7777-7777-777777777777'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '44444444-4444-4444-4444-444444444444', 'prosecutor', '77777777-7777-7777-7777-777777777777')
on conflict do nothing;

-- Sample Seed Entities for AI Cross-Jurisdiction Matching
insert into public.case_entities (case_id, entity_type, entity_value, confidence_score, matched_jurisdiction, notes)
values
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'suspect', 'Vikram @ Vicky Malhotra', 0.96, 'Mumbai Sessions Court (Cyber Division)', 'Linked to unauthorized SIM swapping gang'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'bank_account', 'A/C 91802004819201 (HDFC Bank)', 0.99, 'Bengaluru Police Central Crime Branch', 'Mule account used to route illicit fund transfers'),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'vehicle', 'DL 01 AB 8842 (White SUV)', 0.91, 'Noida Sector 62 Police Station', 'CCTV vehicle match logged during evidence seizure window')
on conflict do nothing;
