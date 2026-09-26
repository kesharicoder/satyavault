import pytest
from app.services.hash_service import calculate_sha256_from_bytes, verify_sha256

def test_calculate_sha256_reproducibility():
    sample_data = b"SATYA_VAULT_SYNTHETIC_EVIDENCE_BYTES_12345"
    hash1 = calculate_sha256_from_bytes(sample_data)
    hash2 = calculate_sha256_from_bytes(sample_data)
    
    assert hash1 == hash2
    assert len(hash1) == 64

def test_verify_sha256_matching():
    sample_data = b"CONFIDENTIAL_CASE_RECORD"
    expected_hash = calculate_sha256_from_bytes(sample_data)
    
    assert verify_sha256(sample_data, expected_hash) is True
    assert verify_sha256(sample_data, "0" * 64) is False
