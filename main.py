from flask import Flask, request, render_template
from sympy import symbols, diff, latex
from sympy.parsing.latex import parse_latex
import requests

app = Flask(__name__)

# ✅ Clave API válida de OpenRouter (solo para pruebas locales)
API_KEY = "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"

# ✅ Modelo que ya funciona comprobado en pruebas
MODEL = "meta-llama/llama-3.3-8b-instruct:free"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/resolver', methods=['POST'])
def resolver():
    formula_latex = request.form['formula']
    x, y, z = symbols('x y z')

    try:
        # Parsear fórmula de entrada
        expr = parse_latex(formula_latex)

        # Derivadas parciales
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

        # Generar pasos intermedios para cada variable
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

        # 🔎 Prompt para la IA
        prompt = f"""
Explica paso a paso cómo resolver derivadas parciales de la siguiente función:

Función original:
f(x, y, z) = {latex(expr)}

Resultado ∂f/∂x = {latex(dx_expr)}
Resultado ∂f/∂y = {latex(dy_expr)}
Resultado ∂f/∂z = {latex(dz_expr)}

Explica con detalle cada paso, no es necesario tu presentacion ni agradecimientos. Solo di que eres DeriBot y que estas aqui para explicar el ejercicio paso a paso y luego procede a explicar
"""

        # 🔗 Preparar headers y payload
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

        # 📡 Enviar petición a OpenRouter
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()

        # ✅ Agregar explicación generada por IA
        derivadas['explicacion_ia'] = result["choices"][0]["message"]["content"]

    except Exception as e:
        derivadas = {'error': f'Error al procesar fórmula: {e}'}

    return render_template('resultado.html', **derivadas)

if __name__ == '__main__':
    app.run(debug=True)
