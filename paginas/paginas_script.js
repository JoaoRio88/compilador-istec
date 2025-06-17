// ===== TUTORIAL JQUERY - FUNCIONALIDADES INTERATIVAS =====

// ===== NAVEGAÇÃO DO TUTORIAL =====
function showSection(sectionId, button) {
    // Esconder todas as seções
    $('.tutorial-section').removeClass('active');
    
    // Mostrar seção selecionada
    $('#' + sectionId).addClass('active');
    
    // Atualizar navegação
    $('.tutorial-nav li').removeClass('active');
    $(button).addClass('active');
    
    // Scroll para o topo suavemente
    $('html, body').animate({ scrollTop: 0 }, 300);
}

// ===== DEMONSTRAÇÕES INTERATIVAS =====

// 1. TESTE JQUERY
function testarJQuery() {
    if (typeof jQuery !== 'undefined') {
        $('#resultado-teste').html('<p style="color: green;">✅ jQuery está funcionando corretamente!</p>')
            .hide().fadeIn(500);
    } else {
        $('#resultado-teste').html('<p style="color: red;">❌ jQuery não está carregado!</p>');
    }
}

// 2. DEMONSTRAÇÃO DE SELETORES
function demonstrarSeletor(seletor) {
    // Limpar destaques anteriores
    $('#demo-seletores *').removeClass('highlight-demo');
    
    // Aplicar destaque ao seletor
    $(seletor).addClass('highlight-demo');
    
    // Animação de atenção
    $(seletor).animate({ 
        scale: '1.05' 
    }, 200).animate({ 
        scale: '1' 
    }, 200);
}

function limparDestaque() {
    $('#demo-seletores *').removeClass('highlight-demo');
}

// 3. DEMONSTRAÇÃO DE EVENTOS
$(document).ready(function() {
    let clickCount = 0;
    
    // Click demo
    $('#btn-click-demo').click(function() {
        clickCount++;
        $('#contador-demo').text('Cliques: ' + clickCount);
        
        // Animação de feedback
        $(this).animate({ 
            transform: 'scale(1.1)' 
        }, 100).animate({ 
            transform: 'scale(1)' 
        }, 100);
    });
    
    // Hover demo
    $('#btn-hover-demo').hover(
        function() { 
            $(this).css('background-color', '#28a745').text('Rato em cima!'); 
        },
        function() { 
            $(this).css('background-color', '#007BFF').text('Passa o rato aqui'); 
        }
    );
    
    // Input demo
    $('#input-demo').on('input', function() {
        const texto = $(this).val();
        $('#texto-digitado').text(texto ? 'Escreveste: ' + texto : '');
    });
});

// 4. DEMONSTRAÇÃO DOM
function alterarTexto() {
    $('#titulo-dom').text('Título Alterado com jQuery!');
    $('#paragrafo-dom').html('<strong>Texto alterado com <span style="color: red;">HTML</span>!</strong>');
    $('#input-dom').val('Valor alterado!');
}

function alterarEstilo() {
    $('#titulo-dom').css({
        'color': 'blue',
        'font-size': '24px',
        'text-decoration': 'underline',
        'font-weight': 'bold'
    });
    
    $('#paragrafo-dom').css({
        'background-color': 'yellow',
        'padding': '10px',
        'border-radius': '5px',
        'border': '2px solid orange'
    });
}

function adicionarItem() {
    const numeroItem = $('#lista-dom li').length + 1;
    const novoItem = $('<li>Novo item ' + numeroItem + '</li>');
    
    $('#lista-dom').append(novoItem);
    novoItem.hide().slideDown(300);
}

function resetarDOM() {
    $('#titulo-dom').text('Título Original').css({
        'color': '',
        'font-size': '',
        'text-decoration': '',
        'font-weight': ''
    });
    
    $('#paragrafo-dom').text('Texto original aqui.').css({
        'background-color': '',
        'padding': '',
        'border-radius': '',
        'border': ''
    });
    
    $('#lista-dom').html('<li>Item 1</li><li>Item 2</li>');
    $('#input-dom').val('Valor original');
}

