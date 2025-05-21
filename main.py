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
Eres DeriBot y estas aquí para explicar el ejercicio paso a paso. 
Por favor, si vas a poner una formula, pona en texto plano, el interpreter de latex no funciona asi que NO USES LATEX, DONT USE LATEX. Tampco uses Markdown, texto plano.
No respondas con $$ ni nada asi:
Ejemplo: $$ \\frac{{\\partial f}}{{\\partial x}} = 2xy $$

Función original:
$$f(x, y, z) = {latex(expr)}$$

Resultado de derivadas:
- $$\\frac{{\\partial f}}{{\\partial x}} = {latex(dx_expr)}$$
- $$\\frac{{\\partial f}}{{\\partial y}} = {latex(dy_expr)}$$
- $$\\frac{{\\partial f}}{{\\partial z}} = {latex(dz_expr)}$$

Explica con claridad y estructura paso a paso cada derivada parcial.
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
