// Inicializar CodeMirror
const editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    mode: 'xml',          // Para HTML
    lineNumbers: true,
    theme: "dracula"
});

// Códigos iniciais (template padrão)
const defaultHtmlCode = `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meu Projeto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Olá, ISTEC!</h1>
    <p>Este é um exemplo completo de estrutura HTML.</p>
    <button onclick="alert('Olá do JavaScript!')">Clique aqui</button>
    <script src="script.js"></script>
</body>
</html>`;

const defaultCssCode = `body {
    font-family: Arial, sans-serif;
    color: #333;
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: blue;
}

p {
    color: gray;
}

button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    cursor: pointer;
}`;

const defaultJsCode = `console.log('Olá do JavaScript básico!');`;

// Função para carregar código do localStorage ou usar padrão
function loadSavedCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const htmlFromUrl = urlParams.get('html') ? decodeURIComponent(urlParams.get('html')) : null;
    return {
        html: htmlFromUrl || localStorage.getItem('compilador_html') || defaultHtmlCode,
        css: localStorage.getItem('compilador_css') || defaultCssCode,
        js: localStorage.getItem('compilador_js') || defaultJsCode
    };
}

// Função para guardar código no localStorage
function saveCode() {
    localStorage.setItem('compilador_html', htmlCode);
    localStorage.setItem('compilador_css', cssCode);
    localStorage.setItem('compilador_js', jsCode);
}

// Função para atualizar o tema do CodeMirror
function updateCodeMirrorTheme(isDarkMode) {
    const theme = isDarkMode ? "dracula" : "default";
    editor.setOption("theme", theme);
}

// Carregar código salvo ou usar padrão
const savedCode = loadSavedCode();
let htmlCode = savedCode.html;
let cssCode = savedCode.css;
let jsCode = savedCode.js;

let currentMode = "html";  // Variável global para rastrear a linguagem atual

// Alternar Editor
function switchEditor(mode) {
    currentMode = mode;

    if (mode === "html") {
        editor.setOption("mode", "xml");
        editor.setValue(htmlCode);
    } else if (mode === "css") {
        editor.setOption("mode", "css");
        editor.setValue(cssCode);
    } else if (mode === "js") {
        editor.setOption("mode", "javascript");
        editor.setValue(jsCode);
    }

    // Aplicar tema com base no modo atual
    const isDarkMode = localStorage.getItem("theme") === "dark";
    updateCodeMirrorTheme(isDarkMode);
}

editor.setSize("100%", "100%"); // Garante que o editor ocupe toda a altura e largura

// Inicializa o conteúdo do editor
switchEditor("html");
updateOutput(); // Força a atualização do conteúdo no iframe ao iniciar

// Atualiza o output
function updateOutput() {
    const iframeDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
    const finalOutput = `
    <!DOCTYPE html>
    <html lang="pt">
    <head>
        <meta charset="UTF-8">
        <title>Exemplo de Projeto</title>
        <style>${cssCode}</style>
    </head>
    <body>
        ${htmlCode}
        <script>${jsCode}<\/script>
    </body>
    </html>`;

    iframeDoc.open();
    iframeDoc.write(finalOutput);
    iframeDoc.close();
}

// Atualiza o código do iframe quando houver alteração
editor.on("change", () => {
    if (currentMode === "html") htmlCode = editor.getValue();
    if (currentMode === "css") cssCode = editor.getValue();
    if (currentMode === "js") jsCode = editor.getValue();
    updateOutput();
    saveCode(); // Guardar automaticamente a cada alteração
});

// Função para criar novo projeto
function newProject() {
    const confirmacao = confirm("Tem a certeza que quer abrir um projeto novo?\n\nTodo o código atual será perdido.");
    
    if (confirmacao) {
        // Resetar para código padrão
        htmlCode = defaultHtmlCode;
        cssCode = defaultCssCode;
        jsCode = defaultJsCode;
        
        // Atualizar editor atual
        if (currentMode === "html") {
            editor.setValue(htmlCode);
        } else if (currentMode === "css") {
            editor.setValue(cssCode);
        } else if (currentMode === "js") {
            editor.setValue(jsCode);
        }
        
        // Guardar novo código
        saveCode();
        
        // Atualizar output
        updateOutput();
        
        // Mostrar mensagem de confirmação
        showCopyMessage("Novo projeto criado!");
    }
}

function downloadProject() {
    // Criação de um novo arquivo ZIP
    const zip = new JSZip();

    // Adicionar o conteúdo de cada arquivo ao ZIP
    zip.file("index.html", htmlCode);   // Arquivo HTML
    zip.file("styles.css", cssCode);     // Arquivo CSS
    zip.file("script.js", jsCode);       // Arquivo JS

    // Gerar o arquivo ZIP e preparar para download
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // Criar um link para o arquivo gerado
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = "projeto.zip";  // Nome do arquivo ZIP

            // Simular o clique para download
            link.click();
        })
        .catch(function (error) {
            console.error("Erro ao gerar o ZIP:", error);
        });
}

function copyCode() {
    // Determinar qual código deve ser copiado com base no modo atual
    let codeToCopy = "";
    if (currentMode === "html") codeToCopy = htmlCode;
    if (currentMode === "css") codeToCopy = cssCode;
    if (currentMode === "js") codeToCopy = jsCode;

    // Criar um elemento temporário para cópia
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = codeToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999); // Compatibilidade para dispositivos móveis
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);

    // Exibir mensagem de confirmação
    showCopyMessage("Código copiado!");
}

function showCopyMessage(message) {
    const messageBox = document.createElement("div");
    messageBox.textContent = message;
    messageBox.style.position = "fixed";
    messageBox.style.bottom = "20px";
    messageBox.style.right = "90px";
    messageBox.style.backgroundColor = "#4CAF50";
    messageBox.style.color = "white";
    messageBox.style.padding = "10px 20px";
    messageBox.style.borderRadius = "5px";
    messageBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    messageBox.style.zIndex = "9999";
    document.body.appendChild(messageBox);

    // Remover a mensagem após 2 segundos
    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 2000);
}

window.addEventListener("message", (event) => {
    if (event.data === "dark-mode" && typeof editor !== "undefined") {
        editor.setOption("theme", "dracula");
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        console.log("Dark mode aplicado no iframe");
    } else if (event.data === "light-mode" && typeof editor !== "undefined") {
        editor.setOption("theme", "default");
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        console.log("Light mode aplicado no iframe");
    }
});

// Função para habilitar o redimensionamento do separador
const separator = document.getElementById('separator');
const editorPanel = document.getElementById('editorPanel');
const outputPanel = document.getElementById('outputPanel');
let isDragging = false;

separator.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault(); // Impede seleção de texto ou outros comportamentos
    document.body.style.cursor = 'col-resize'; // Muda o cursor globalmente
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

