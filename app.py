from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS
from sympy import symbols, diff, latex, sympify, Add, Mul, Pow, Function as SympyFunction
from sympy.parsing.latex import parse_latex
from itertools import product
import requests
from dotenv import load_dotenv
import os
import traceback

# ⚙️ Configuración básica
app = Flask(__name__, static_folder="dist", static_url_path="/")
CORS(app)

load_dotenv()
API_KEY = os.getenv("API_KEY")
MODEL = "meta-llama/llama-3.3-8b-instruct:free"

def safe_latex(expr):
    """Convierte expresión a LaTeX de forma segura"""
    try:
        if expr == 0:
            return "0"
        return latex(expr)
    except Exception as e:
        return str(expr)

def parse_formula_safe(formula_latex):
    """Parsea fórmula LaTeX de forma segura con múltiples métodos"""
    try:
        # Método 1: parse_latex directo
        return parse_latex(formula_latex)
    except:
        try:
            # Método 2: sympify como fallback
            # Limpiar algunos caracteres comunes de LaTeX
            cleaned = formula_latex.replace('\\', '').replace('{', '').replace('}', '')
            cleaned = cleaned.replace('sin', 'sin').replace('cos', 'cos').replace('ln', 'log')
            return sympify(cleaned)
        except:
            # Método 3: Último recurso - expresión simple
            x, y, z = symbols('x y z')
            return x**2 + y**2 + z**2  # Función por defecto

def get_ia_explicacion(expr, variable):
    prompt = f"""
La expresión es: f(x,y,z) = {safe_latex(expr)}.
El estudiante ingresó una derivada incorrecta respecto a {variable}.

Explica paso a paso cómo derivar esta expresión respecto a {variable}.
Incluye las reglas aplicadas y los pasos intermedios. Usa LaTeX para las fórmulas.
"""

    if not API_KEY:
        return "API key no configurada."
    
    try:
        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": MODEL,
            "messages": [
                {"role": "system", "content": "Eres un profesor de cálculo experto en explicar derivadas paso a paso usando LaTeX."},
                {"role": "user", "content": prompt}
            ],
            "max_tokens": 1500,
            "temperature": 0.7
        }
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()["choices"][0]["message"]["content"]
        return "Explicación de IA no disponible en este momento."
    except Exception as e:
        return f"Error generando explicación IA: {str(e)}"

