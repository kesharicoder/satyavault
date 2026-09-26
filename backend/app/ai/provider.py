from abc import ABC, abstractmethod
from typing import Dict, Any, List

class AIProvider(ABC):
    @abstractmethod
    async def generate_response(self, prompt: str, context_chunks: List[Dict[str, Any]]) -> str:
        pass

    @abstractmethod
    async def generate_embeddings(self, text: str) -> List[float]:
        pass
