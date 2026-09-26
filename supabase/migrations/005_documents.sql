-- Migration 005: Documents and Versions
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references public.cases(id) on delete restrict,
  document_number text unique not null,
  title text not null,
  document_type text not null,
  classification text not null default 'restricted',
  current_version_id uuid,
  status public.document_status not null default 'active',
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete restrict,
  version_number integer not null,
  storage_bucket text not null,
  storage_path text not null,
  original_filename text not null,
  mime_type text not null,
  file_size_bytes bigint not null,
  sha256_hash text not null,
  uploaded_by uuid not null references public.profiles(id),
  change_reason text,
  ocr_status public.processing_status not null default 'queued',
  ai_status public.processing_status not null default 'queued',
  created_at timestamptz not null default now(),
  unique(document_id, version_number)
);

alter table public.documents
  add constraint fk_documents_current_version
  foreign key (current_version_id)
  references public.document_versions(id)
  on delete set null;
