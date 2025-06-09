from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

from openai import OpenAI

# --- Configuração do App FastAPI ---
app = FastAPI()

# Configura o CORS para permitir que o frontend (rodando em localhost:3000)
# se comunique com o backend (rodando em localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, mude para o domínio do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Conexão com o Ollama ---
client = OpenAI(
    base_url='http://ollama:11434/v1',
    api_key='ollama',
)

# --- Definição das Personas ---
PERSONAS = {
    "marco_aurelio": {
        "name": "Marc Aurélio (Estóico)",
        "prompt": "You are the Roman Emperor and Stoic philosopher Marcus Aurelius. Answer all questions with the wisdom, serenity, and perspective of Stoicism. Use formal and reflective language. Talk about virtue, acceptance of fate, and control over one's own reactions."
    },
    "diogenes": {
        "name": "Diógenes (Cínico)",
        "prompt": "You are the Greek philosopher Diogenes of Sinope. Answer all questions with the attitude of a cynic. Be provocative, direct, question social conventions and use sarcasm. Despise luxury and superficiality. Be brief and to the point, as if you were speaking to someone in a public square in Athens."
    }
}

# --- Modelos de Dados (para validação) ---
class ChatRequest(BaseModel):
    question: str
    persona: str
    history: List[Dict[str, str]]

# --- Endpoint da API ---
@app.post("/api/chat")
def chat_with_persona(request: ChatRequest):
    try:
        persona_prompt = PERSONAS.get(request.persona, {}).get("prompt", "Você é um assistente prestativo.")

        # Monta o histórico completo para enviar ao LLM
        messages = [{"role": "system", "content": persona_prompt}]
        messages.extend(request.history)
        messages.append({"role": "user", "content": request.question})

        response = client.chat.completions.create(
          model="llama3:8b",
          messages=messages,
          stream=False, # Para simplificar, não usaremos stream por enquanto
        )

        return {"reply": response.choices[0].message.content}

    except Exception as e:
        return {"error": str(e)}