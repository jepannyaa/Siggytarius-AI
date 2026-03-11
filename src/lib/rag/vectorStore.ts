import path from 'path';
import fs from 'fs';
import type { DocumentChunk, VectorStoreEntry } from '@/types';
import type { EmbeddingModel } from './embeddings';

const EMBEDDINGS_DIR = path.join(process.cwd(), 'src', 'data', 'embeddings');
const STORE_FILE = path.join(EMBEDDINGS_DIR, 'vector-store.json');
const MODEL_FILE = path.join(EMBEDDINGS_DIR, 'embedding-model.json');

export interface VectorStore {
  entries: VectorStoreEntry[];
  model: EmbeddingModel;
}

let cachedStore: VectorStore | null = null;

/**
 * Save vector store to disk
 */
export function saveVectorStore(store: VectorStore): void {
  if (!fs.existsSync(EMBEDDINGS_DIR)) {
    fs.mkdirSync(EMBEDDINGS_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_FILE, JSON.stringify(store.entries));
  fs.writeFileSync(MODEL_FILE, JSON.stringify(store.model));
  cachedStore = store;
  console.log(
    `✅ Vector store saved: ${store.entries.length} chunks, vocab size: ${store.model.vocabulary.length}`
  );
}

/**
 * Load vector store from disk (cached after first load)
 */
export function loadVectorStore(): VectorStore | null {
  if (cachedStore) return cachedStore;

  if (!fs.existsSync(STORE_FILE) || !fs.existsSync(MODEL_FILE)) {
    console.warn('⚠️  Vector store not found. Run `npm run setup-kb` first.');
    return null;
  }

  try {
    const entries: VectorStoreEntry[] = JSON.parse(
      fs.readFileSync(STORE_FILE, 'utf-8')
    );
    const model: EmbeddingModel = JSON.parse(
      fs.readFileSync(MODEL_FILE, 'utf-8')
    );
    cachedStore = { entries, model };
    return cachedStore;
  } catch (e) {
    console.error('Error loading vector store:', e);
    return null;
  }
}

/**
 * Build vector store from chunks and embeddings
 */
export function buildVectorStore(
  chunks: DocumentChunk[],
  embeddings: number[][],
  model: EmbeddingModel
): VectorStore {
  const entries: VectorStoreEntry[] = chunks.map((chunk, i) => ({
    chunk,
    embedding: embeddings[i],
  }));
  return { entries, model };
}
