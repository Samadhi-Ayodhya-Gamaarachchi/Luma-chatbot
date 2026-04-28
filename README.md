<div align="center">

# 🌙 Luma — Offline AI Assistant

**Your private AI, running locally on your machine.**

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Ollama](https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white)

*Luma is a lightweight, fully offline AI chatbot built using local LLMs.*  
*It runs directly on your computer — no cloud, no API keys, no data sharing.*

</div>

## ✨ Features

| Feature | Description |
|---|---|
| ⚡ **100% Offline** | Runs entirely using Ollama — no internet needed |
| 💬 **Clean UI** | Minimal and distraction-free chat interface |
| 🔒 **Privacy-First** | No data ever leaves your device |
| 🤖 **Powered by llama3.2:3b & moondream** | Capable local model & moondream for image upload  |
| 🎯 **Beginner-Friendly** | Simple architecture, easy to understand and extend |

---

## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| 🎨 **HTML** | Structure & layout |
| 🎨 **CSS** | Styling & design |
| ⚙️ **JavaScript** | Frontend logic |
| 🧠 **Ollama** | Local LLM runtime |
| 💡 **Gemini** | Built with guidance from Gemini |

---

## 🚀 Getting Started

### 1. Install Ollama

Download and install Ollama from: [https://ollama.com](https://ollama.com)

### 2. Pull the model

```bash
ollama pull llama3.2:3b
ollama pull moondream
```

### 3. Run Ollama

```bash
ollama run llama3.2:3b
ollama run moondream
```

### 4. Clone this repository

```bash
git clone https://github.com/your-username/Luma-chatbot.git
cd Luma-chatbot
```

### 5. Run the project

You need a local server to avoid CORS issues.

**Using VS Code:**
1. Install the **Live Server** extension
2. Right-click `index.html`
3. Click **"Open with Live Server"**

---

## 🧩 How It Works

```
User types a message
        ↓
Frontend sends request to Ollama API
        ↓
Local llama3.2:3b model processes the prompt
        ↓
Response is streamed back and displayed in the chat UI
```

---

## 📂 Project Structure

```
luma-ai/
├── chatbot.html    # Main chat interface
├── chatbot.css     # Styling
├── chatbot.js      # Frontend logic & Ollama API calls
├── chat-logic.js   # Ollama API calls
└── README.md       # Project documentation
```

---

## ⚠️ Known Issue

### CORS Error

Direct browser requests to Ollama (`localhost:11434`) may fail due to CORS policy.

**Temporary Fix:**
- ✅ Use **Live Server** (as done in this project)

**Recommended Fix (Future Improvement):**
- 🔧 Add a **Node.js backend proxy** to relay requests

---

## 🌙 Future Improvements

- [ ] 🧠 Add conversation memory
- [ ] 🔊 Voice input & output
- [ ] 🌗 Dark mode toggle
- [ ] 📂 File upload (PDF / notes assistant)
- [ ] ⚙️ Backend integration (Node.js)
- [ ] 💾 Save & restore chat history

---

## 📸 Preview

<div align="center">

<img width="900" alt="image" src="https://github.com/user-attachments/assets/2ca9049e-ce93-476b-9f81-7ff00c46fe1f" />


</div>

---

## 💡 Inspiration

> Luma was built to explore how far we can go with local AI  
> without relying on cloud services.

---

## 🙌 Acknowledgements

- [Ollama](https://ollama.com) — for making local LLMs accessible to everyone
- [llama3.2:3b](https://ollama.com/library/llama3.2) — the model powering Luma
- [Gemini](https://gemini.google.com) — for guidance during development
