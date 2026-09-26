import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    APP_NAME: str = "Satya Vault API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"

    SUPABASE_URL: str = "https://your-project.supabase.co"
    SUPABASE_ANON_KEY: str = "your-anon-key"
    SUPABASE_SERVICE_ROLE_KEY: str = "your-service-role-key"
    SUPABASE_JWT_SECRET: str = "your-jwt-secret"

    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/postgres"

    STORAGE_BUCKET_DOCUMENTS: str = "documents-private"
    STORAGE_BUCKET_EVIDENCE: str = "evidence-private"
    STORAGE_BUCKET_REPORTS: str = "reports-private"

    GEMINI_API_KEY: str = "mock-gemini-key"
    AI_PROVIDER: str = "gemini"
    OLLAMA_BASE_URL: str = "http://localhost:11434"

    MAX_UPLOAD_SIZE_MB: int = 50
    ALLOWED_MIME_TYPES: str = "application/pdf,image/jpeg,image/png,text/plain"
    SIGNED_URL_EXPIRY_SECONDS: int = 300

    AUDIT_HASH_SECRET: str = "development-only-secret"
    RATE_LIMIT_PER_MINUTE: int = 60

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
