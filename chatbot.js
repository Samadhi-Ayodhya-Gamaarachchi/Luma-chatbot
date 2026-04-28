const input = document.getElementById('user-input');
const chatWindow = document.getElementById('chat-window');
const imageInput = document.getElementById('image-input');
const previewContainer = document.getElementById('preview-container');

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

function addMessage(content, cls, isImage = false) {
    const div = document.createElement('div');
    div.className = 'msg ' + cls;

    if (isImage) {
        
        const img = document.createElement('img');
        img.src = content;
        img.style.maxWidth = '200px'; // controll the image size
        img.style.borderRadius = '10px';
        div.appendChild(img);
    } else {
        // if letters it can be text like normal
        div.textContent = content;
    }

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

let selectedFile = null; // variable for keep file

// put image in to selectedFiles when the image selected 
imageInput.addEventListener('change', function() {
    selectedFile = this.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // show preview
            previewContainer.innerHTML = `
                <div class="preview-item">
                    <img src="${e.target.result}" style="max-width: 100px; border-radius: 10px;">
                    <span onclick="clearImage()" class="remove-btn">×</span>
                </div>
            `;
        }
        reader.readAsDataURL(selectedFile);
    }
});

function clearImage() {
    selectedFile = null;
    imageInput.value = '';
    previewContainer.innerHTML = '';
}

async function askAI() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();

    if (!message && !selectedFile) return;

    // show image
    if (selectedFile) {
        const tempReader = new FileReader();
        tempReader.onload = function(e) {
            addMessage(e.target.result, 'user', true);
        };
        tempReader.readAsDataURL(selectedFile);
    }
    
    if (message) {
        addMessage(message, 'user');
    }

    const currentFile = selectedFile; 
    inputField.value = '';
    clearImage(); 
    showTyping();

    try {
        let aiResponse;
        
        if (currentFile) {
            // if there image use version model moondream 
            aiResponse = await getVisionResponse(message, currentFile);
        } else {
            // if it is normal text use chat model gemma 
            aiResponse = await getAIResponse(message);
        }

        removeTyping();
        addMessage(aiResponse, 'ai');

    } catch (error) {
        removeTyping();
        addMessage('Something went wrong! Check Ollama connection.', 'ai error');
    }
}