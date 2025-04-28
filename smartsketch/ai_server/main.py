from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import json
import os
import asyncio

app = FastAPI()

# Load API key from environment variable
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
MODEL_NAME = "llama3-8b-8192"

# Define a prompt template for structured generation
PROMPT_TEMPLATE = """
You are a highly precise diagram generator AI.

Your task is to generate a VALID, well-formatted JSON representation of a diagram based on the user prompt.

RULES:
- Always output ONLY raw JSON. No explanations, no text outside the JSON.
- Do NOT include ```json blocks.
- Ensure proper closing brackets, valid JSON syntax.
- Follow standard JSON formatting (double quotes, commas, etc.).

Here is the user prompt:

{prompt}

Respond now with the JSON ONLY:
"""

# Define request body
class PromptRequest(BaseModel):
    prompt: str

# Function to call Groq API
async def call_groq_api(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL_NAME,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.2,
        "max_tokens": 2048
    }

    response = requests.post(GROQ_API_URL, headers=headers, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Groq API error: {response.text}")

    result = response.json()
    return result['choices'][0]['message']['content']

# Function to validate if the response is proper JSON
def is_valid_json(text: str) -> bool:
    try:
        json.loads(text)
        return True
    except json.JSONDecodeError:
        return False

# Retry logic if the model outputs invalid JSON
async def generate_valid_json(prompt: str, max_retries: int = 3) -> str:
    formatted_prompt = PROMPT_TEMPLATE.format(prompt=prompt)
    for attempt in range(max_retries):
        response_text = await call_groq_api(formatted_prompt)

        # Clean common mistakes (sometimes models add markdown block syntax)
        cleaned_response = response_text.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response.replace("```json", "").strip()
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3].strip()

        if is_valid_json(cleaned_response):
            return cleaned_response

        # Small delay before retrying
        await asyncio.sleep(1)

    raise HTTPException(status_code=500, detail="Failed to generate valid JSON after retries.")

# API endpoint
@app.post("/generate-diagram/")
async def generate_diagram(data: PromptRequest):
    diagram_json = await generate_valid_json(data.prompt)
    return {"diagram_json": json.loads(diagram_json)}