// 5. DEMONSTRAÇÃO ANIMAÇÕES
function fadeDemo() {
    $('#caixa-animacao').fadeToggle(500);
}

function slideDemo() {
    $('#caixa-animacao').slideToggle(500);
}

function animateDemo() {
    const $caixa = $('#caixa-animacao');
    const isLarge = $caixa.hasClass('large');
    
    if (isLarge) {
        $caixa.animate({
            width: '100px',
            height: '100px',
            opacity: 1,
            'border-radius': '10px'
        }, 800);
        $caixa.removeClass('large');
    } else {
        $caixa.animate({
            width: '150px',
            height: '150px',
            opacity: 0.7,
            'border-radius': '50%'
        }, 800);
        $caixa.addClass('large');
    }
}

function resetAnimation() {
    $('#caixa-animacao').stop(true, true).css({
        width: '100px',
        height: '100px',
        opacity: 1,
        display: 'block',
        'border-radius': '10px'
    }).removeClass('large');
}

// 6. DEMONSTRAÇÃO AJAX (simulado)
function carregarCitacao() {
    $('#resultado-ajax').html('<p style="color: #007BFF;">🔄 Carregando citação...</p>');
    
    // Simular delay de rede
    setTimeout(function() {
        const citacoes = [
            "O código é poesia em movimento.",
            "Erros são apenas oportunidades de aprender.",
            "A melhor forma de aprender é praticando.",
            "jQuery torna JavaScript divertido!",
            "A simplicidade é a sofisticação suprema.",
            "Code is read much more often than it is written."
        ];
        
        const citacao = citacoes[Math.floor(Math.random() * citacoes.length)];
        const autor = ["Steve Jobs", "Linus Torvalds", "Bill Gates", "Ada Lovelace"][Math.floor(Math.random() * 4)];
        
        $('#resultado-ajax').html(`
            <blockquote style="font-style: italic; border-left: 3px solid #007BFF; padding-left: 15px; margin: 0;">
                "${citacao}"
                <footer style="margin-top: 10px; font-size: 12px; color: #666;">
                    — ${autor}
                </footer>
            </blockquote>
        `).hide().fadeIn(500);
    }, 1000);
}

function carregarUtilizador() {
    $('#resultado-ajax').html('<p style="color: #007BFF;">🔄 Carregando utilizador...</p>');
    
    setTimeout(function() {
        const utilizadores = [
            { nome: "Ana Silva", email: "ana@exemplo.com", idade: 25, profissao: "Designer" },
            { nome: "João Costa", email: "joao@exemplo.com", idade: 30, profissao: "Developer" },
            { nome: "Maria Santos", email: "maria@exemplo.com", idade: 28, profissao: "Project Manager" },
            { nome: "Pedro Oliveira", email: "pedro@exemplo.com", idade: 32, profissao: "Data Scientist" }
        ];
        
        const user = utilizadores[Math.floor(Math.random() * utilizadores.length)];
        
        $('#resultado-ajax').html(`
            <div style="text-align: left; background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                    <div style="width: 40px; height: 40px; background: #007BFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        ${user.nome.charAt(0)}
                    </div>
                    <div>
                        <strong style="color: #333;">${user.nome}</strong><br>
                        <small style="color: #666;">${user.profissao}</small>
                    </div>
                </div>
                <div style="color: #666; font-size: 14px;">
                    <div>📧 ${user.email}</div>
                    <div>🎂 ${user.idade} anos</div>
                </div>
            </div>
        `).hide().fadeIn(500);
    }, 800);
}

// 7. PROJETO PRÁTICO - MINI TODO LIST
let demoTarefas = [];
let demoIdCounter = 1;

