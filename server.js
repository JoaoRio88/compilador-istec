const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000; // Render usa porta 10000 por padrão

// ===== CONFIGURAÇÃO PARA RENDER =====
// Render automaticamente define NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// ===== CONFIGURAÇÕES =====
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Configuração de sessões - Otimizada para Render
app.use(session({
    secret: process.env.SESSION_SECRET || 'secret-key-compilador-istec',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        httpOnly: true,
        sameSite: 'lax' // Importante para OAuth
    }
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// ===== CONFIGURAÇÃO GOOGLE OAUTH =====
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Verificar se o email é do domínio @my.istec.pt
        const email = profile.emails[0].value;
        const domain = email.split('@')[1];
        
        console.log(`🔍 Tentativa de login: ${email}`);
        
        if (domain !== 'my.istec.pt') {
            console.log(`❌ Domínio não autorizado: ${domain}`);
            return done(null, false, { 
                message: 'Apenas contas @my.istec.pt são permitidas' 
            });
        }
        
        // Criar objeto do utilizador
        const user = {
            id: profile.id,
            name: profile.displayName,
            email: email,
            photo: profile.photos[0].value,
            domain: domain,
            loginTime: new Date()
        };
        
        console.log(`✅ Login aprovado: ${email}`);
        return done(null, user);
        
    } catch (error) {
        console.error('❌ Erro na autenticação:', error);
        return done(error, null);
    }
}));

// Serialização do utilizador
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// ===== MIDDLEWARE DE AUTENTICAÇÃO =====
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

function isIstecDomain(req, res, next) {
    if (req.isAuthenticated() && req.user.email.endsWith('@my.istec.pt')) {
        return next();
    }
    res.redirect('/login?error=domain');
}

// ===== ROTAS DE AUTENTICAÇÃO =====

// Página de login
app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Iniciar autenticação Google
app.get('/auth/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        hd: 'my.istec.pt'
    })
);

// Callback do Google
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login?error=auth' }),
    (req, res) => {
        console.log(`🎉 Login bem-sucedido: ${req.user.email}`);
        res.redirect('/');
    }
);

// Logout
app.get('/logout', (req, res) => {
    const userName = req.user ? req.user.name : 'Utilizador';
    req.logout((err) => {
        if (err) {
            console.error('Erro ao fazer logout:', err);
        }
        console.log(`👋 Logout: ${userName}`);
        req.session.destroy();
        res.redirect('/login?message=logout');
    });
});

// ===== ROTAS PROTEGIDAS =====

// Página principal - protegida
app.get('/', isIstecDomain, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API para obter informações do utilizador
app.get('/api/user', isAuthenticated, (req, res) => {
    res.json({
        success: true,
        user: {
            name: req.user.name,
            email: req.user.email,
            photo: req.user.photo,
            loginTime: req.user.loginTime
        }
    });
});

// Verificar se está autenticado (para AJAX)
app.get('/api/check-auth', (req, res) => {
    res.json({
        authenticated: req.isAuthenticated(),
        user: req.isAuthenticated() ? {
            name: req.user.name,
            email: req.user.email,
            photo: req.user.photo
        } : null
    });
});

// ===== ROTAS ESTÁTICAS PROTEGIDAS =====
app.get('/compilador/*', isIstecDomain, (req, res, next) => {
    next();
});

app.get('/paginas/*', isIstecDomain, (req, res, next) => {
    next();
});

// ===================== ROTAS DO CHATBOT =====================

// Importar fetch
let fetch;
try {
    fetch = globalThis.fetch;
} catch {
    fetch = require('node-fetch');
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

function getBotPersonality(botType) {
    const personalities = {
        ajudante: `Você é um assistente especializado em programação para iniciantes. 
        Seja direto, técnico e útil. Foque em soluções práticas. 
        Use linguagem simples e evite termos muito técnicos sem explicar.
        Sempre forneça exemplos de código quando relevante.`,
        
        explicador: `Você é um especialista em explicar código de forma didática. 
        Use linguagem simples e exemplos claros. 
        Divida explicações complexas em passos simples.
        Sempre explique o "porquê" além do "como".`,
        
        motivador: `Você é um coach motivacional para programadores iniciantes. 
        Seja encorajador, positivo e inspire confiança. 
        Celebre pequenas vitórias e ajude a superar frustrações.
        Mantenha sempre um tom otimista e motivacional.`
    };
    return personalities[botType] || personalities.ajudante;
}

// Health check para Render
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Endpoint de teste para verificar se o Gemini está funcionando
app.get('/api/test-gemini', async (req, res) => {
    console.log('🧪 Testando conexão com Gemini...');
    
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ 
            success: false, 
            error: 'GEMINI_API_KEY não configurada' 
        });
    }
    
    try {
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Olá, você está funcionando?" }] }]
            })
        });
        
        const data = await response.json();
        console.log('✅ Gemini respondeu:', data);
        res.json({ success: true, data });
    } catch (error) {
        console.error('❌ Erro no teste Gemini:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ENDPOINT PRINCIPAL DO CHATBOT
app.post('/api/chatbot', async (req, res) => {
    console.log('🤖 Requisição chatbot recebida:', req.body);
    
    const { message, botType } = req.body;

    if (!message) {
        console.log('❌ Mensagem não fornecida');
        return res.status(400).json({ 
            success: false, 
            error: 'Mensagem não fornecida' 
        });
    }

    if (!GEMINI_API_KEY) {
        console.log('❌ GEMINI_API_KEY não configurada');
        return res.status(500).json({ 
            success: false, 
            error: 'Chave da API Gemini não configurada' 
        });
    }

    try {
        const personality = getBotPersonality(botType);
        const fullPrompt = `${personality}\n\nUsuário: ${message}`;
        
        console.log('📤 Enviando para Gemini:', { botType, message: message.substring(0, 50) + '...' });
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro HTTP Gemini:', response.status, errorText);
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log('📥 Resposta Gemini recebida');
        
        const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
                        "Desculpe, não consegui gerar uma resposta. Tente novamente.";
        
        console.log('✅ Enviando resposta para cliente');
        res.json({ success: true, reply: botReply });
        
    } catch (error) {
        console.error('❌ Erro no endpoint chatbot:', error);
        res.status(500).json({ 
            success: false, 
            error: `Erro interno: ${error.message}` 
        });
    }
});

// ===== MIDDLEWARE DE ERRO =====
app.use((err, req, res, next) => {
    console.error('❌ Erro no servidor:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: err.message 
    });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 ================================');
    console.log(`🌐 Servidor rodando na porta ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    
    if (process.env.NODE_ENV === 'production') {
        console.log('☁️  Executando no Render.com');
    } else {
        console.log(`🔗 URL local: http://localhost:${PORT}`);
    }
    
    console.log('🔐 Sistema de autenticação ativo');
    console.log('📧 Domínio permitido: @my.istec.pt');
    
    if (GEMINI_API_KEY) {
        console.log('🤖 Chatbot ativo com Gemini AI');
    } else {
        console.warn('⚠️  Chatbot inativo - Configure GEMINI_API_KEY');
    }
    
    console.log('🚀 ================================');
    
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.warn('⚠️  ATENÇÃO: Configure as variáveis de ambiente OAuth');
    }
});