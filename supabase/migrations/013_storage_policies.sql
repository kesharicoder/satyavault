-- Migration 013: Storage Policies for Private Buckets

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('documents-private', 'documents-private', false, 52428800, array['application/pdf', 'image/jpeg', 'image/png', 'text/plain']),
  ('evidence-private', 'evidence-private', false, 52428800, array['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/octet-stream']),
  ('reports-private', 'reports-private', false, 52428800, array['application/pdf'])
on conflict (id) do update set
  public = false,
  file_size_limit = EXCLUDED.file_size_limit;

create policy "authenticated users access documents storage"
on storage.objects for select to authenticated
using (bucket_id in ('documents-private', 'evidence-private', 'reports-private'));

create policy "authenticated users insert documents storage"
on storage.objects for insert to authenticated
with check (bucket_id in ('documents-private', 'evidence-private', 'reports-private'));
