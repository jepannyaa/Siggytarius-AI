import Groq from 'groq-sdk';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY environment variable is not set');
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const GROQ_MODEL = "llama-3.3-70b-versatile";
export const GROQ_FALLBACK_MODEL = "llama-3.1-8b-instant";
export const MAX_TOKENS = 1024;
export const MAX_HISTORY = 10;
