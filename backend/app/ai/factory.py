from app.ai.provider import AIProvider
from app.ai.gemini_provider import GeminiProvider
from app.ai.ollama_provider import OllamaProvider

ACTIVE_AI_PROVIDER_NAME = "gemini"

def get_active_provider_name() -> str:
    global ACTIVE_AI_PROVIDER_NAME
    return ACTIVE_AI_PROVIDER_NAME

def set_active_provider_name(provider_name: str) -> str:
    global ACTIVE_AI_PROVIDER_NAME
    if provider_name.lower() in ["gemini", "ollama"]:
        ACTIVE_AI_PROVIDER_NAME = provider_name.lower()
    return ACTIVE_AI_PROVIDER_NAME

def get_ai_provider() -> AIProvider:
    global ACTIVE_AI_PROVIDER_NAME
    if ACTIVE_AI_PROVIDER_NAME == "ollama":
        return OllamaProvider()
    return GeminiProvider()
