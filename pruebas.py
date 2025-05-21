import requests

# Tu clave API (pruebas locales solamente)
API_KEY = "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"

# Modelo a probar (puedes cambiarlo a "mistralai/mixtral-8x7b-instruct", etc.)
MODEL = "qwen/qwen3-235b-a22b:free"

# Prompt de prueba
PROMPT = """
Quien es el presidente de los Estados Unidos?W
"""

# Preparar headers y payload
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": MODEL,
    "messages": [
        {"role": "system", "content": "Responde de manear clara y concisa."},
        {"role": "user", "content": PROMPT}
    ]
}

# Realizar la solicitud
try:
    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
    response.raise_for_status()
    result = response.json()
    print("✅ Respuesta de IA:\n")
    print(result["choices"][0]["message"]["content"])
except requests.exceptions.HTTPError as err:
    print(f"❌ Error HTTP {err.response.status_code}: {err.response.reason}")
    print(err.response.text)
except Exception as e:
    print(f"❌ Error general: {e}")
