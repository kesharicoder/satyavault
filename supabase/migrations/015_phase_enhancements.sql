-- Migration 015: Phase 1, 2, and 3 Enhancements (BSA 2023, Two-Person Custody, AI Entity Matching, RLS)

-- -----------------------------------------------------------------------------
-- 1. Phase 1: Section 65B / BSA 2023 Digital Evidence Certificates & Watermarking
-- -----------------------------------------------------------------------------
ALTER TABLE public.evidence 
ADD COLUMN IF NOT EXISTS bsa_certificate_issued BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS bsa_certificate_hash TEXT,
ADD COLUMN IF NOT EXISTS bsa_qr_verification_token TEXT,
ADD COLUMN IF NOT EXISTS watermarked_copy_path TEXT;

ALTER TABLE public.documents 
ADD COLUMN IF NOT EXISTS watermarked_copy_path TEXT,
ADD COLUMN IF NOT EXISTS watermarked_at TIMESTAMPTZ;

-- -----------------------------------------------------------------------------
-- 2. Phase 3: Multi-Officer Two-Person Rule Custody Transfer Workflow
-- -----------------------------------------------------------------------------
ALTER TABLE public.custody_events 
ADD COLUMN IF NOT EXISTS transfer_status TEXT DEFAULT 'completed', -- 'pending_receiver_approval', 'completed', 'rejected'
ADD COLUMN IF NOT EXISTS releasing_officer_signature TEXT,
ADD COLUMN IF NOT EXISTS receiving_officer_signature TEXT,
ADD COLUMN IF NOT EXISTS receiver_action_timestamp TIMESTAMPTZ;

-- -----------------------------------------------------------------------------
-- 3. Phase 2: Cross-Jurisdiction AI Entity Matching Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.case_entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id UUID REFERENCES public.cases(id) ON DELETE CASCADE,
    entity_type TEXT NOT NULL, -- 'suspect', 'bank_account', 'vehicle', 'phone', 'upi_id'
    entity_value TEXT NOT NULL,
    confidence_score FLOAT DEFAULT 1.0,
    matched_case_id UUID REFERENCES public.cases(id) ON DELETE SET NULL,
    matched_jurisdiction TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for instant entity lookup across jurisdictions
CREATE INDEX IF NOT EXISTS idx_case_entities_value ON public.case_entities(entity_value);
CREATE INDEX IF NOT EXISTS idx_case_entities_type ON public.case_entities(entity_type);

-- Enable Row Level Security on case_entities
ALTER TABLE public.case_entities ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 4. RLS Policies for New Features
-- -----------------------------------------------------------------------------

-- Users can view case entities if they have access to the primary case or matched case
CREATE POLICY "authorized users can view case entities"
ON public.case_entities FOR SELECT TO authenticated
USING (
    public.can_access_case(case_id) 
    OR public.current_user_has_role('administrator') 
    OR public.current_user_has_role('security_auditor')
);

-- Authorized investigators & forensic officers can insert extracted entities
CREATE POLICY "investigators and forensic officers can insert entities"
ON public.case_entities FOR INSERT TO authenticated
WITH CHECK (
    public.can_access_case(case_id) 
    AND (
        public.current_user_has_role('investigator') 
        OR public.current_user_has_role('forensic_officer') 
        OR public.current_user_has_role('administrator')
    )
);

-- Two-Person Rule Custody Transfer update policy
CREATE POLICY "custody officers can update custody transfer signatures"
ON public.custody_events FOR UPDATE TO authenticated
USING (
    public.current_user_has_role('custody_officer') 
    OR public.current_user_has_role('forensic_officer') 
    OR public.current_user_has_role('administrator')
)
WITH CHECK (
    public.current_user_has_role('custody_officer') 
    OR public.current_user_has_role('forensic_officer') 
    OR public.current_user_has_role('administrator')
);
