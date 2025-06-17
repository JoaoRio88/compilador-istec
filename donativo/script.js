let totalAmount = 0; // Total arrecadado
const goalAmount = 2000; // Meta de arrecadação

// Atualiza o valor total arrecadado e a barra de progresso
function updateProgress() {
    const progress = (totalAmount / goalAmount) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('donation-amount').innerText = `Total arrecadado: ${totalAmount}€`;
}

// Função para realizar uma doação
function donate(amount) {
    totalAmount += amount;
    updateProgress();
}

// Lida com o envio do formulário de doação personalizada
document.getElementById('donation-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const customAmount = parseFloat(document.getElementById('custom-donation').value);
    if (!isNaN(customAmount) && customAmount > 0) {
        totalAmount += customAmount;
        updateProgress();
        document.getElementById('custom-donation').value = ''; // Limpar o campo
    } else {
        alert('Por favor, insira um valor válido.');
    }
});

updateProgress(); // Inicializa a barra de progresso

window.addEventListener("message", (event) => {
    if (event.data === "dark-mode") {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
        console.log("Dark mode aplicado na página de donativo/contacto");
    } else if (event.data === "light-mode") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        console.log("Light mode aplicado na página de donativo/contacto");
    }
});