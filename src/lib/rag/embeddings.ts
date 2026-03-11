/**
 * Lightweight embedding using keyword extraction + TF-IDF weighting.
 * No external service required — runs at build time for document indexing,
 * and at query time for retrieval.
 *
 * Vocabulary is built from all document chunks and stored alongside embeddings.
 */

export interface EmbeddingModel {
  vocabulary: string[];
  idf: number[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Basic English stop words
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
  'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
  'could', 'should', 'may', 'might', 'shall', 'can', 'that', 'this',
  'these', 'those', 'it', 'its', 'as', 'not', 'also', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'such', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'out', 'off', 'over', 'under', 'then', 'once', 'here', 'there',
  'when', 'where', 'which', 'who', 'how', 'than', 'so', 'if', 'we',
  'they', 'you', 'their', 'our', 'your', 'he', 'she', 'his', 'her',
  'what', 'about', 'up', 'use', 'used',
]);

/**
 * Build vocabulary and IDF from all document texts
 */
export function buildEmbeddingModel(documents: string[]): EmbeddingModel {
  const termDocCount = new Map<string, number>();

  // Count document frequency of each term
  for (const doc of documents) {
    const terms = new Set(tokenize(doc));
    for (const term of terms) {
      termDocCount.set(term, (termDocCount.get(term) || 0) + 1);
    }
  }

  // Only keep terms that appear in 2+ docs but less than 80% of docs
  const N = documents.length;
  const vocabulary: string[] = [];
  const idf: number[] = [];

  for (const [term, df] of termDocCount.entries()) {
    if (df >= 2 && df < N * 0.8) {
      vocabulary.push(term);
      idf.push(Math.log((N + 1) / (df + 1)) + 1);
    }
  }

  // Sort for determinism
  const combined = vocabulary.map((v, i) => ({ v, idf: idf[i] }));
  combined.sort((a, b) => a.v.localeCompare(b.v));

  return {
    vocabulary: combined.map((c) => c.v),
    idf: combined.map((c) => c.idf),
  };
}

/**
 * Embed a single text using TF-IDF
 */
export function embedText(text: string, model: EmbeddingModel): number[] {
  const tokens = tokenize(text);
  const tf = new Map<string, number>();

  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }

  const totalTerms = tokens.length || 1;

  return model.vocabulary.map((term, i) => {
    const termFreq = (tf.get(term) || 0) / totalTerms;
    return termFreq * model.idf[i];
  });
}