function adicionarTarefaDemo() {
    const texto = $('#demo-nova-tarefa').val().trim();
    if (texto) {
        const tarefa = {
            id: demoIdCounter++,
            texto: texto,
            concluida: false
        };
        
        demoTarefas.push(tarefa);
        $('#demo-nova-tarefa').val('');
        renderizarTarefasDemo();
        
        // Feedback visual
        $('#demo-nova-tarefa').css('border-color', '#28a745')
            .animate({ 'border-color': '#ccc' }, 1000);
    } else {
        // Feedback de erro
        $('#demo-nova-tarefa').css('border-color', '#dc3545')
            .animate({ 'border-color': '#ccc' }, 1000)
            .focus();
    }
}

function renderizarTarefasDemo() {
    const $lista = $('#demo-lista-tarefas');
    $lista.empty();
    
    demoTarefas.forEach(tarefa => {
        const $item = $(`
            <li style="display: flex; align-items: center; padding: 8px; border-bottom: 1px solid #eee; ${tarefa.concluida ? 'opacity: 0.6; text-decoration: line-through;' : ''}">
                <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="toggleTarefaDemo(${tarefa.id})" style="margin-right: 10px;">
                <span style="flex: 1; text-align: left;">${tarefa.texto}</span>
                <button onclick="removerTarefaDemo(${tarefa.id})" style="background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 12px;">×</button>
            </li>
        `);
        
        $lista.append($item);
        $item.hide().slideDown(200);
    });
    
    $('#demo-total').text(`${demoTarefas.length} tarefa(s)`);
    
    // Atualizar estatísticas
    const concluidas = demoTarefas.filter(t => t.concluida).length;
    const pendentes = demoTarefas.length - concluidas;
    
    if (demoTarefas.length > 0) {
        $('#demo-total').html(`
            ${demoTarefas.length} tarefa(s) • 
            <span style="color: #28a745;">${concluidas} concluída(s)</span> • 
            <span style="color: #ffc107;">${pendentes} pendente(s)</span>
        `);
    }
}

function toggleTarefaDemo(id) {
    const tarefa = demoTarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        renderizarTarefasDemo();
        
        // Feedback sonoro simulado
        console.log(tarefa.concluida ? '✅ Tarefa concluída!' : '⏳ Tarefa reativada!');
    }
}

function removerTarefaDemo(id) {
    const $item = $(`#demo-lista-tarefas li`).filter(function() {
        return $(this).find('button').attr('onclick').includes(id);
    });
    
    $item.slideUp(300, function() {
        demoTarefas = demoTarefas.filter(t => t.id !== id);
        renderizarTarefasDemo();
    });
}

