# 🐱 Siggy — Ritual Network AI Chat Assistant

> A chatbot with personality. Ask Siggy anything about **Ritual Network** — or anything else — in **Mystical**, **Witty**, or **Unhinged** mode.

Built with **Next.js 14**, **Groq API**, and a custom **RAG pipeline** over Ritual Foundation docs.

---

## ✨ Features

- 🔮 **3 Personas** — Mystical, Witty, Unhinged — each with distinct system prompts
- 📚 **RAG Pipeline** — Retrieves relevant Ritual Network docs before answering
- ⚡ **Streaming** — Token-by-token response via SSE
- 🌑 **Dark theme** — Minimal, cat-brained UI
- 🛡️ **Rate limiting** — Per-IP protection built in
- 📱 **Responsive** — Works on mobile and desktop

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # / → redirects to /chat
│   ├── chat/page.tsx         # /chat — main AI chat page
│   └── api/
│       ├── chat/route.ts     # POST /api/chat — streaming endpoint
│       └── health/route.ts   # GET  /api/health — status check
├── components/
│   ├── chat/                 # All chat UI components
│   └── layout/               # Header
├── hooks/
│   ├── useChat.ts            # SSE streaming chat logic
│   └── usePersona.ts         # Persona state (persisted to localStorage)
├── lib/
│   ├── groq.ts               # Groq client
│   ├── constants.ts          # Ritual doc URLs, RAG config
│   ├── utils.ts              # cn(), cosine similarity, etc.
│   ├── prompts/              # System prompts per persona
│   └── rag/                  # RAG pipeline (chunks, embeddings, retriever)
├── data/
│   ├── documents/            # Scraped docs (.txt) — auto-generated
│   └── embeddings/           # Vector store (.json) — auto-generated
├── types/index.ts            # All TypeScript types
└── styles/globals.css        # Global styles + Tailwind
scripts/
├── scrape-docs.ts            # Scrape 15 Ritual docs pages
└── generate-embeddings.ts    # Build TF-IDF vector store
```

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd siggy-bot
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your **Groq API key**:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxx
```

Get your free key at: https://console.groq.com

### 3. Build the knowledge base

This scrapes 15 Ritual Network documentation pages and builds the RAG vector store:

```bash
npm run setup-kb
```

Or run steps individually:

```bash
npm run scrape   # Scrape docs → src/data/documents/
npm run embed    # Build vector store → src/data/embeddings/
```

### 4. Start dev server

```bash
npm run dev
```

Open [http://localhost:3000/chat](http://localhost:3000/chat)

---

## 🧠 How the RAG Pipeline Works

```
User question
     │
     ▼
TF-IDF embedding of query
     │
     ▼
Cosine similarity search over vector store
     │
     ▼
Top-5 most relevant Ritual doc chunks retrieved
     │
     ▼
Context injected into system prompt
     │
     ▼
Groq LLM (llama-3.3-70b-versatile) generates answer
     │
     ▼
Streamed token-by-token to the browser
```

The RAG pipeline uses a lightweight **TF-IDF** embedding approach — no external embedding API needed. Vocabulary is built from all scraped documents at build time.

---

## 🎭 Personas

| Persona | Vibe | Color |
|---|---|---|
| 🔮 Mystical | Oracle cat, cosmic metaphors | Purple |
| 😏 Witty | Sharp, sarcastic, cat puns | Amber |
| 🤪 Unhinged | 3AM zoomies energy, ALL CAPS | Pink |

---

## 🔌 API

### `POST /api/chat`

**Request:**
```json
{
  "message": "What is Ritual Network?",
  "persona": "mystical",
  "history": [
    { "role": "user", "content": "Hi Siggy!" },
    { "role": "assistant", "content": "The stars align..." }
  ]
}
```

**Response:** Server-Sent Events stream
```
data: {"token":"Ritual"}
data: {"token":" is"}
...
data: {"done":true,"sources":["what-is-ritual","crypto-x-ai"]}
```

### `GET /api/health`

Returns vector store status and chunk count.

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| LLM | Groq API (llama-3.3-70b-versatile) |
| Embeddings | Custom TF-IDF (no external service) |
| Streaming | Native SSE (ReadableStream) |
| Icons | lucide-react |
| Markdown | react-markdown + remark-gfm + rehype-highlight |

---

## 📄 License

MIT
