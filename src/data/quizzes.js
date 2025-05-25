const quizzes = {
  simple: [
    {
      title: "Derivadas Básicas I",
      timePerQuestion: 7,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = x²?", options: ["2x", "x", "x²", "2"], correctAnswer: 0, explanation: "Regla de potencias: n·xⁿ⁻¹. Para x², n=2: 2x." },
        { question: "¿Cuál es la derivada de f(x) = 5?", options: ["5", "0", "1", "x"], correctAnswer: 1, explanation: "La derivada de una constante es 0." },
        { question: "¿Cuál es la derivada de f(x) = 3x + 2?", options: ["3", "2", "x", "0"], correctAnswer: 0, explanation: "3x → 3 y 2 → 0." },
        { question: "¿Cuál es la derivada de f(x) = x³?", options: ["3x²", "x³", "2x", "x²"], correctAnswer: 0, explanation: "Potencias: d/dx(x³) = 3x²." },
        { question: "¿Cuál es la derivada de f(x) = √x?", options: ["1/(2√x)", "2x", "x", "√x"], correctAnswer: 0, explanation: "Regla: (1/2)x^(-1/2)." },
        { question: "¿Cuál es la derivada de f(x) = ln(x)?", options: ["x", "1/x", "ln(x)", "0"], correctAnswer: 1, explanation: "La derivada de ln(x) es 1/x." },
        { question: "¿Cuál es la derivada de f(x) = eˣ?", options: ["eˣ", "x", "1", "ln(x)"], correctAnswer: 0, explanation: "La derivada de eˣ es eˣ." },
        { question: "¿Cuál es la derivada de f(x) = sen(x)?", options: ["cos(x)", "-cos(x)", "sen(x)", "tan(x)"], correctAnswer: 0, explanation: "d/dx(sen(x)) = cos(x)." },
        { question: "¿Cuál es la derivada de f(x) = cos(x)?", options: ["-sen(x)", "sen(x)", "-cos(x)", "cos(x)"], correctAnswer: 0, explanation: "d/dx(cos(x)) = -sen(x)." },
        { question: "¿Cuál es la derivada de f(x) = tan(x)?", options: ["sec²(x)", "cos²(x)", "cot(x)", "sen(x)"], correctAnswer: 0, explanation: "d/dx(tan(x)) = sec²(x)." }
      ]
    },
    {
      title: "Derivadas Básicas II",
      timePerQuestion: 7,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = 1/x²?", options: ["-2/x³", "2/x", "-1/x", "x³"], correctAnswer: 0, explanation: "Regla de potencias: -2x⁻³ = -2/x³" },
        { question: "¿Cuál es la derivada de f(x) = 4x⁵?", options: ["20x⁴", "5x⁴", "4x⁴", "20x³"], correctAnswer: 0, explanation: "4*5x⁴ = 20x⁴" },
        { question: "¿Cuál es la derivada de f(x) = -2x⁴?", options: ["-8x³", "-6x³", "8x³", "-2x³"], correctAnswer: 0, explanation: "-2*4x³ = -8x³" },
        { question: "¿Cuál es la derivada de f(x) = x² + 3x?", options: ["2x + 3", "2x", "x + 3", "2x³ + 3"], correctAnswer: 0, explanation: "Derivada término a término" },
        { question: "¿Cuál es la derivada de f(x) = 2/x³?", options: ["-6/x⁴", "6/x²", "-2/x²", "-3/x²"], correctAnswer: 0, explanation: "2*(-3)x⁻⁴ = -6/x⁴" },
        { question: "¿Cuál es la derivada de f(x) = 5x?", options: ["5", "5x", "0", "x"], correctAnswer: 0, explanation: "Derivada de ax = a" },
        { question: "¿Cuál es la derivada de f(x) = x¹⁰?", options: ["10x⁹", "9x¹⁰", "10x¹¹", "x⁹"], correctAnswer: 0, explanation: "Regla de potencias" },
        { question: "¿Cuál es la derivada de f(x) = -x³?", options: ["-3x²", "3x²", "-3x", "-x²"], correctAnswer: 0, explanation: "Regla de potencias con signo" },
        { question: "¿Cuál es la derivada de f(x) = 0.5x⁶?", options: ["3x⁵", "6x⁵", "0.5x⁵", "3x⁶"], correctAnswer: 0, explanation: "0.5*6x⁵ = 3x⁵" },
        { question: "¿Cuál es la derivada de f(x) = 3?", options: ["0", "3", "3x", "1"], correctAnswer: 0, explanation: "Derivada de constante" }
      ]
    },
    {
      title: "Derivadas Básicas III",
      timePerQuestion: 7,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = 3x² - 2x + 5?", options: ["6x - 2", "6x + 2", "3x - 2", "6x² - 2"], correctAnswer: 0, explanation: "Derivada término a término" },
        { question: "¿Cuál es la derivada de f(x) = x⁴ + x³ + x²?", options: ["4x³ + 3x² + 2x", "4x³ + 2x² + x", "x³ + x² + x", "3x³ + 3x² + 2x"], correctAnswer: 0, explanation: "Aplicar regla de potencias a cada término" },
        { question: "¿Cuál es la derivada de f(x) = 2x⁵ - 4x³ + 6x?", options: ["10x⁴ - 12x² + 6", "10x⁴ - 12x²", "8x⁴ - 12x² + 6", "5x⁴ - 3x² + 6"], correctAnswer: 0, explanation: "Derivar cada término individualmente" },
        { question: "¿Cuál es la derivada de f(x) = (1/2)x⁶?", options: ["3x⁵", "6x⁵", "x⁵", "(1/2)x⁵"], correctAnswer: 0, explanation: "(1/2)*6x⁵ = 3x⁵" },
        { question: "¿Cuál es la derivada de f(x) = -3x² + 5x - 7?", options: ["-6x + 5", "-6x - 5", "6x + 5", "-3x + 5"], correctAnswer: 0, explanation: "Derivar cada término" },
        { question: "¿Cuál es la derivada de f(x) = 4x³ + 2x²?", options: ["12x² + 4x", "12x² + 2x", "4x² + 4x", "6x² + 4x"], correctAnswer: 0, explanation: "Aplicar regla de potencias" },
        { question: "¿Cuál es la derivada de f(x) = x⁷ - x⁵ + 3?", options: ["7x⁶ - 5x⁴", "7x⁶ - 5x⁴ + 1", "6x⁶ - 4x⁴", "x⁶ - x⁴"], correctAnswer: 0, explanation: "Derivar cada término" },
        { question: "¿Cuál es la derivada de f(x) = 5x² + 10?", options: ["10x", "10x + 10", "5x", "5x²"], correctAnswer: 0, explanation: "Derivar término a término" },
        { question: "¿Cuál es la derivada de f(x) = -x³ + 4x² - 2x?", options: ["-3x² + 8x - 2", "3x² + 8x - 2", "-3x² + 4x - 2", "-x² + 8x - 2"], correctAnswer: 0, explanation: "Derivada polinomial" },
        { question: "¿Cuál es la derivada de f(x) = 0.5x⁴?", options: ["2x³", "0.5x³", "4x³", "x³"], correctAnswer: 0, explanation: "0.5*4x³ = 2x³" }
      ]
    }
  ],

  medium: [
    {
      title: "Derivadas Intermedias I",
      timePerQuestion: 12,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = x·ln(x)?", options: ["1/x", "ln(x)+1", "x", "x/ln(x)"], correctAnswer: 1, explanation: "Producto: 1·ln(x) + x·1/x = ln(x)+1." },
        { question: "¿Cuál es la derivada de f(x) = x·eˣ?", options: ["x·eˣ", "eˣ(1+x)", "eˣ", "ln(x)"], correctAnswer: 1, explanation: "Producto: u'v + uv'." },
        { question: "¿Cuál es la derivada de f(x) = ln(x²)?", options: ["2/x", "1/x²", "x", "1/(2x)"], correctAnswer: 0, explanation: "ln(x²) → 2ln(x), su derivada: 2/x." },
        { question: "¿Cuál es la derivada de f(x) = 1/x?", options: ["-1/x²", "1/x²", "-x", "1/x"], correctAnswer: 0, explanation: "Regla de potencias: x⁻¹ → -x⁻²." },
        { question: "¿Cuál es la derivada de f(x) = ln(sen(x))?", options: ["cot(x)", "cos(x)/sen(x)", "1/sen(x)", "sen(x)/cos(x)"], correctAnswer: 1, explanation: "Regla de cadena: 1/u · u' = cos(x)/sen(x)." },
        { question: "¿Cuál es la derivada de f(x) = (x²+1)(x-1)?", options: ["2x(x-1)+(x²+1)", "x²+x-1", "2x", "x²"], correctAnswer: 0, explanation: "Producto: u'v + uv'." },
        { question: "¿Cuál es la derivada de f(x) = cos(2x)?", options: ["-2sen(2x)", "-cos(2x)", "2cos(2x)", "2sen(2x)"], correctAnswer: 0, explanation: "Cadena: d(cos(u)) = -sen(u)·u'." },
        { question: "¿Cuál es la derivada de f(x) = ln(x+1)?", options: ["1/(x+1)", "1/x", "ln(x)", "x+1"], correctAnswer: 0, explanation: "Derivada de ln(u) es u'/u." },
        { question: "¿Cuál es la derivada de f(x) = √(x²+1)?", options: ["x/√(x²+1)", "1/(2√x)", "x", "√x"], correctAnswer: 0, explanation: "Cadena: (1/2)(x²+1)^(-1/2)·2x = x/√(x²+1)." },
        { question: "¿Cuál es la derivada de f(x) = sen(x²)?", options: ["2x·cos(x²)", "cos(x²)", "2sen(x²)", "x²"], correctAnswer: 0, explanation: "Cadena: cos(u)·u', u = x²." }
      ]
    },
    {
      title: "Derivadas Intermedias II",
      timePerQuestion: 12,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = (x²)/(x+1)?", options: ["(2x(x+1)-x²)/(x+1)²", "(2x)/(x+1)", "x²/(x+1)²", "2x"], correctAnswer: 0, explanation: "Regla del cociente" },
        { question: "¿Cuál es la derivada de f(x) = eˣ/x?", options: ["(eˣ(x-1))/x²", "eˣ", "eˣ/x²", "(eˣ(x+1))/x²"], correctAnswer: 0, explanation: "Cociente: (eˣx - eˣ)/x²" },
        { question: "¿Cuál es la derivada de f(x) = (2x+3)(x²-1)?", options: ["2(x²-1) + (2x+3)(2x)", "4x² + 6x - 2", "2(x²-1)", "(2x+3)(2x)"], correctAnswer: 0, explanation: "Regla del producto" },
        { question: "¿Cuál es la derivada de f(x) = sen(x)/x²?", options: ["(cos(x)x² - 2x sen(x))/x⁴", "cos(x)/x²", "-2sen(x)/x³", "cos(x)x - sen(x)2x"], correctAnswer: 0, explanation: "Regla del cociente aplicada" },
        { question: "¿Cuál es la derivada de f(x) = ln(x³)?", options: ["3/x", "1/x³", "3x²", "3ln(x)"], correctAnswer: 0, explanation: "ln(x³) = 3ln(x) → 3/x" },
        { question: "¿Cuál es la derivada de f(x) = √(3x)?", options: ["(√3)/(2√x)", "3/(2√x)", "√3/x", "1/(2√x)"], correctAnswer: 0, explanation: "√(3x) = (3x)^½ → (3½)/(2√x)" },
        { question: "¿Cuál es la derivada de f(x) = e^(2x)?", options: ["2e^(2x)", "e^(2x)", "2eˣ", "e²"], correctAnswer: 0, explanation: "Regla de la cadena" },
        { question: "¿Cuál es la derivada de f(x) = cos(4x)?", options: ["-4sen(4x)", "-sen(4x)", "4cos(4x)", "sen(4x)"], correctAnswer: 0, explanation: "Regla de la cadena" },
        { question: "¿Cuál es la derivada de f(x) = ln(2x)?", options: ["1/x", "2/x", "1/(2x)", "ln(2)"], correctAnswer: 0, explanation: "ln(2x) = ln2 + lnx → derivada 1/x" },
        { question: "¿Cuál es la derivada de f(x) = x² ln(x)?", options: ["2x ln(x) + x", "2x ln(x)", "x²/x + ln(x)", "2x + ln(x)"], correctAnswer: 0, explanation: "Producto: 2x ln(x) + x²*(1/x)" }
      ]
    },
    {
      title: "Derivadas Intermedias III",
      timePerQuestion: 15,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = e^(x²)sen(x)?", options: ["e^(x²)(2x sen(x) + cos(x))", "e^(x²)cos(x)", "2x e^(x²)sen(x)", "e^(x²)(2x + cos(x))"], correctAnswer: 0, explanation: "Producto + Cadena" },
        { question: "¿Cuál es la derivada de f(x) = ln(cos(x))?", options: ["-tan(x)", "-sen(x)", "cot(x)", "1/cos(x)"], correctAnswer: 0, explanation: "Cadena: -sen(x)/cos(x)" },
        { question: "¿Cuál es la derivada de f(x) = (x³ + 1)/x²?", options: ["(3x²·x² - 2x(x³ +1))/x⁴", "3x² - 2x", "x - 2/x³", "1 - 2/x³"], correctAnswer: 0, explanation: "Regla del cociente" },
        { question: "¿Cuál es la derivada de f(x) = sen(5x³)?", options: ["15x² cos(5x³)", "5x² cos(5x³)", "cos(15x²)", "15x² sen(5x³)"], correctAnswer: 0, explanation: "Regla de la cadena" },
        { question: "¿Cuál es la derivada de f(x) = √(sen(x))?", options: ["cos(x)/(2√sen(x))", "√cos(x)", "cos(x)/√sen(x)", "1/(2√sen(x))"], correctAnswer: 0, explanation: "Cadena: (1/(2√u))·cos(x)" },
        { question: "¿Cuál es la derivada de f(x) = e^(ln(x²))?", options: ["2x", "2e^x", "x²", "2"], correctAnswer: 0, explanation: "Simplificar primero: e^(ln(x²)) = x²" },
        { question: "¿Cuál es la derivada de f(x) = cos(ln(x))?", options: ["-sen(ln(x))/x", "-sen(ln(x))", "-cos(ln(x))/x", "sen(ln(x))/x"], correctAnswer: 0, explanation: "Regla de la cadena" },
        { question: "¿Cuál es la derivada de f(x) = x/(x² +1)?", options: ["(1(x²+1) - x(2x))/(x²+1)²", "(1 - 2x)/(x²+1)", "(1 - x²)/(x²+1)²", "1/(x²+1)"], correctAnswer: 0, explanation: "Regla del cociente" },
        { question: "¿Cuál es la derivada de f(x) = tan(eˣ)?", options: ["eˣ sec²(eˣ)", "sec²(eˣ)", "eˣ tan(eˣ)", "eˣ sec(eˣ)"], correctAnswer: 0, explanation: "Cadena: derivada de tan(u)" },
        { question: "¿Cuál es la derivada de f(x) = ln(x + √(x²+1))?", options: ["1/√(x²+1)", "(1 + x/√(x²+1))/(x + √(x²+1))", "1/(x + √(x²+1))", "√(x²+1)"], correctAnswer: 0, explanation: "Simplificación algebraica" }
      ]
    }
  ],

  complex: [
    {
      title: "Derivadas Avanzadas I",
      timePerQuestion: 20,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = x^x?", options: ["x^x(ln(x)+1)", "x^x", "ln(x)", "e^(x·ln(x))"], correctAnswer: 0, explanation: "x^x = e^{x ln x}, derivada: x^x(ln(x)+1)." },
        { question: "¿Cuál es la derivada de f(x) = ln(x + √(x²+1))?", options: ["(1 + x/√(x²+1))/(x + √(x²+1))", "1/x", "1/(x²+1)", "x/(x²+1)"], correctAnswer: 0, explanation: "Cadena y cociente dentro del logaritmo." },
        { question: "¿Cuál es la derivada de f(x) = e^(x²)·sen(x)?", options: ["e^(x²)(2x·sen(x)+cos(x))", "x·e^(x²)", "cos(x)·e^(x²)", "2x·e^x"], correctAnswer: 0, explanation: "Producto + cadena: f·g + f'·g." },
        { question: "¿Cuál es la derivada de f(x) = sen²(x)?", options: ["2sen(x)cos(x)", "cos²(x)", "2cos(x)", "0"], correctAnswer: 0, explanation: "Cadena: 2sen(x)·cos(x)." },
        { question: "¿Cuál es la derivada de f(x) = arcsen(x)?", options: ["1/√(1-x²)", "1/(1+x²)", "-1/√(1-x²)", "x/√(1-x²)"], correctAnswer: 0, explanation: "f(x)=arcsen(x) ⇒ f'(x)=1/√(1-x²)." },
        { question: "¿Cuál es la derivada de f(x) = arctan(x²)?", options: ["2x/(1+x⁴)", "1/(1+x²)", "2x/(1+x²)", "x²/(1+x⁴)"], correctAnswer: 0, explanation: "Cadena: derivada de arctan(u)" },
        { question: "¿Cuál es la derivada de f(x) = x·arcsin(x)?", options: ["arcsin(x) + x/√(1-x²)", "arcsin(x)", "x/√(1-x²)", "1/√(1-x²)"], correctAnswer: 0, explanation: "Regla del producto" },
        { question: "¿Cuál es la derivada de f(x) = cosh(x)?", options: ["sinh(x)", "cosh(x)", "-sinh(x)", "tanh(x)"], correctAnswer: 0, explanation: "Derivada de cosh hiperbólico" },
        { question: "¿Cuál es la derivada de f(x) = ln(x^y) donde y es constante?", options: ["y/x", "ln(y)/x", "y ln(x)", "xy"], correctAnswer: 0, explanation: "ln(x^y) = y ln(x) → y/x" },
        { question: "¿Cuál es la derivada de f(x) = ∫₀ˣ e^(t²) dt?", options: ["e^(x²)", "e^(x²) - 1", "2x e^(x²)", "0"], correctAnswer: 0, explanation: "Teorema fundamental del cálculo" }
      ]
    },
    {
      title: "Derivadas Avanzadas II",
      timePerQuestion: 20,
      questions: [
        { question: "¿Cuál es la derivada de f(x) = sinh(3x)?", options: ["3cosh(3x)", "cosh(3x)", "3sinh(3x)", "3sinh(x)"], correctAnswer: 0, explanation: "Regla de la cadena para funciones hiperbólicas" },
        { question: "¿Cuál es la derivada de f(x) = tanh(eˣ)?", options: ["eˣ sech²(eˣ)", "sech²(eˣ)", "eˣ tanh(eˣ)", "eˣ cosh²(eˣ)"], correctAnswer: 0, explanation: "Cadena: derivada de tanh(u)" },
        { question: "¿Cuál es la derivada de f(x) = x^sen(x)?", options: ["x^sen(x)(cos(x)ln(x) + sen(x)/x)", "x^sen(x)cos(x)", "sen(x)x^{sen(x)-1}", "x^cos(x)(ln(x)-sen(x)/x)"], correctAnswer: 0, explanation: "Diferenciación logarítmica" },
        { question: "¿Cuál es la derivada de f(x) = arccos(√x)?", options: ["-1/(2√x√(1-x))", "-1/√(1-x)", "-1/(2√(1-x))", "-√x/(1-x)"], correctAnswer: 0, explanation: "Cadena aplicada a función inversa" },
        { question: "¿Cuál es la derivada de f(x) = sec(x²)?", options: ["2x sec(x²)tan(x²)", "sec(x²)tan(x²)", "2x sec²(x²)", "2 sec(x²)"], correctAnswer: 0, explanation: "Regla de la cadena para función trigonométrica" },
        { question: "¿Cuál es la derivada de f(x) = (2x)^x?", options: ["(2x)^x(ln(2x) +1)", "x(2x)^{x-1}", "2^x x^x", "(2x)^x ln(2x)"], correctAnswer: 0, explanation: "Diferenciación logarítmica" },
        { question: "¿Cuál es la derivada de f(x) = log₅(x)?", options: ["1/(x ln5)", "1/x", "ln5/x", "5/x"], correctAnswer: 0, explanation: "Cambio de base: log₅(x) = lnx/ln5" },
        { question: "¿Cuál es la derivada de f(x) = arcsec(x)?", options: ["1/(x√(x²-1))", "1/√(x²-1)", "x/(x²-1)", "1/(x²-1)"], correctAnswer: 0, explanation: "Derivada de función trigonométrica inversa" },
        { question: "¿Cuál es la derivada de f(x) = x!?", options: ["Γ'(x+1)", "x·x!", "No existe", "x! ln(x)"], correctAnswer: 0, explanation: "Usando la función Gamma para derivar factoriales" },
        { question: "¿Cuál es la derivada de f(x) = |x² - 1|?", options: ["2x·sgn(x² -1)", "2x", "|2x|", "Indefinida en x=±1"], correctAnswer: 0, explanation: "Derivada de valor absoluto con regla de la cadena" }
      ]
    }
  ]
};
export default quizzes;