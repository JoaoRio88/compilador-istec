// ===== SISTEMA DE AUTENTICAÇÃO FRONTEND =====

(function() {
    'use strict';

    let currentUser = null;
    let authChecked = false;

    // ===== VERIFICAR AUTENTICAÇÃO =====
    async function checkAuthentication() {
        try {
            const response = await fetch('/api/check-auth');
            const data = await response.json();
            
            authChecked = true;
            
            if (data.authenticated) {
                currentUser = data.user;
                setupAuthenticatedInterface();
                console.log('✅ Utilizador autenticado:', currentUser.email);
                return true;
            } else {
                // Redirecionar para login se não estiver autenticado
                window.location.href = '/login';
                return false;
            }
        } catch (error) {
            console.error('❌ Erro ao verificar autenticação:', error);
            // Se houver erro de rede, assumir que não está autenticado
            window.location.href = '/login';
            return false;
        }
    }

    // ===== CONFIGURAR INTERFACE AUTENTICADA =====
    function setupAuthenticatedInterface() {
        if (!currentUser) return;

        // Adicionar informações do utilizador no canto superior direito
        addUserInfo();
        
        // Adicionar botão de logout
        addLogoutButton();
        
        // Mostrar mensagem de boas-vindas (opcional)
        showWelcomeMessage();
    }

    // ===== ADICIONAR INFORMAÇÕES DO UTILIZADOR =====
    function addUserInfo() {
        // Verificar se já existe
        if (document.getElementById('user-info')) return;

        const card2Bottom = document.querySelector('.card2Bottom .first-nav-list');
        if (!card2Bottom) return;

        // Criar elemento de informação do utilizador
        const userInfoLi = document.createElement('li');
        userInfoLi.innerHTML = `
            <div id="user-info" style="
                padding: 10px 15px;
                text-align: center;
                border-bottom: 1px solid rgba(255,255,255,0.1);
                margin-bottom: 10px;
            ">
                <img src="${currentUser.photo}" alt="Avatar" style="
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-bottom: 5px;
                    border: 2px solid rgba(255,255,255,0.2);
                ">
                <div style="
                    color: white;
                    font-size: 10px;
                    font-weight: 500;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                " title="${currentUser.email}">
                    ${currentUser.name.split(' ')[0]}
                </div>
                <div style="
                    color: rgba(255,255,255,0.7);
                    font-size: 8px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                " title="${currentUser.email}">
                    ISTEC
                </div>
            </div>
        `;

        // Inserir no início da lista
        card2Bottom.insertBefore(userInfoLi, card2Bottom.firstChild);
    }

    // ===== ADICIONAR BOTÃO DE LOGOUT =====
    function addLogoutButton() {
        // Verificar se já existe
        if (document.getElementById('logout-btn')) return;

        const card2Bottom = document.querySelector('.card2Bottom .first-nav-list');
        if (!card2Bottom) return;

        const logoutLi = document.createElement('li');
        logoutLi.innerHTML = `
            <a href="#" id="logout-btn" onclick="logout()" title="Sair">
                <i class="bx bx-log-out"></i>
                <span class="links_name"></span>
            </a>
        `;

        // Adicionar ao final da lista
        card2Bottom.appendChild(logoutLi);
    }

    // ===== FUNÇÃO DE LOGOUT =====
    window.logout = function() {
        if (confirm('Tens a certeza que queres sair?')) {
            // Mostrar loading
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';
            }

            // Redirecionar para logout
            window.location.href = '/logout';
        }
    };

    // ===== MOSTRAR MENSAGEM DE BOAS-VINDAS =====
    function showWelcomeMessage() {
        // Mostrar apenas uma vez por sessão
        if (sessionStorage.getItem('welcomeShown')) return;

        setTimeout(() => {
            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #4CAF50, #45a049);
                color: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                font-family: 'Poppins', sans-serif;
                font-size: 14px;
                max-width: 300px;
                animation: slideInRight 0.5s ease-out;
            `;
            
            message.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="bx bx-check-circle" style="font-size: 20px;"></i>
                    <div>
                        <div style="font-weight: 600;">Bem-vindo, ${currentUser.name.split(' ')[0]}!</div>
                        <div style="font-size: 12px; opacity: 0.9;">Login realizado com sucesso</div>
                    </div>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        background: none;
                        border: none;
                        color: white;
                        cursor: pointer;
                        font-size: 18px;
                        margin-left: auto;
                    ">×</button>
                </div>
            `;

            // Adicionar CSS da animação
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(message);

            // Remover automaticamente após 5 segundos
            setTimeout(() => {
                if (message.parentElement) {
                    message.style.animation = 'slideInRight 0.5s ease-out reverse';
                    setTimeout(() => message.remove(), 500);
                }
            }, 5000);

            // Marcar como mostrada
            sessionStorage.setItem('welcomeShown', 'true');
        }, 1000);
    }

    // ===== PROTEÇÃO CONTRA ACESSO DIRETO =====
    function protectDirectAccess() {
        // Se tentar aceder a ficheiros protegidos diretamente
        const protectedPaths = ['/compilador/', '/paginas/'];
        const currentPath = window.location.pathname;
        
        const isProtectedPath = protectedPaths.some(path => currentPath.includes(path));
        
        if (isProtectedPath && !authChecked) {
            checkAuthentication();
        }
    }

    // ===== API HELPER FUNCTIONS =====
    window.authAPI = {
        getCurrentUser: () => currentUser,
        isAuthenticated: () => !!currentUser,
        checkAuth: checkAuthentication,
        logout: () => window.logout()
    };

    // ===== INICIALIZAÇÃO =====
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🔐 Sistema de autenticação carregado');
        
        // Verificar autenticação
        checkAuthentication().then(isAuth => {
            if (isAuth) {
                console.log('✅ Acesso autorizado');
            }
        });

        // Proteger acesso direto
        protectDirectAccess();
    });

    // ===== VERIFICAÇÃO PERIÓDICA (opcional) =====
    // Verificar se o utilizador ainda está autenticado a cada 5 minutos
    setInterval(() => {
        if (currentUser) {
            fetch('/api/check-auth')
                .then(response => response.json())
                .then(data => {
                    if (!data.authenticated) {
                        console.log('🔐 Sessão expirou, redirecionando...');
                        window.location.href = '/login';
                    }
                })
                .catch(error => {
                    console.error('Erro na verificação periódica:', error);
                });
        }
    }, 5 * 60 * 1000); // 5 minutos

})();