def get_derivative_steps(expr, variable, orden=1):
    """Genera pasos detallados para la derivación de una expresión"""
    pasos = []
    
    # Paso 1: Mostrar la expresión original
    if orden == 1:
        pasos.append({
            "tipo": "original",
            "orden": orden,
            "descripcion": f"Expresión original a derivar respecto a {variable}",
            "expresion": safe_latex(expr),
            "resultado": safe_latex(expr)
        })
    else:
        pasos.append({
            "tipo": "original",
            "orden": orden,
            "descripcion": f"Derivada de orden {orden-1} a derivar nuevamente respecto a {variable}",
            "expresion": safe_latex(expr),
            "resultado": safe_latex(expr)
        })
    
    # Verificar si la expresión es una suma de términos
    if isinstance(expr, Add):
        # Paso 2: Identificar términos
        terminos = expr.args
        pasos.append({
            "tipo": "descomposicion",
            "orden": orden,
            "descripcion": f"Descomponer en {len(terminos)} términos y aplicar la regla de la suma",
            "expresion": " + ".join([f"({safe_latex(term)})" for term in terminos]),
            "resultado": f"\\frac{{\\partial^{orden}}}{{\\partial {variable}^{orden}}}\\left[{' + '.join([safe_latex(term) for term in terminos])}\\right]"
        })
        
        # Paso 3: Derivar cada término individualmente
        terminos_derivados = []
        for i, termino in enumerate(terminos):
            derivada_termino = diff(termino, variable)
            terminos_derivados.append(derivada_termino)
            
            # Explicar la derivación de cada término
            if derivada_termino != 0:
                pasos.append({
                    "tipo": "termino",
                    "orden": orden,
                    "descripcion": f"Derivar término {i+1}: {safe_latex(termino)}",
                    "expresion": f"\\frac{{\\partial^{orden}}}{{\\partial {variable}^{orden}}}\\left({safe_latex(termino)}\\right)",
                    "resultado": safe_latex(derivada_termino),
                    "regla": get_derivative_rule(termino, variable, orden)
                })
            else:
                pasos.append({
                    "tipo": "termino",
                    "orden": orden,
                    "descripcion": f"Derivar término {i+1}: {safe_latex(termino)}",
                    "expresion": f"\\frac{{\\partial^{orden}}}{{\\partial {variable}^{orden}}}\\left({safe_latex(termino)}\\right)",
                    "resultado": "0",
                    "regla": f"Constante respecto a {variable}"
                })
        
        # Paso 4: Combinar resultados
        resultado_final = diff(expr, variable)
        if len([t for t in terminos_derivados if t != 0]) > 1:
            pasos.append({
                "tipo": "combinacion",
                "orden": orden,
                "descripcion": "Combinar los resultados de todos los términos",
                "expresion": " + ".join([safe_latex(t) for t in terminos_derivados if t != 0]),
                "resultado": safe_latex(resultado_final)
            })
    
    else:
        # Para expresiones que no son sumas, mostrar la derivación directa
        resultado = diff(expr, variable)
        pasos.append({
            "tipo": "directo",
            "orden": orden,
            "descripcion": f"Aplicar regla de derivación de orden {orden}",
            "expresion": f"\\frac{{\\partial^{orden}}}{{\\partial {variable}^{orden}}}\\left({safe_latex(expr)}\\right)",
            "resultado": safe_latex(resultado),
            "regla": get_derivative_rule(expr, variable, orden)
        })
    
    # Paso final: Resultado
    resultado_final = diff(expr, variable)
    pasos.append({
        "tipo": "final",
        "orden": orden,
        "descripcion": f"Resultado final de orden {orden}",
        "expresion": f"\\frac{{\\partial^{orden} f}}{{\\partial {variable}^{orden}}}",
        "resultado": safe_latex(resultado_final)
    })
    
    return pasos

def get_derivative_rule(expr, variable, orden=1):
    """Identifica qué regla de derivación se aplica"""
    var_symbol = symbols(str(variable))
    
    if not expr.has(var_symbol):
        return "Regla de la constante: la derivada de una constante es 0"
    
    if expr == var_symbol:
        if orden == 1:
            return "Regla básica: d/dx(x) = 1"
        else:
            return f"Derivada de orden {orden}: d^{orden}/dx^{orden}(x) = 0 (para orden > 1)"
    
    if isinstance(expr, Pow):
        base, exp = expr.args
        if base == var_symbol and exp.is_number:
            if orden == 1:
                return f"Regla de la potencia: d/dx(x^n) = n·x^(n-1)"
            else:
                return f"Regla de la potencia de orden {orden}: aplicar {orden} veces"
        elif base.is_number and exp.has(var_symbol):
            return f"Regla exponencial de orden {orden}: d^{orden}/dx^{orden}(a^u)"
    
    if isinstance(expr, Mul):
        return f"Regla del producto de orden {orden}: aplicar fórmula de Leibniz"
    
    if str(expr).startswith('sin'):
        return f"Regla trigonométrica de orden {orden}: d^{orden}/dx^{orden}(sin(u))"
    elif str(expr).startswith('cos'):
        return f"Regla trigonométrica de orden {orden}: d^{orden}/dx^{orden}(cos(u))"
    elif str(expr).startswith('log'):
        return f"Regla logarítmica de orden {orden}: d^{orden}/dx^{orden}(ln(u))"
    
    return f"Regla de la cadena de orden {orden} aplicada"

