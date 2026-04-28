//convert image base 64
function encodeImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });
}

// 1.normal text
async function getAIResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "gemma3:4b ", 
                prompt: userMessage,
                stream: false
            })
        });
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Text Error:", error);
        throw error;
    }
}

// this function should be in chat-logic.js 
async function getVisionResponse(userPrompt, file) {
    // helper for image convert to base 64
    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
    });

    try {
        const base64Image = await toBase64(file);
        
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: "moondream", 
                model: "gemma3:4b",
                prompt: userPrompt || "What is in this image?",
                images: [base64Image],
                stream: false
            })
        });

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error("Vision Error:", error);
        throw error;
    }
}