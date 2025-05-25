from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from sympy import symbols, diff, latex
from sympy.parsing.latex import parse_latex
import requests
from dotenv import load_dotenv
import os

# ⚙️ Configuración básica
app = Flask(__name__, static_folder="dist", static_url_path="/")
CORS(app)

load_dotenv()
API_KEY = os.getenv("API_KEY")
MODEL = "meta-llama/llama-3.3-8b-instruct:free"

# 📘 Ruta de procesamiento de derivadas
@app.route("/resolver", methods=["POST"])
def resolver():
    formula_latex = request.json.get('formula')
    x, y, z = symbols('x y z')

    try:
        expr = parse_latex(formula_latex)
        dx_expr = diff(expr, x)
        dy_expr = diff(expr, y)
        dz_expr = diff(expr, z)

        derivadas = {
            'funcion': latex(expr),
            'dx': latex(dx_expr),
            'dy': latex(dy_expr),
            'dz': latex(dz_expr),
            'pasos': {}
        }

        terminos = expr.as_ordered_terms()
        for var in [x, y, z]:
            pasos = []
            for i, term in enumerate(terminos, 1):
                d_term = diff(term, var)
                if d_term != 0:
                    pasos.append({
                        "descripcion": f"Paso {i}: Derivada de {latex(term)} respecto a {latex(var)}",
                        "resultado": f"{latex(d_term)}"
                    })
            if pasos:
                pasos.append({
                    "descripcion": f"Paso final: Suma de derivadas respecto a {latex(var)}",
                    "resultado": f"{latex(diff(expr, var))}"
                })
            derivadas['pasos'][str(var)] = pasos

        prompt = f"""
Eres DeriBot y estas aquí para explicar el ejercicio paso a paso, se educado y presentate en cada promt de respuesta que te haga el usuario.
La respuesta debe estar detallada de inicio a fin, no tomes el camino corto, explica todo, piensa que son alumnos que recien empiezan, pero obvio no se lo digas a ellos, vos solo explica todo bien.
Por favor, si vas a poner una formula, pona en texto plano, el interpreter de latex no funciona asi que NO USES LATEX, DONT USE LATEX. Tampco uses Markdown, texto plano.

Función original:
f(x, y, z) = {latex(expr)}

Resultado de derivadas:
- ∂f/∂x = {latex(dx_expr)}
- ∂f/∂y = {latex(dy_expr)}
- ∂f/∂z = {latex(dz_expr)}

Explica con claridad y estructura paso a paso cada derivada parcial.
"""

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "Eres un profesor de cálculo que explica paso a paso con claridad."},
                {"role": "user", "content": prompt}
            ]
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        derivadas['explicacion_ia'] = result["choices"][0]["message"]["content"]

    except Exception as e:
        derivadas = {'error': f'Error al procesar fórmula: {e}'}

    return jsonify(derivadas)

# 🧾 Ruta para servir React + Vite
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# ▶️ Ejecutar el servidor
if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5000)
