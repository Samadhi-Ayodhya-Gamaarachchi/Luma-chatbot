const input = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');

// Enter to send, Shift+Enter for new line
input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        askAI();
    }
});

// Auto-grow textarea
input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 90) + 'px';
});

function addMessage(text, cls) {
    const div = document.createElement('div');
    div.className = 'msg ' + cls;
    div.textContent = text;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return div;
}

function showTyping() {
    const div = document.createElement('div');
    div.className = 'typing-bubble';
    div.id = 'typing-indicator';
    div.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();
}

async function askAI() {
    const message = input.value.trim();
    if (!message) return;

    // Remove welcome message on first send
    const welcome = chatWindow.querySelector('.welcome');
    if (welcome) welcome.remove();

    addMessage(message, 'user');
    input.value = '';
    input.style.height = 'auto';
    showTyping();

    try {
        //  call Ollama API directly
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "llama3.2:3b",
                prompt: message,
                system: "You are a helpful AI assistant. Please respond only in English.",
                stream: false
            })
        });

        const data = await response.json();
        removeTyping();
        addMessage(data.response, 'ai');

    } catch (error) {
        removeTyping();
        addMessage('Error! Check if Ollama is running on localhost:11434', 'ai error');
    }
}