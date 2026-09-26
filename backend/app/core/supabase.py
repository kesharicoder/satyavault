from supabase import create_client, Client
from app.config import settings

def get_supabase_client() -> Client:
    """
    Creates and returns a Supabase client initialized with project credentials.
    """
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_ANON_KEY
    return create_client(url, key)

supabase: Client = get_supabase_client()
