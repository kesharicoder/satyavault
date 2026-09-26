import sys
import hashlib

def calculate_hash(filepath: str) -> str:
    digest = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python calculate_file_hash.py <path_to_file>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    sha256 = calculate_hash(file_path)
    print(f"File: {file_path}")
    print(f"SHA-256 Digest: {sha256}")
