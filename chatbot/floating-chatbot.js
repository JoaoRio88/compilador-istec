// floating-chatbot.js - Versão FINAL CORRIGIDA

class FloatingChatBot {
  constructor() {
    this.chatLog = document.getElementById('chat-log-float');
    this.userInput = document.getElementById('user-input-float');
    this.sendBtn = document.getElementById('send-btn-float');
    this.botTypeSelect = document.getElementById('bot-type-float');
    this.isTyping = false;
    this.conversationHistory = [];
    this.init();
  }

  init() {
    this.sendBtn?.addEventListener('click', () => this.sendMessage());
    this.userInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    this.botTypeSelect?.addEventListener('change', () => {
      this.clearChat();
      this.showWelcomeMessage();
    });
    this.showWelcomeMessage();
  }

  showWelcomeMessage() {
    const botType = this.botTypeSelect?.value || 'ajudante';
    const welcomeMessages = {
      ajudante: "👋 Olá! Sou o seu assistente de programação. Como posso ajudar?",
      explicador: "📖 Oi! Cole seu código aqui e eu explico como funciona!",
      motivador: "💪 Olá! Vamos programar com motivação! O que você está desenvolvendo?"
    };
    if (this.chatLog) {
      this.chatLog.innerHTML = `<div class="welcome-message"><i class="bx bx-bot"></i><p>${welcomeMessages[botType]}</p></div>`;
    }
  }

  async sendMessage() {
    const message = this.userInput?.value.trim();
    if (!message || this.isTyping) return;
    const botType = this.botTypeSelect?.value || 'ajudante';
    this.addMessage(message, 'user');
    this.userInput.value = '';
    this.showTyping();
    try {
      const response = await this.callExternalAPI(message, botType);
      this.hideTyping();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTyping();
      this.addMessage('❌ Erro ao conectar com o servidor.', 'bot', true);
      console.error('Erro no chatbot flutuante:', error);
    }
  }

