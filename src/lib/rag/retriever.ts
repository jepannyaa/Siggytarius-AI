import { cosineSimilarity } from '@/lib/utils';
import { embedText } from './embeddings';
import { loadVectorStore } from './vectorStore';
import type { RetrievalResult } from '@/types';
import { TOP_K_RETRIEVAL } from '@/lib/constants';

/**
 * Retrieve top-K most relevant chunks for a given query.
 * Returns null if vector store is not loaded.
 */
export function retrieve(
  query: string,
  topK: number = TOP_K_RETRIEVAL
): RetrievalResult[] | null {
  const store = loadVectorStore();
  if (!store) return null;

  const queryEmbedding = embedText(query, store.model);

  const scored = store.entries.map((entry) => ({
    chunk: entry.chunk,
    score: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  // Sort descending by score, take top K
  scored.sort((a, b) => b.score - a.score);
  const results = scored.slice(0, topK).filter((r) => r.score > 0.01);

  return results;
}

/**
 * Format retrieval results into a context string for the LLM prompt
 */
export function formatContext(results: RetrievalResult[]): string {
  if (results.length === 0) return '';

  return results
    .map(
      (r, i) =>
        `[Source ${i + 1}: ${r.chunk.title}]\n${r.chunk.content}`
    )
    .join('\n\n---\n\n');
}

/**
 * Get unique source slugs from results (for citation)
 */
export function getSources(results: RetrievalResult[]): string[] {
  return [...new Set(results.map((r) => r.chunk.source))];
}
