$(document).ready(function() {
    $('.compile-btn').click(function() {
        var preElement = $(this).closest('pre');
        var cssCode = preElement.find('code').text(); // Captura o código CSS
        var htmlCode = $(this).attr('data-html'); // Captura o código HTML do data-html
        var codeType = preElement.attr('data-type') || 'js';

        // Verifica e armazena no localStorage
        if (codeType === 'css') {
            localStorage.setItem('compilador_css', cssCode);
            localStorage.setItem('compilador_html', htmlCode); // Armazena o HTML aqui
            localStorage.removeItem('compilador_js');
        } else if (codeType === 'html') {
            localStorage.setItem('compilador_html', cssCode); // Se HTML, armazena CSS
            localStorage.removeItem('compilador_js');
        } else {
            localStorage.setItem('compilador_js', cssCode);
        }

        showCompileMessage('Código Enviado! Acede ao compilador para editar.');
    });

    function showCompileMessage(message) {
        const messageBox = document.createElement("div");
        messageBox.textContent = message;
        messageBox.style.position = "fixed";
        messageBox.style.bottom = "20px";
        messageBox.style.right = "80px";
        messageBox.style.backgroundColor = "#4CAF50";
        messageBox.style.color = "white";
        messageBox.style.padding = "10px 20px";
        messageBox.style.borderRadius = "5px";
        messageBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
        messageBox.style.zIndex = "9999";
        document.body.appendChild(messageBox);
        setTimeout(() => {
            document.body.removeChild(messageBox);
        }, 2000);
    }
});