// ===== INICIALIZAÇÃO =====
$(document).ready(function() {
    // Enter para adicionar tarefa demo
    $('#demo-nova-tarefa').keypress(function(e) {
        if (e.which === 13) {
            adicionarTarefaDemo();
        }
    });
    
    // Placeholder dinâmico para input demo
    let placeholderTexts = [
        "Escreve algo aqui...",
        "Testa os eventos jQuery!",
        "Vê a magia acontecer!",
        "jQuery é fantástico!"
    ];
    let currentPlaceholder = 0;
    
    setInterval(function() {
        if (!$('#input-demo').is(':focus') && $('#input-demo').val() === '') {
            $('#input-demo').attr('placeholder', placeholderTexts[currentPlaceholder]);
            currentPlaceholder = (currentPlaceholder + 1) % placeholderTexts.length;
        }
    }, 3000);
    
    // Tooltip simulado para botões de demonstração
    $('.demo-button').hover(
        function() {
            $(this).attr('title', 'Clica para ver a demonstração!');
        }
    );
    
    // Animação sutil para code examples
    $('.code-example').hover(
        function() {
            $(this).css('border-left-width', '6px');
        },
        function() {
            $(this).css('border-left-width', '4px');
        }
    );
    
    // Auto-scroll suave para navegação
    $('.tutorial-nav a').click(function() {
        const target = $(this).attr('href');
        if (target && target.startsWith('#')) {
            setTimeout(function() {
                $('html, body').animate({
                    scrollTop: $(target).offset().top - 100
                }, 500);
            }, 100);
        }
    });
    
    // Easter egg - Konami code para algo divertido
    let konamiCode = [38,38,40,40,37,39,37,39,66,65];
    let konamiIndex = 0;
    
    $(document).keydown(function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg ativado!
                $('body').css('animation', 'rainbow 2s linear infinite');
                setTimeout(function() {
                    $('body').css('animation', '');
                    alert('🎉 Parabéns! Descobriste o easter egg do jQuery! 🎉');
                }, 2000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    console.log('🎯 Tutorial jQuery carregado com sucesso!');
    console.log('💡 Dica: Tenta o Konami Code (↑↑↓↓←→←→BA) para um easter egg!');
});

// ===== CSS ANIMATIONS DINÂMICAS =====
// Adicionar keyframes para rainbow effect
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== DADOS DOS PROJETOS =====
const projetosPraticos = {
    landing: {
        nome: "Landing Page Responsiva",
        html: `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechStart - Inovação Digital</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">🚀 TechStart</div>
            <ul class="nav-menu">
                <li><a href="#home">Início</a></li>
                <li><a href="#services">Serviços</a></li>
                <li><a href="#about">Sobre</a></li>
            </ul>
        </div>
    </nav>

    <section id="home" class="hero">
        <div class="container">
            <h1>Transformamos Ideias em <span>Realidade Digital</span></h1>
            <p>Desenvolvimento web moderno e soluções tecnológicas para o seu negócio.</p>
            <a href="#services" class="btn">Nossos Serviços</a>
        </div>
    </section>

    <section id="services" class="services">
        <div class="container">
            <h2>Os Nossos Serviços</h2>
            <div class="grid">
                <div class="card">
                    <div class="icon">🌐</div>
                    <h3>Desenvolvimento Web</h3>
                    <p>Sites responsivos e modernos.</p>
                </div>
                <div class="card">
                    <div class="icon">📱</div>
                    <h3>Apps Mobile</h3>
                    <p>Aplicações nativas e híbridas.</p>
                </div>
                <div class="card">
                    <div class="icon">🎨</div>
                    <h3>UI/UX Design</h3>
                    <p>Interfaces intuitivas e bonitas.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* NAVBAR */
.navbar {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4a90e2;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #4a90e2;
}

/* HERO */
.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 120px 0 80px;
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 20px;
}

.hero span {
    color: #ffd700;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.btn {
    display: inline-block;
    background: #ffd700;
    color: #333;
    padding: 15px 30px;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: transform 0.3s;
}

.btn:hover {
    transform: translateY(-2px);
}

/* SERVICES */
.services {
    padding: 80px 0;
    background: #f8f9fa;
}

.services h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 60px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
}

.card {
    background: white;
    padding: 40px 30px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.card:hover {
    transform: translateY(-10px);
}

.icon {
    font-size: 3rem;
    margin-bottom: 20px;
}

@media (max-width: 768px) {
    .hero h1 {
        font-size: 2rem;
    }
    
    .nav-menu {
        display: none;
    }
}`,
        js: `// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar sticky effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50) {
        navbar.style.background = 'rgba(255,255,255,0.95)';
    } else {
        navbar.style.background = '#fff';
    }
});

console.log('Landing Page carregada!');`
    },
    
    calculadora: {
        nome: "Calculadora Interativa",
        html: `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <input type="text" id="display" readonly>
        </div>
        <div class="buttons">
            <button onclick="clearDisplay()" class="clear">C</button>
            <button onclick="deleteLast()" class="delete">⌫</button>
            <button onclick="appendToDisplay('/')" class="operator">÷</button>
            <button onclick="appendToDisplay('*')" class="operator">×</button>
            
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('-')" class="operator">-</button>
            
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('+')" class="operator">+</button>
            
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="calculate()" class="equals" rowspan="2">=</button>
            
            <button onclick="appendToDisplay('0')" class="zero">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        css: `body {
    font-family: Arial, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
}

.calculator {
    background: #333;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    width: 300px;
}

.display input {
    width: 100%;
    height: 80px;
    background: #000;
    color: #00ff00;
    border: none;
    border-radius: 10px;
    font-size: 2rem;
    text-align: right;
    padding: 0 20px;
    font-family: monospace;
    margin-bottom: 20px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    height: 60px;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
    background: #666;
    color: white;
}

button:hover {
    transform: scale(1.05);
}

.operator {
    background: #ff9500;
}

.equals {
    background: #ff9500;
    grid-row: span 2;
}

.clear {
    background: #ff4757;
}

.delete {
    background: #ffa502;
}

.zero {
    grid-column: span 2;
}`,
        js: `let shouldResetDisplay = false;

function appendToDisplay(value) {
    const display = document.getElementById('display');
    
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    
    display.value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const display = document.getElementById('display');
    try {
        let expression = display.value;
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/÷/g, '/');
        
        const result = eval(expression);
        display.value = result;
        shouldResetDisplay = true;
    } catch (error) {
        display.value = 'Erro';
        shouldResetDisplay = true;
    }
}

// Suporte para teclado
document.addEventListener('keydown', function(e) {
    const key = e.key;
    
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-') {
        appendToDisplay(key);
    } else if (key === '*') {
        appendToDisplay('×');
    } else if (key === '/') {
        e.preventDefault();
        appendToDisplay('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'Backspace') {
        deleteLast();
    }
});`
    },
    
    todo: {
        nome: "To-Do List com jQuery",
        html: `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>📝 My Tasks</h1>
            <p>Organiza o teu dia</p>
        </header>
        
        <div class="input-section">
            <input type="text" id="new-task" placeholder="Adicionar nova tarefa..." maxlength="100">
            <button id="add-btn">Adicionar</button>
        </div>
        
        <div class="stats">
            <div class="stat">
                <span id="total">0</span>
                <label>Total</label>
            </div>
            <div class="stat">
                <span id="completed">0</span>
                <label>Completas</label>
            </div>
            <div class="stat">
                <span id="pending">0</span>
                <label>Pendentes</label>
            </div>
        </div>
        
        <ul id="task-list"></ul>
        
        <div class="actions">
            <button id="clear-completed">Limpar Completas</button>
            <button id="clear-all">Limpar Tudo</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: `body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 500px;
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, #4a90e2, #357abd);
    color: white;
    text-align: center;
    padding: 30px 20px;
}

header h1 {
    margin: 0 0 10px 0;
    font-size: 2rem;
}

header p {
    margin: 0;
    opacity: 0.9;
}

.input-section {
    padding: 25px;
    display: flex;
    gap: 10px;
}

#new-task {
    flex: 1;
    padding: 15px;
    border: 2px solid #eee;
    border-radius: 25px;
    font-size: 16px;
    outline: none;
}

#new-task:focus {
    border-color: #4a90e2;
}

#add-btn {
    background: #4a90e2;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
}

.stats {
    display: flex;
    padding: 20px 25px;
    background: #f8f9fa;
}

.stat {
    flex: 1;
    text-align: center;
}

.stat span {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    color: #4a90e2;
}

.stat label {
    font-size: 12px;
    color: #666;
    text-transform: uppercase;
}

#task-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 400px;
    overflow-y: auto;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 1px solid #eee;
}

.task-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.task-checkbox {
    margin-right: 15px;
}

.task-text {
    flex: 1;
}

.task-delete {
    background: #ff4757;
    color: white;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
}

.actions {
    padding: 20px 25px;
    display: flex;
    gap: 10px;
}

.actions button {
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
}

#clear-completed {
    background: #6c757d;
    color: white;
}

#clear-all {
    background: #ff4757;
    color: white;
}`,
        js: `$(document).ready(function() {
    let tasks = [];
    let taskId = 1;
    
    $('#add-btn').click(addTask);
    $('#new-task').keypress(function(e) {
        if (e.which === 13) addTask();
    });
    
    $('#clear-completed').click(clearCompleted);
    $('#clear-all').click(clearAll);
    
    function addTask() {
        const text = $('#new-task').val().trim();
        if (text) {
            const task = {
                id: taskId++,
                text: text,
                completed: false
            };
            
            tasks.push(task);
            $('#new-task').val('');
            renderTasks();
            updateStats();
        }
    }
    
    function renderTasks() {
        const $list = $('#task-list');
        $list.empty();
        
        if (tasks.length === 0) {
            $list.append('<li style="text-align:center; padding:40px; color:#999;">Nenhuma tarefa ainda!</li>');
            return;
        }
        
        tasks.forEach(task => {
            const $item = $(\`
                <li class="task-item \${task.completed ? 'completed' : ''}" data-id="\${task.id}">
                    <input type="checkbox" class="task-checkbox" \${task.completed ? 'checked' : ''}>
                    <span class="task-text">\${task.text}</span>
                    <button class="task-delete">×</button>
                </li>
            \`);
            
            $item.find('.task-checkbox').change(function() {
                task.completed = this.checked;
                renderTasks();
                updateStats();
            });
            
            $item.find('.task-delete').click(function() {
                $item.slideUp(300, function() {
                    tasks = tasks.filter(t => t.id !== task.id);
                    updateStats();
                    renderTasks();
                });
            });
            
            $list.append($item);
            $item.hide().slideDown(200);
        });
    }
    
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;
        
        $('#total').text(total);
        $('#completed').text(completed);
        $('#pending').text(pending);
    }
    
    function clearCompleted() {
        if (tasks.some(t => t.completed)) {
            if (confirm('Limpar tarefas completas?')) {
                tasks = tasks.filter(t => !t.completed);
                renderTasks();
                updateStats();
            }
        }
    }
    
    function clearAll() {
        if (tasks.length > 0) {
            if (confirm('Limpar todas as tarefas?')) {
                tasks = [];
                renderTasks();
                updateStats();
            }
        }
    }
    
    // Inicializar
    renderTasks();
    updateStats();
});`
    },
    
    quiz: {
        nome: "Quiz Interativo",
        html: `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Interativo</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="quiz-container">
        <div id="start-screen" class="screen">
            <h1>🧠 Quiz Interativo</h1>
            <p>Testa os teus conhecimentos!</p>
            <button onclick="startQuiz()" class="btn-start">Começar Quiz</button>
        </div>
        
        <div id="quiz-screen" class="screen" style="display:none;">
            <div class="quiz-header">
                <div class="progress-bar">
                    <div id="progress" class="progress"></div>
                </div>
                <div class="quiz-info">
                    <span id="question-number">1/5</span>
                    <span id="timer">30s</span>
                </div>
            </div>
            
            <div class="question-container">
                <h2 id="question-text"></h2>
                <div id="answers-container"></div>
            </div>
        </div>
        
        <div id="result-screen" class="screen" style="display:none;">
            <h1>🎉 Quiz Terminado!</h1>
            <div class="result-info">
                <div class="score">
                    <span id="final-score">0</span>/5
                </div>
                <p id="result-message"></p>
            </div>
            <button onclick="restartQuiz()" class="btn-restart">Tentar Novamente</button>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>`,
        css: `body {
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.quiz-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 600px;
    overflow: hidden;
}

.screen {
    padding: 40px;
    text-align: center;
}

h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

.btn-start, .btn-restart {
    background: #4a90e2;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 25px;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-start:hover, .btn-restart:hover {
    background: #357abd;
    transform: translateY(-2px);
}

.quiz-header {
    background: #f8f9fa;
    padding: 20px;
    border-bottom: 1px solid #eee;
}

.progress-bar {
    background: #e9ecef;
    border-radius: 10px;
    height: 8px;
    margin-bottom: 15px;
    overflow: hidden;
}

.progress {
    background: #4a90e2;
    height: 100%;
    width: 0%;
    transition: width 0.3s ease;
}

.quiz-info {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    color: #666;
}

.question-container {
    padding: 40px;
}

#question-text {
    color: #333;
    margin-bottom: 30px;
    font-size: 1.3rem;
    line-height: 1.5;
}

.answer-btn {
    display: block;
    width: 100%;
    background: #f8f9fa;
    border: 2px solid #eee;
    padding: 15px 20px;
    margin-bottom: 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: left;
    font-size: 16px;
}

.answer-btn:hover {
    background: #e9ecef;
    border-color: #4a90e2;
}

.answer-btn.correct {
    background: #d4edda;
    border-color: #28a745;
    color: #155724;
}

.answer-btn.wrong {
    background: #f8d7da;
    border-color: #dc3545;
    color: #721c24;
}

.answer-btn:disabled {
    cursor: not-allowed;
    opacity: 0.8;
}

.result-info {
    margin: 30px 0;
}

.score {
    font-size: 4rem;
    font-weight: bold;
    color: #4a90e2;
    margin-bottom: 20px;
}

#result-message {
    font-size: 1.2rem;
    color: #666;
}`,
        js: `const questions = [
    {
        question: "Qual é a tag HTML correta para o maior título?",
        answers: ["<h1>", "<h6>", "<heading>", "<header>"],
        correct: 0
    },
    {
        question: "Como se aplica uma cor de fundo azul em CSS?",
        answers: ["color: blue;", "background-color: blue;", "bg-color: blue;", "background: blue;"],
        correct: 1
    },
    {
        question: "Qual método JavaScript é usado para encontrar um elemento por ID?",
        answers: ["getElementById()", "getElement()", "findElementById()", "querySelector()"],
        correct: 0
    },
    {
        question: "Qual é a estrutura básica de um documento HTML?",
        answers: ["<html><head><body>", "<html><body><head>", "<body><html><head>", "<head><html><body>"],
        correct: 0
    },
    {
        question: "Como se cria um comentário em JavaScript?",
        answers: ["<!-- comentário -->", "/* comentário */", "// comentário", "# comentário"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startQuiz() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('question-number').textContent = \`\${currentQuestion + 1}/\${questions.length}\`;
    
    // Atualizar barra de progresso
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    // Mostrar respostas
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Iniciar timer
    timeLeft = 30;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    document.getElementById('timer').textContent = timeLeft + 's';
    timeLeft--;
    
    if (timeLeft < 0) {
        clearInterval(timer);
        selectAnswer(-1); // Tempo esgotado
    }
}

function selectAnswer(selectedIndex) {
    clearInterval(timer);
    
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Desabilitar todos os botões
    buttons.forEach(btn => btn.disabled = true);
    
    // Mostrar resposta correta
    buttons[question.correct].classList.add('correct');
    
    // Se a resposta selecionada estiver errada, marcar como errada
    if (selectedIndex !== -1 && selectedIndex !== question.correct) {
        buttons[selectedIndex].classList.add('wrong');
    }
    
    // Verificar se a resposta está correta
    if (selectedIndex === question.correct) {
        score++;
    }
    
    // Avançar para a próxima pergunta após 2 segundos
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function showResults() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    
    document.getElementById('final-score').textContent = score;
    
    let message = '';
    if (score === questions.length) {
        message = '🎉 Perfeito! Conheces muito bem o assunto!';
    } else if (score >= questions.length * 0.7) {
        message = '👏 Muito bom! Tens bons conhecimentos!';
    } else if (score >= questions.length * 0.5) {
        message = '👍 Não está mal! Continua a estudar!';
    } else {
        message = '📚 Precisas de estudar mais um pouco!';
    }
    
    document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';
}`
    },
    
    weather: {
        nome: "Weather App",
        html: "<!-- Weather App - projeto mais avançado - código simplificado -->",
        css: "/* Weather App CSS */",
        js: "// Weather App JavaScript com API"
    },
    
    password: {
        nome: "Gerador de Passwords",
        html: "<!-- Password Generator - projeto avançado - código simplificado -->",
        css: "/* Password Generator CSS */",
        js: "// Password Generator JavaScript"
    }
};

// ===== VARIÁVEIS GLOBAIS DOS PROJETOS =====
let projetoAtualModal = null;

// ===== CARREGAR PROJETO NO COMPILADOR =====
function carregarProjetoNoCompilador(projectId) {
    const projeto = projetosPraticos[projectId];
    if (!projeto) {
        mostrarMensagemProjeto('❌ Projeto não encontrado!', 'error');
        return;
    }

    if (confirm(`Carregar "${projeto.nome}" no compilador?\n\nIsto vai substituir o código atual.`)) {
        
        // ===== GUARDAR NO LOCALSTORAGE =====
        localStorage.setItem('projeto-temp', JSON.stringify({
            html: projeto.html,
            css: projeto.css,
            js: projeto.js,
            nome: projeto.nome,
            timestamp: Date.now()
        }));
        
        // Navegar para compilador
        if (window.parent && window.parent.carregarConteudo) {
            window.parent.carregarConteudo('compilador/compilador.html');
        }
        
        mostrarMensagemProjeto(`✅ "${projeto.nome}" será carregado no compilador!`, 'success');
    }
}

// ===== VER CÓDIGO DO PROJETO =====
function verCodigoProjeto(projectId) {
    const projeto = projetosPraticos[projectId];
    if (!projeto) {
        mostrarMensagemProjeto('❌ Projeto não encontrado!', 'error');
        return;
    }
    
    projetoAtualModal = projectId;
    
    // Atualizar modal
    document.getElementById('modal-titulo').textContent = `Código: ${projeto.nome}`;
    document.getElementById('modal-html').querySelector('code').textContent = projeto.html || '<!-- Sem HTML específico -->';
    document.getElementById('modal-css').querySelector('code').textContent = projeto.css || '/* Sem CSS específico */';
    document.getElementById('modal-js').querySelector('code').textContent = projeto.js || '// Sem JavaScript específico';
    
    // Mostrar modal
    document.getElementById('modal-codigo').style.display = 'flex';
    mostrarTabCodigo('html');
}

// ===== FUNÇÕES DO MODAL =====
function fecharModalCodigo() {
    document.getElementById('modal-codigo').style.display = 'none';
    projetoAtualModal = null;
}

function mostrarTabCodigo(tab) {
    // Esconder todos os códigos
    document.querySelectorAll('.code-display').forEach(pre => {
        pre.style.display = 'none';
    });
    
    // Remover active de todos os botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar código selecionado
    document.getElementById('modal-' + tab).style.display = 'block';
    
    // Adicionar active ao botão clicado
    event.target.classList.add('active');
}

function carregarDoModal() {
    if (projetoAtualModal) {
        fecharModalCodigo();
        carregarProjetoNoCompilador(projetoAtualModal);
    }
}

// ===== FUNÇÃO AUXILIAR PARA MENSAGENS =====
function mostrarMensagemProjeto(mensagem, tipo = 'info') {
    // Remover mensagem anterior
    const existente = document.querySelector('.mensagem-temp');
    if (existente) existente.remove();
    
    const cores = {
        success: '#28a745',
        error: '#dc3545',
        info: '#007bff'
    };
    
    const div = document.createElement('div');
    div.className = 'mensagem-temp';
    div.textContent = mensagem;
    div.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${cores[tipo] || cores.info};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(div);
    
    // Remover automaticamente após 3 segundos
    setTimeout(() => {
        div.style.opacity = '0';
        div.style.transform = 'translateX(100%)';
        div.style.transition = 'all 0.3s ease';
        setTimeout(() => div.remove(), 300);
    }, 3000);
}

// ===== NAVEGAÇÃO SUAVE (adiciona às existentes) =====
document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave para projetos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fechar modal ao clicar fora
    document.getElementById('modal-codigo').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharModalCodigo();
        }
    });
    
    // Fechar modal com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('modal-codigo').style.display === 'flex') {
            fecharModalCodigo();
        }
    });
    
    console.log('📁 Sistema de Projetos carregado!');
});

// ===== CSS DINÂMICO PARA ANIMAÇÕES =====
if (!document.getElementById('projetos-animations')) {
    const style = document.createElement('style');
    style.id = 'projetos-animations';
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}