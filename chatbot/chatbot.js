/// chatbot.js - JavaScript do Chatbot

class ChatBot {
  constructor() {
    this.chatLog = document.getElementById('chat-log');
    this.userInput = document.getElementById('user-input');
    this.sendBtn = document.getElementById('send-btn');
    this.botTypeSelect = document.getElementById('bot-type');
    
    this.isTyping = false;
    this.conversationHistory = [];
    
    this.init();
  }

  init() {
    // Event listeners
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

    // Mostrar mensagem de boas-vindas inicial
    this.showWelcomeMessage();
  }

  showWelcomeMessage() {
    const botType = this.botTypeSelect?.value || 'ajudante';
    const welcomeMessages = {
      ajudante: "Olá! 👋 Sou o seu assistente de programação. Posso ajudar com código, debugging, explicações técnicas e muito mais!",
      explicador: "Olá! 📖 Sou especializado em explicar código de forma simples e clara. Cole seu código e eu explico como funciona!",
      motivador: "Olá! 💪 Sou o seu coach motivacional em programação! Vamos juntos superar os desafios e alcançar seus objetivos!"
    };

    if (this.chatLog) {
      this.chatLog.innerHTML = `
        <div class="welcome-message">
          <i class="bx bx-bot"></i>
          <p>${welcomeMessages[botType]}</p>
          <small>Selecione um tipo de assistente acima e comece a conversar!</small>
        </div>
      `;
    }
  }

  async sendMessage() {
    const message = this.userInput?.value.trim();
    if (!message || this.isTyping) return;

    const botType = this.botTypeSelect?.value || 'ajudante';

    // Adicionar mensagem do usuário
    this.addMessage(message, 'user');
    this.userInput.value = '';
    
    // Mostrar indicador de digitação
    this.showTyping();
    
    try {
      // Chamar a API real em vez da resposta simulada
      const response = await this.callExternalAPI(message, botType);
      this.hideTyping();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTyping();
      this.addMessage('Desculpe, ocorreu um erro ao conectar com o servidor. Verifique se a API está rodando.', 'bot', true);
      console.error('Erro no chatbot:', error);
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

  // Processar Markdown e código (apenas para o bot)
  if (sender === 'bot') {
    contentDiv.innerHTML = marked.parse(content);
    // Ativar highlight.js para blocos de código
    contentDiv.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  } else {
    contentDiv.textContent = content; // Mensagens do usuário sem formatação
  }

  messageDiv.appendChild(avatarDiv);
  messageDiv.appendChild(contentDiv);
  this.chatLog.appendChild(messageDiv);
  this.scrollToBottom();
}


  // Salvar no histórico
  this.conversationHistory.push({ sender, content, timestamp: new Date() });
}

  showTyping() {
    if (!this.chatLog) return;

    this.isTyping = true;
    this.sendBtn.disabled = true;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.innerHTML = '<i class="bx bx-bot"></i>';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
    
    typingDiv.appendChild(avatarDiv);
    typingDiv.appendChild(typingContent);
    this.chatLog.appendChild(typingDiv);
    this.scrollToBottom();
  }

  hideTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
    this.isTyping = false;
    this.sendBtn.disabled = false;
  }

  clearChat() {
    if (this.chatLog) {
      this.chatLog.innerHTML = '';
    }
    this.conversationHistory = [];
  }

  scrollToBottom() {
    if (this.chatLog) {
      // Força o scroll para o final com um pequeno delay
      setTimeout(() => {
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
      }, 100);
    }
  }

  // Método corrigido para integração com API externa
  async callExternalAPI(message, botType) {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
          message: message, 
          bot: botType 
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
}

// Funções para o chatbot flutuante
function toggleChatbot() {
  const container = document.getElementById('chatbot-container');
  const btn = document.getElementById('chatbot-btn');
  
  if (container && btn) {
    const isActive = container.classList.contains('active');
    
    if (isActive) {
      container.classList.remove('active');
      btn.classList.remove('active');
      btn.innerHTML = '<i class="bx bx-message-dots"></i>';
    } else {
      container.classList.add('active');
      btn.classList.add('active');
      btn.innerHTML = '<i class="bx bx-x"></i>';
    }
  }
}

function closeChatbot() {
  const container = document.getElementById('chatbot-container');
  const btn = document.getElementById('chatbot-btn');
  
  if (container && btn) {
    container.classList.remove('active');
    container.classList.remove('maximized');
    btn.classList.remove('active');
    btn.innerHTML = '<i class="bx bx-message-dots"></i>';
  }
}

// Nova função para maximizar/minimizar o chatbot
function toggleMaximizeChatbot() {
  const container = document.getElementById('chatbot-container');
  const maximizeBtn = document.getElementById('maximize-btn');
  
  if (container && maximizeBtn) {
    const isMaximized = container.classList.contains('maximized');
    
    if (isMaximized) {
      // Minimizar
      container.classList.remove('maximized');
      maximizeBtn.innerHTML = '<i class="bx bx-fullscreen"></i>';
      maximizeBtn.title = 'Maximizar';
    } else {
      // Maximizar
      container.classList.add('maximized');
      maximizeBtn.innerHTML = '<i class="bx bx-exit-fullscreen"></i>';
      maximizeBtn.title = 'Minimizar';
    }
    
    // Força o scroll para o final após a mudança de tamanho
    setTimeout(() => {
      const chatLog = document.getElementById('chat-log-float');
      if (chatLog) {
        chatLog.scrollTop = chatLog.scrollHeight;
      }
    }, 300);
  }
}

// Função global para enviar mensagem (compatibilidade)
function sendMessage() {
  if (window.chatbotInstance) {
    window.chatbotInstance.sendMessage();
  }
}

// Inicializar o chatbot quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  window.chatbotInstance = new ChatBot();
});

// Fechar chatbot ao clicar fora dele
document.addEventListener('click', function(event) {
  const container = document.getElementById('chatbot-container');
  const btn = document.getElementById('chatbot-btn');
  
  if (container && btn && container.classList.contains('active')) {
    if (!container.contains(event.target) && !btn.contains(event.target)) {
      closeChatbot();
    }
  }
});