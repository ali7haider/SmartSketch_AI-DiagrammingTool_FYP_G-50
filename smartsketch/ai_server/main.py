from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
import asyncio

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow requests from your frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load API key from environment variable
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_KEY = "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"
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
- Use the following JSON structure:
[
  {{
    "id": "class1",
    "x": 100,
    "y": 100,
    "width": 200,
    "height": 150,
    "className": "Person",
    "attributes": ["+ name: String", "+ age: Int"],
    "methods": ["+ greet(): void"]
  }},
  {{
    "id": "class2",
    "x": 400,
    "y": 100,
    "width": 200,
    "height": 150,
    "className": "Student",
    "attributes": ["+ studentId: String"],
    "methods": ["+ study(): void"]
  }},
  {{
    "id": "class3",
    "x": 400,
    "y": 300,
    "width": 200,
    "height": 150,
    "className": "Teacher",
    "attributes": ["+ employeeId: String"],
    "methods": ["+ teach(): void"]
  }},
  {{
    "type": "relationship",
    "from": "class1",
    "to": "class2",
    "relationshipType": "inheritance"
  }},
  {{
    "type": "relationship",
    "from": "class1",
    "to": "class3",
    "relationshipType": "inheritance"
  }}
]

ADDITIONAL RULES:
- Each class must have an `id`, `x`, `y`, `width`, `height`, `className`, `attributes`, and `methods`.
- Relationships must include `type`, `from`, `to`, and `relationshipType`.
- Do NOT include nodes or edges in the JSON.
- Ensure all relationships are valid and reference existing class IDs.

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
        "max_tokens": 3048
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
@app.api_route("/generate-diagram/", methods=["GET", "POST"])
async def generate_diagram(data: PromptRequest = None):
    if data is None:
        raise HTTPException(status_code=400, detail="Prompt is required.")

    print(f"Received prompt: {data.prompt}")
    diagram_json = await generate_valid_json(data.prompt)
    print(f"Generated JSON: {diagram_json}")
    return {"diagram_json": json.loads(diagram_json)}