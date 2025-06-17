// Aguardar carregamento completo antes de executar qualquer código
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando scripts...');
    
    // ===== SIDEBAR =====
    initializeSidebar();
    
    // ===== I FRAME =====
    initializeIframe();
    
    // ===== DARK MODE =====
    initializeDarkMode();
    
    // ===== REPRODUTOR DE MÚSICA =====
    initializeAudioPlayer();
    
    // ===== INTEGRAÇÃO COM PROJETOS =====
    initializeProjectIntegration();
});

// ===== FUNÇÃO PARA INICIALIZAR SIDEBAR =====
function initializeSidebar() {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");
    let searchBtn = document.querySelector(".bx-search");

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            if (sidebar) {
                sidebar.classList.toggle("open");
                menuBtnChange();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            if (sidebar) {
                sidebar.classList.toggle("open");
                menuBtnChange();
            }
        });
    }

    // Função para mudar ícone do botão do menu
    function menuBtnChange() {
        if (sidebar && closeBtn) {
            if (sidebar.classList.contains("open")) {
                closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
            } else {
                closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
            }
        }
    }
}

// ===== FUNÇÃO IFRAME =====
function initializeIframe() {
    // Carrega o conteúdo do template na div (se existir)
    const template = document.querySelector("#template-conteudo");
    const conteudoDiv = document.querySelector("#conteudo");
    if (template && conteudoDiv) {
        conteudoDiv.appendChild(template.content.cloneNode(true));
    }

    // Ajuste da altura do iframe
    window.onresize = function() {
        const iframe = document.getElementById("conteudo-frame");
        if (iframe) {
            iframe.style.height = window.innerHeight + 'px';
        }
    };

    // Enviar mensagem de tema para o iframe
    const iframe = document.getElementById("conteudo-frame");
    if (iframe) {
        iframe.onload = function() {
            const currentTheme = localStorage.getItem("theme") || "light";
            iframe.contentWindow.postMessage(`${currentTheme}-mode`, "*");
        };
    }
}

// ===== FUNÇÃO PARA CARREGAR CONTEÚDO =====
function carregarConteudo(caminho) {
    const iframe = document.getElementById("conteudo-frame");
    if (iframe) {
        iframe.src = caminho;

        iframe.onload = function() {
            iframe.style.height = window.innerHeight + 'px';
            const currentTheme = localStorage.getItem("theme") || "light";
            iframe.contentWindow.postMessage(`${currentTheme}-mode`, "*");
        };
    } else {
        console.error('Iframe não encontrado!');
    }
}

// ===== DARK MODE =====
function initializeDarkMode() {
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const isIframe = window.self !== window.top;

    // Verifica a preferência salva no localStorage
    const currentTheme = localStorage.getItem("theme") || "light";
    body.classList.add(`${currentTheme}-mode`);
    if (themeToggleButton) {
        themeToggleButton.innerHTML = currentTheme === "dark" ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";
    }

    // Se não for um iframe, adiciona o evento de alternância ao botão
    if (!isIframe && themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');
            const mode = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', mode);
            themeToggleButton.innerHTML = mode === 'dark' ? "<i class='bx bx-sun'></i>" : "<i class='bx bx-moon'></i>";

            // Envia mensagem para o iframe (se existir)
            const iframe = document.getElementById('conteudo-frame');
            if (iframe) {
                iframe.contentWindow.postMessage(`${mode}-mode`, '*');
            }
        });
    }

    // Se for um iframe, escuta as mensagens do pai para ajustar o tema
    if (isIframe) {
        window.addEventListener('message', (event) => {
            if (event.data === 'dark-mode') {
                body.classList.add('dark-mode');
                body.classList.remove('light-mode');
            } else if (event.data === 'light-mode') {
                body.classList.add('light-mode');
                body.classList.remove('dark-mode');
            }
        });
    }
}

// ===== INTEGRAÇÃO COM PROJETOS =====
function initializeProjectIntegration() {
    window.addEventListener('message', function(event) {
        if (event.data.type === 'loadProject') {
            carregarConteudo('compilador/compilador.html');
            
            setTimeout(function() {
                const iframe = document.getElementById('conteudo-frame');
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage({
                        type: 'loadProject',
                        html: event.data.html,
                        css: event.data.css,
                        js: event.data.js,
                        nome: event.data.nome
                    }, '*');
                }
            }, 1000);
        }
    });
}

