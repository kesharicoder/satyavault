import hashlib
from typing import BinaryIO

CHUNK_SIZE = 1024 * 1024

def calculate_sha256_from_bytes(content: bytes) -> str:
    """Calculates hex SHA-256 digest from raw byte array."""
    digest = hashlib.sha256()
    digest.update(content)
    return digest.hexdigest()

def calculate_sha256_from_stream(stream: BinaryIO) -> str:
    """Calculates hex SHA-256 digest from stream chunks."""
    digest = hashlib.sha256()
    while chunk := stream.read(CHUNK_SIZE):
        digest.update(chunk)
    return digest.hexdigest()

def verify_sha256(content: bytes, expected_hash: str) -> bool:
    actual_hash = calculate_sha256_from_bytes(content)
    return actual_hash.lower() == expected_hash.lower()