@app.route("/resolver", methods=["POST"])
def resolver():
    try:
        data = request.json
        formula_latex = data.get('formula', 'x^2 + y^2 + z^2')
        orden_max = int(data.get('orden', 1))

        # Definir variables
        x, y, z = symbols('x y z')
        variables = [x, y, z]
        var_names = ['x', 'y', 'z']

        # Parsear la expresión
        expr = parse_formula_safe(formula_latex)
        
        # Calcular derivadas de primer orden
        dx_expr = diff(expr, x)
        dy_expr = diff(expr, y)
        dz_expr = diff(expr, z)

        # Estructura de respuesta
        derivadas = {
            'funcion': safe_latex(expr),
            'dx': safe_latex(dx_expr),
            'dy': safe_latex(dy_expr),
            'dz': safe_latex(dz_expr),
            'pasos': {
                'x': [],
                'y': [],
                'z': []
            },
            'derivadas_superiores': {}
        }

        # Generar pasos detallados para derivadas de primer orden
        for var, var_name in zip(variables, var_names):
            if expr.has(var):  # Solo si la función depende de esta variable
                pasos_detallados = get_derivative_steps(expr, var, orden=1)
                derivadas['pasos'][var_name] = pasos_detallados
            else:
                # Si la función no depende de la variable
                derivadas['pasos'][var_name] = [{
                    "tipo": "constante",
                    "orden": 1,
                    "descripcion": f"La función no depende de {var_name}",
                    "expresion": safe_latex(expr),
                    "resultado": "0",
                    "regla": f"Constante respecto a {var_name}"
                }]

        # ===== LÓGICA ORIGINAL DE DERIVADAS SUPERIORES =====
        resultado_texto = f"""
Función original: f(x,y,z) = {safe_latex(expr)}

Derivadas parciales de primer orden:
- ∂f/∂x = {safe_latex(dx_expr)}
- ∂f/∂y = {safe_latex(dy_expr)}  
- ∂f/∂z = {safe_latex(dz_expr)}
"""

        # Todas las combinaciones posibles de derivadas hasta orden N
        for orden in range(1, orden_max + 1):
            for combinacion in product(variables, repeat=orden):
                derivada_expr = diff(expr, *combinacion)
                if derivada_expr == 0:
                    continue  # ignorar derivadas que resultan cero

                # Crear clave única para la combinación
                combinacion_str = ''.join([str(v) for v in combinacion])
                orden_str = f"d^{orden}f/d" + ''.join([str(v) for v in combinacion])

                # Guardar en derivadas superiores
                if orden > 1:
                    if orden not in derivadas['derivadas_superiores']:
                        derivadas['derivadas_superiores'][orden] = []
                    
                    derivadas['derivadas_superiores'][orden].append({
                        "combinacion": combinacion_str,
                        "variables": [str(v) for v in combinacion],
                        "orden": orden,
                        "descripcion": f"Derivada de orden {orden} respecto a {', '.join([str(v) for v in combinacion])}",
                        "notacion": orden_str,
                        "resultado": safe_latex(derivada_expr),
                        "pasos": get_derivative_steps(diff(expr, *combinacion[:-1]), combinacion[-1], orden) if orden > 1 else []
                    })

                resultado_texto += f"- {orden_str}: {safe_latex(derivada_expr)}\n"

        # Generar explicación con IA
        try:
            prompt = f"""
Eres DeriBot, un asistente educativo especializado en cálculo diferencial. 

{resultado_texto}
Eres DerivaBot y estas aquí para explicar el ejercicio paso a paso, se educado y presentate en cada promt de respuesta que te haga el usuario.
La respuesta debe estar detallada de inicio a fin, no tomes el camino corto, explica todo, piensa que son alumnos que recien empiezan, pero obvio no se lo digas a ellos, vos solo explica todo bien.
Por favor, si vas a poner una formula, pona en texto plano, el interpreter de latex no funciona asi que NO USES LATEX, DONT USE LATEX. Tampco uses Markdown, texto plano.Ejemplo: "La derivada $\\frac{{\\partial f}}{{\\partial x}}$ representa la tasa de cambio..."
"""

            if API_KEY:
                headers = {
                    "Authorization": f"Bearer {API_KEY}",
                    "Content-Type": "application/json"
                }

                payload = {
                    "model": MODEL,
                    "messages": [
                        {"role": "system", "content": "Eres un profesor de cálculo que explica conceptos de manera clara usando LaTeX cuando sea necesario."},
                        {"role": "user", "content": prompt}
                    ],
                    "max_tokens": 2000,
                    "temperature": 0.7
                }

                response = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions", 
                    headers=headers, 
                    json=payload,
                    timeout=30
                )
                
                if response.status_code == 200:
                    result = response.json()
                    derivadas['explicacion_ia'] = result["choices"][0]["message"]["content"]
                else:
                    derivadas['explicacion_ia'] = "Explicación de IA no disponible en este momento."
            else:
                derivadas['explicacion_ia'] = "API key no configurada para explicaciones de IA."
                
        except Exception as e:
            derivadas['explicacion_ia'] = f"Error al generar explicación: {str(e)}"

    except Exception as e:
        print(f"Error en resolver: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            'error': f'Error al procesar la fórmula: {str(e)}',
            'details': 'Verifica que la sintaxis LaTeX sea correcta'
        }), 400

    return jsonify(derivadas)

