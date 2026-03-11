// ─── Persona Types ────────────────────────────────────────────────────────────

export type Persona = 'mystical' | 'witty' | 'unhinged';

export interface PersonaConfig {
  id: Persona;
  label: string;
  emoji: string;
  color: string;
  borderColor: string;
  bgColor: string;
  description: string;
  welcomeMessage: string;
}

// ─── Chat Types ───────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  sources?: string[];
}

export interface ChatHistory {
  role: MessageRole;
  content: string;
}

// ─── API Types ────────────────────────────────────────────────────────────────

export interface ChatRequest {
  message: string;
  persona: Persona;
  history: ChatHistory[];
}

export interface ChatResponse {
  token?: string;
  done?: boolean;
  sources?: string[];
  error?: string;
}

// ─── RAG Types ────────────────────────────────────────────────────────────────

export interface DocumentChunk {
  id: string;
  content: string;
  source: string;
  title: string;
  url: string;
  embedding?: number[];
}

export interface VectorStoreEntry {
  chunk: DocumentChunk;
  embedding: number[];
}

export interface RetrievalResult {
  chunk: DocumentChunk;
  score: number;
}

// ─── Scraper Types ────────────────────────────────────────────────────────────

export interface RitualDoc {
  title: string;
  url: string;
  slug: string;
  content: string;
}