// ===== REPRODUTOR DE MÚSICA =====
let audioPlayer = {
    audio: null,
    tracks: [
        { 
            name: 'Queen', 
            path: 'sound/Queen.mp3'
        },
        { 
            name: 'The Animals', 
            path: 'sound/The Animals.mp3'
        }
        ],
    currentTrackIndex: 0,
    isPlaying: false,
    elements: {},
    initialized: false
};

function initializeAudioPlayer() {
    console.log('Tentando inicializar reprodutor de música...');
    
    // Buscar elementos DOM
    audioPlayer.elements = {
        audio: document.getElementById('audio-element'),
        playPauseBtn: document.getElementById('play-pause'),
        stopBtn: document.getElementById('stop'),
        nextBtn: document.getElementById('next-track'),
        prevBtn: document.getElementById('prev-track'),
        trackName: document.getElementById('track-name')
    };
    
    // Verificar se elementos críticos existem
    if (!audioPlayer.elements.audio) {
        console.warn('Elemento audio-element não encontrado - reprodutor não será inicializado');
        return;
    }
    
    if (!audioPlayer.elements.playPauseBtn) {
        console.warn('Botão play-pause não encontrado - reprodutor não será inicializado');
        return;
    }
    
    console.log('Elementos do reprodutor encontrados, configurando...');
    
    const { audio, playPauseBtn, stopBtn, nextBtn, prevBtn, trackName } = audioPlayer.elements;
    
    // Event Listeners dos botões
    playPauseBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Play/Pause clicado');
        togglePlayPause();
    });
    
    if (stopBtn) {
        stopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Stop clicado');
            stopTrack();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Próxima música');
            nextTrack();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Música anterior');
            prevTrack();
        });
    }
    
    // Event listeners do áudio
    audio.addEventListener('loadstart', function() {
        console.log('Carregando música...');
        updateTrackName('Carregando...');
    });
    
    audio.addEventListener('canplay', function() {
        console.log('Música pronta');
        updateTrackName(audioPlayer.tracks[audioPlayer.currentTrackIndex].name);
    });
    
    audio.addEventListener('error', function(e) {
        console.error('Erro no áudio:', e);
        console.error('Caminho:', audio.src);
        updateTrackName('Erro: arquivo não encontrado');
        testAudioFile(audio.src);
    });
    
    audio.addEventListener('play', function() {
        audioPlayer.isPlaying = true;
        updatePlayButton();
    });
    
    audio.addEventListener('pause', function() {
        audioPlayer.isPlaying = false;
        updatePlayButton();
    });
    
    audio.addEventListener('ended', function() {
        nextTrack();
    });
    
    // Marcar como inicializado
    audioPlayer.initialized = true;
    
    // Carregar primeira música
    loadTrack(audioPlayer.currentTrackIndex);
    updatePlayButton();
    
    console.log('Reprodutor inicializado com sucesso!');
    
    // Teste inicial
    testAllAudioFiles();
}

function testAudioFile(path) {
    fetch(path)
        .then(response => {
            if (response.ok) {
                console.log(`✓ Arquivo encontrado: ${path}`);
            } else {
                console.error(`✗ Arquivo não encontrado (${response.status}): ${path}`);
            }
        })
        .catch(error => {
            console.error(`✗ Erro ao acessar arquivo: ${path}`, error);
        });
}

function testAllAudioFiles() {
    console.log('Testando todos os arquivos de áudio...');
    audioPlayer.tracks.forEach((track, index) => {
        console.log(`Testando ${index + 1}: ${track.path}`);
        testAudioFile(track.path);
    });
}

function loadTrack(index) {
    if (index < 0 || index >= audioPlayer.tracks.length) {
        console.error('Índice inválido:', index);
        return;
    }
    
    const track = audioPlayer.tracks[index];
    const audio = audioPlayer.elements.audio;
    
    if (!audio) {
        console.error('Elemento audio não existe');
        return;
    }
    
    console.log('Carregando:', track.name, 'de', track.path);
    
    if (!audio.paused) {
        audio.pause();
    }
    
    audio.src = track.path;
    audioPlayer.currentTrackIndex = index;
    updateTrackName('Carregando...');
    audio.load();
}

function togglePlayPause() {
    const audio = audioPlayer.elements.audio;
    
    if (!audio || !audio.src) {
        console.log('Carregando primeira música...');
        loadTrack(0);
        setTimeout(() => {
            if (audio && audio.src) {
                playTrack();
            }
        }, 1000);
        return;
    }
    
    if (audio.paused || audio.ended) {
        playTrack();
    } else {
        pauseTrack();
    }
}

