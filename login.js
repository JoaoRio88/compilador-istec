function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        const startPos = Math.random() * 100;
        const animationDelay = Math.random() * 15;
        const animationDuration = Math.random() * 10 + 10;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = startPos + '%';
        particle.style.animationDelay = animationDelay + 's';
        particle.style.animationDuration = animationDuration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== LOGIN FUNCTION =====
function loginWithGoogle() {
    // Adicionar loading state
    const btn = document.querySelector('.google-login-btn');
    const originalContent = btn.innerHTML;
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> <span>A conectar...</span>';
    btn.disabled = true;

    // Redirecionar para autenticação Google
    setTimeout(() => {
        window.location.href = '/auth/google';
    }, 500);
}

// ===== URL PARAMETERS HANDLING =====
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    const message = urlParams.get('message');

    if (error) {
        let errorText = '';
        switch (error) {
            case 'auth':
                errorText = 'Falha na autenticação. Tente novamente.';
                break;
            case 'domain':
                errorText = 'Apenas contas @my.istec.pt são permitidas.';
                break;
            default:
                errorText = 'Erro desconhecido. Contacte o suporte.';
        }
        showError(errorText);
    }

    if (message === 'logout') {
        showSuccess('Logout realizado com sucesso.');
    }
}

// ===== SHOW MESSAGES =====
function showError(text) {
    const errorDiv = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    errorText.textContent = text;
    errorDiv.style.display = 'block';
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(text) {
    const successDiv = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    successText.textContent = text;
    successDiv.style.display = 'block';
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        loginWithGoogle();
    }
});

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    handleUrlParameters();
    
    console.log('🔐 Página de login carregada');
    console.log('📧 Domínio permitido: @my.istec.pt');
});