  async callExternalAPI(message, botType) {
    try {
      // ✅ CORRIGIDO: /api/chatbot (não /api/chat)
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: message, 
          botType: botType  // ✅ CORRIGIDO: botType (não bot)
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Erro na API:', error);
      throw error;
    }
  }

addMessage(content, sender, isError = false) {
  if (!this.chatLog) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const avatarDiv = document.createElement('div');
  avatarDiv.className = 'message-avatar';
  avatarDiv.innerHTML = sender === 'user' ? '<i class="bx bx-user"></i>' : '<i class="bx bx-bot"></i>';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  if (isError) contentDiv.classList.add('error-message');

  // Detecção e formatação automática de código
  if (sender === 'bot' && this.isCodeContent(content)) {
    const formattedContent = this.formatCodeContent(content);
    contentDiv.innerHTML = formattedContent;
    
    // Aplicar syntax highlighting se disponível
    if (typeof hljs !== 'undefined') {
      contentDiv.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  } else {
    contentDiv.textContent = content;
  }

  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  this.chatLog.appendChild(messageDiv);
  this.scrollToBottom();
}

// Verifica se o conteúdo parece ser código
isCodeContent(content) {
  const codePatterns = [
    /<(\w+)([^>]*)>([^<]*)<\/\1>/,
    /function\s+\w+\s*\(/,
    /const\s+\w+\s*=/,
    /let\s+\w+\s*=/,
    /class\s+\w+/,
    /import\s+.+\s+from/
  ];
  return codePatterns.some(pattern => pattern.test(content));
}

// Formata o conteúdo como código
formatCodeContent(content) {
  // Determina a linguagem (HTML, JavaScript, etc)
  const lang = content.trim().startsWith('<') ? 'html' : 'javascript';
  return `
    <pre><code class="language-${lang}">
    ${this.escapeHtml(content)}
    </code></pre>
  `;
}

// Protege contra XSS e escapa HTML
escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

  showTyping() {
    if (!this.chatLog) return;
    this.isTyping = true;
    if (this.sendBtn) this.sendBtn.disabled = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `<div class="message-avatar"><i class="bx bx-bot"></i></div><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>`;
    this.chatLog.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();
    this.isTyping = false;
    if (this.sendBtn) this.sendBtn.disabled = false;
  }

  clearChat() {
    if (this.chatLog) this.chatLog.innerHTML = '';
    this.conversationHistory = [];
  }

  scrollToBottom() {
    if (this.chatLog) {
      setTimeout(() => { this.chatLog.scrollTop = this.chatLog.scrollHeight; }, 100);
    }
  }
}

// ---- Funções Globais para controlar a JANELA do Chatbot ----
function toggleChatbot(event) {
  console.log('toggleChatbot chamado'); // Depuração
  event?.stopPropagation(); // Impede propagação do evento
  const container = document.getElementById('chatbot-container');
  const btn = document.getElementById('chatbot-btn');
  if (container && btn) {
    const isActive = container.classList.toggle('active');
    console.log('Estado ativo:', isActive); // Depuração
    btn.classList.toggle('active');
    btn.innerHTML = isActive ? '<i class="bx bx-x"></i>' : '<i class="bx bx-message-dots"></i>';
  } else {
    console.error('Erro: container ou chatbot-btn não encontrados'); // Depuração
  }
}

function closeChatbot(event) {
  console.log('closeChatbot chamado'); // Depuração
  event?.stopPropagation(); // Impede propagação do evento
  const container = document.getElementById('chatbot-container');
  const btn = document.getElementById('chatbot-btn');
  if (container && btn) {
    container.classList.remove('active', 'maximized');
    btn.classList.remove('active');
    btn.innerHTML = '<i class="bx bx-message-dots"></i>';
  } else {
    console.error('Erro: container ou chatbot-btn não encontrados'); // Depuração
  }
}

function toggleMaximizeChatbot(event) {
  console.log('toggleMaximizeChatbot chamado'); // Depuração
  event.stopPropagation(); // Impede que o clique propague para o ouvinte de "clique fora"
  const container = document.getElementById('chatbot-container');
  const maximizeBtn = document.getElementById('maximize-btn');
  if (container && maximizeBtn) {
    console.log('Container e botão encontrados, alternando classe maximized'); // Depuração
    const isMaximized = container.classList.toggle('maximized');
    console.log('Estado maximizado:', isMaximized); // Depuração
    if (isMaximized) {
      maximizeBtn.innerHTML = '<i class="bx bx-exit-fullscreen"></i>';
      maximizeBtn.title = 'Minimizar';
    } else {
      maximizeBtn.innerHTML = '<i class="bx bx-fullscreen"></i>';
      maximizeBtn.title = 'Maximizar';
    }
    const chatLog = document.getElementById('chat-log-float');
    if (chatLog) {
      setTimeout(() => { chatLog.scrollTop = chatLog.scrollHeight; }, 300);
    }
  } else {
    console.error('Erro: container ou maximizeBtn não encontrados'); // Depuração
  }
}

// ---- Inicialização ----
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM carregado, inicializando FloatingChatBot'); // Depuração
  window.floatingChatbot = new FloatingChatBot();

  // Adicionar ouvinte de eventos para o botão de maximizar com verificação dinâmica
  const initializeMaximizeButton = () => {
    const maximizeBtn = document.getElementById('maximize-btn');
    if (maximizeBtn) {
      console.log('Botão maximize-btn encontrado, adicionando ouvinte'); // Depuração
      maximizeBtn.addEventListener('click', (event) => {
        event.stopPropagation(); // Redundância para garantir que o clique não propague
        toggleMaximizeChatbot(event);
      });
    } else {
      console.warn('Botão maximize-btn não encontrado, tentando novamente em 500ms'); // Depuração
      setTimeout(initializeMaximizeButton, 500); // Tenta novamente após 500ms
    }
  };
  initializeMaximizeButton();

  // Fechar ao clicar fora
  document.addEventListener('click', (event) => {
    const container = document.getElementById('chatbot-container');
    const btn = document.getElementById('chatbot-btn');
    const maximizeBtn = document.getElementById('maximize-btn');
    if (container && btn && container.classList.contains('active') && !container.contains(event.target) && !btn.contains(event.target) && !maximizeBtn?.contains(event.target)) {
      console.log('Clicado fora, fechando chatbot'); // Depuração
      closeChatbot(event);
    }
  });
});