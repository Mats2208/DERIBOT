import requests

# Tu clave API (pruebas locales solamente)
API_KEY = "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"

# Modelo a probar (puedes cambiarlo a "mistralai/mixtral-8x7b-instruct", etc.)
MODEL = "meta-llama/llama-3.3-8b-instruct:free"

# Prompt de prueba
PROMPT = """
Explica de forma sencilla qué es una derivada parcial y cómo se aplica sobre una función de varias variables.
Ejemplo: f(x, y, z) = x^2 * y + sin(x*z)
"""

# Preparar headers y payload
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": MODEL,
    "messages": [
        {"role": "system", "content": "Eres un profesor de cálculo que explica paso a paso con claridad."},
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
