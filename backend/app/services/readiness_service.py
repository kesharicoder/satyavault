from typing import Dict, Any, List

def calculate_case_readiness(case_id: str, case_data: Dict[str, Any], documents: List[Dict], evidence: List[Dict], custody_logs: List[Dict]) -> Dict[str, Any]:
    checks = []

    # Check 1: Required initial FIR/Charge sheet present
    has_fir = any(doc.get("document_type") in ["FIR", "Charge Sheet", "Initial Report"] for doc in documents)
    checks.append({
        "rule_name": "Primary Document Registration",
        "passed": has_fir,
        "reason": "Case has registered primary document" if has_fir else "Missing primary FIR / Charge Sheet document",
        "responsible_role": "investigator",
        "recommended_action": "Upload signed FIR / Complaint copy"
    })

    # Check 2: Binary SHA-256 verification
    unverified_docs = [doc for doc in documents if doc.get("sha256_hash") is None]
    has_hash_verified = len(unverified_docs) == 0
    checks.append({
        "rule_name": "Binary Hash Integrity Verification",
        "passed": has_hash_verified,
        "reason": "All uploaded document versions have registered SHA-256 hashes" if has_hash_verified else f"{len(unverified_docs)} document(s) missing reference checksum",
        "responsible_role": "forensic_officer",
        "recommended_action": "Re-run automated file checksum generator"
    })

    # Check 3: Chain of Custody completeness
    has_custody = len(evidence) == 0 or len(custody_logs) > 0
    checks.append({
        "rule_name": "Chain of Custody Event Verification",
        "passed": has_custody,
        "reason": "Evidence transfer logs recorded" if has_custody else "Evidence registered without chain-of-custody transfer log",
        "responsible_role": "custody_officer",
        "recommended_action": "Record custody acceptance receipt"
    })

    all_passed = all(c["passed"] for c in checks)
    passed_count = sum(1 for c in checks if c["passed"])
    score = int((passed_count / len(checks)) * 100) if checks else 0

    return {
        "case_id": case_id,
        "status": "READY" if all_passed else "ACTION_REQUIRED",
        "score_percentage": score,
        "checks": checks
    }