function playTrack() {
    const audio = audioPlayer.elements.audio;
    
    if (!audio) return;
    
    console.log('Tentando reproduzir...');
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Reprodução iniciada');
            audioPlayer.isPlaying = true;
            updatePlayButton();
        }).catch(error => {
            console.error('Erro na reprodução:', error);
            
            switch(error.name) {
                case 'NotAllowedError':
                    updateTrackName('Clique para permitir áudio');
                    break;
                case 'NotSupportedError':
                    updateTrackName('Formato não suportado');
                    break;
                default:
                    updateTrackName('Erro na reprodução');
            }
            
            audioPlayer.isPlaying = false;
            updatePlayButton();
        });
    }
}

function pauseTrack() {
    const audio = audioPlayer.elements.audio;
    if (audio) {
        audio.pause();
        audioPlayer.isPlaying = false;
        updatePlayButton();
    }
}

function stopTrack() {
    const audio = audioPlayer.elements.audio;
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audioPlayer.isPlaying = false;
        updatePlayButton();
    }
}

function nextTrack() {
    const wasPlaying = audioPlayer.elements.audio && !audioPlayer.elements.audio.paused;
    const nextIndex = (audioPlayer.currentTrackIndex + 1) % audioPlayer.tracks.length;
    
    loadTrack(nextIndex);
    
    if (wasPlaying) {
        setTimeout(() => playTrack(), 1000);
    }
}

function prevTrack() {
    const wasPlaying = audioPlayer.elements.audio && !audioPlayer.elements.audio.paused;
    const prevIndex = (audioPlayer.currentTrackIndex - 1 + audioPlayer.tracks.length) % audioPlayer.tracks.length;
    
    loadTrack(prevIndex);
    
    if (wasPlaying) {
        setTimeout(() => playTrack(), 1000);
    }
}

function updatePlayButton() {
    const playPauseBtn = audioPlayer.elements.playPauseBtn;
    if (!playPauseBtn) return;
    
    const icon = playPauseBtn.querySelector('i');
    if (icon) {
        if (audioPlayer.isPlaying && audioPlayer.elements.audio && !audioPlayer.elements.audio.paused) {
            icon.className = 'bx bx-pause';
            playPauseBtn.title = 'Pausar';
        } else {
            icon.className = 'bx bx-play';
            playPauseBtn.title = 'Reproduzir';
        }
    }
}

function updateTrackName(name) {
    const trackNameElement = audioPlayer.elements.trackName;
    if (trackNameElement) {
        trackNameElement.textContent = name;
    }
}

// ===== FUNÇÃO DE DEBUG =====
function debugPlayer() {
    console.log('=== DEBUG DO PLAYER ===');
    console.log('Inicializado:', audioPlayer.initialized);
    console.log('Elementos DOM encontrados:');
    Object.keys(audioPlayer.elements).forEach(key => {
        console.log(`  ${key}:`, !!audioPlayer.elements[key]);
    });
    
    if (audioPlayer.elements.audio) {
        const audio = audioPlayer.elements.audio;
        console.log('Audio src:', audio.src);
        console.log('Audio paused:', audio.paused);
        console.log('Audio readyState:', audio.readyState);
        console.log('Audio networkState:', audio.networkState);
        console.log('Audio currentTime:', audio.currentTime);
        console.log('Audio duration:', audio.duration);
    }
    
    console.log('Faixas disponíveis:', audioPlayer.tracks.length);
    console.log('Faixa atual:', audioPlayer.currentTrackIndex);
    console.log('========================');
}

// Disponibilizar funções globalmente
window.carregarConteudo = carregarConteudo;
window.debugPlayer = debugPlayer;

// Dark-mode tema ============================================================
const themeToggleButton = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const body = document.body;

themeToggleButton.addEventListener('click', () => {
    // Alterna a classe 'dark-mode' no body
    const isDarkMode = body.classList.toggle('dark-mode');
    
    // Alterna entre os ícones
    if (isDarkMode) {
        toggleIcon.classList.replace('fa-sun', 'fa-moon'); // Troca para o ícone da lua
    } else {
        toggleIcon.classList.replace('fa-moon', 'fa-sun'); // Troca para o ícone do sol
    }
});