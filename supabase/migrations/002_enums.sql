-- Migration 002: Core Enums
create type public.app_role as enum (
  'investigator',
  'custody_officer',
  'forensic_officer',
  'prosecutor',
  'court_officer',
  'security_auditor',
  'administrator'
);

create type public.case_status as enum (
  'draft',
  'open',
  'investigation',
  'forensic_review',
  'legal_review',
  'court_submission',
  'closed',
  'archived'
);

create type public.document_status as enum (
  'active',
  'superseded',
  'archived',
  'deleted'
);

create type public.processing_status as enum (
  'queued',
  'processing',
  'completed',
  'failed'
);

create type public.integrity_result as enum (
  'verified',
  'mismatch',
  'not_checked',
  'error'
);
