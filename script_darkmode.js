document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const body = document.body;
  const iframe = document.getElementById("conteudo-frame");
  const isIframe = window.self !== window.top;

  const updateButtonIcon = (isDarkMode) => {
    if (toggleButton) {
      toggleButton.innerHTML = isDarkMode
        ? "<i class='bx bx-sun'></i>"
        : "<i class='bx bx-moon'></i>";
    }
  };

  const updateCodeMirrorTheme = (isDarkMode) => {
    try {
      if (typeof editor !== "undefined" && editor) {
        editor.setOption("theme", isDarkMode ? "dracula" : "default");
      }
    } catch (e) {
      console.warn("Editor CodeMirror não encontrado:", e);
    }
  };

  const applyTheme = (theme) => {
    const isDarkMode = theme === "dark";
    body.classList.toggle("dark-mode", isDarkMode);
    body.classList.toggle("light-mode", !isDarkMode);
    localStorage.setItem("theme", theme);
    updateButtonIcon(isDarkMode);
	
    updateCodeMirrorTheme(isDarkMode);
    if (iframe && !isIframe) {
      iframe.contentWindow.postMessage(`${theme}-mode`, "*");
    }
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  if (!isIframe && toggleButton) {
    toggleButton.addEventListener("click", () => {
      const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });
  }

  if (isIframe) {
    window.addEventListener("message", (event) => {
      if (event.data === "dark-mode" || event.data === "light-mode") {
        applyTheme(event.data.split("-")[0]);
      }
    });
  }
});