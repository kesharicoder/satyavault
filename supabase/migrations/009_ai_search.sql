-- Migration 009: AI Vector Chunks and Search Index
create table public.document_chunks (
  id uuid primary key default gen_random_uuid(),
  document_version_id uuid not null references public.document_versions(id) on delete restrict,
  page_number integer,
  section_name text,
  content text not null,
  embedding vector(768),
  created_at timestamptz not null default now()
);

create index document_chunks_embedding_idx
on public.document_chunks
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