def comparar_respuestas(respuesta_usuario, derivada_correcta):
    try:
        expr_usuario = parse_formula_safe(respuesta_usuario)
        return expr_usuario.equals(derivada_correcta)
    except:
        return False




@app.route("/solverTutorInit", methods=["POST"])
def solver_tutor_init():
    try:
        data = request.json
        formula_latex = data.get('formula', '')
        x, y, z = symbols('x y z')
        expr = parse_formula_safe(formula_latex)

        return jsonify({
            'funcion': safe_latex(expr),
            'dx': safe_latex(diff(expr, x)),
            'dy': safe_latex(diff(expr, y)),
            'dz': safe_latex(diff(expr, z))
        })
    except Exception as e:
        return jsonify({'error': f'Error en /solverTutorInit: {str(e)}', 'details': traceback.format_exc()}), 500


@app.route("/solverTutorCheck", methods=["POST"])
def solver_tutor_check():
    try:
        data = request.json
        formula_latex = data.get('formula', '')
        dy_usuario = data.get('dy', '')
        dz_usuario = data.get('dz', '')

        x, y, z = symbols('x y z')
        expr = parse_formula_safe(formula_latex)

        derivada_y = diff(expr, y)
        derivada_z = diff(expr, z)

        resultado = {
            'dy_correcta': safe_latex(derivada_y),
            'dz_correcta': safe_latex(derivada_z),
            'verificacion': {
                'dy': comparar_respuestas(dy_usuario, derivada_y),
                'dz': comparar_respuestas(dz_usuario, derivada_z),
            },
            'retroalimentacion': {}
        }

        if not resultado['verificacion']['dy']:
            resultado['retroalimentacion']['dy'] = get_ia_explicacion(expr, 'y')
        if not resultado['verificacion']['dz']:
            resultado['retroalimentacion']['dz'] = get_ia_explicacion(expr, 'z')

        return jsonify(resultado)
    except Exception as e:
        return jsonify({'error': f'Error en /solverTutorCheck: {str(e)}', 'details': traceback.format_exc()}), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Endpoint para verificar que el servidor está funcionando"""
    return jsonify({
        'status': 'ok',
        'message': 'Servidor Flask funcionando correctamente'
    })

# 🧾 Servir la app React/Vite
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    try:
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')
    except Exception as e:
        return jsonify({'error': f'Error serving file: {str(e)}'}), 404

# 🔗 Proxy para Google Apps Script (eliminando dependencia de CORS Anywhere)
@app.route("/proxy/gas", methods=["GET", "POST"])
def proxy_gas():
    """Proxy para Google Apps Script para evitar problemas de CORS"""
    gas_url = "https://script.google.com/macros/s/AKfycbwC08xe9FjuHrxQ8-AHOouT8Q5kLUM1f226unvLo9gkJNfywJg7Oy6fuzspGXB5cq9rVQ/exec"
    
    try:
        if request.method == "GET":
            # Para obtener datos (ranking)
            response = requests.get(gas_url, timeout=10)
        elif request.method == "POST":
            # Para enviar datos (guardar en ranking)
            data = request.get_json()
            response = requests.post(
                gas_url,
                json=data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
        
        # Retornar la respuesta del Google Apps Script
        return jsonify(response.json()), response.status_code
        
    except requests.exceptions.Timeout:
        return jsonify({"error": "Timeout al conectar con Google Sheets"}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error de conexión: {str(e)}"}), 502
    except Exception as e:
        return jsonify({"error": f"Error del servidor: {str(e)}"}), 500

# ▶️ Ejecutar
if __name__ == "__main__":
    print("🚀 Iniciando servidor Flask...")
    print("📡 Endpoints disponibles:")
    print("   - POST /resolver - Calcular derivadas")
    print("   - GET /health - Estado del servidor")
    app.run(debug=False, host="0.0.0.0", port=5000)