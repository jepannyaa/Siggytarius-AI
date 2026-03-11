import type { DocumentChunk } from '@/types';

const WORDS_PER_TOKEN = 0.75; // approx

function estimateTokens(text: string): number {
  return Math.ceil(text.split(/\s+/).length / WORDS_PER_TOKEN);
}

/**
 * Split text into overlapping chunks by sentence boundaries
 */
export function chunkText(
  text: string,
  source: string,
  title: string,
  url: string,
  targetTokens = 600,
  overlapTokens = 100
): DocumentChunk[] {
  // Split into sentences
  const sentences = text
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  const chunks: DocumentChunk[] = [];
  let currentChunk: string[] = [];
  let currentTokens = 0;
  let chunkIndex = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);

    // If adding this sentence exceeds limit, finalize current chunk
    if (currentTokens + sentenceTokens > targetTokens && currentChunk.length > 0) {
      const content = currentChunk.join(' ');
      chunks.push({
        id: `${source}-${chunkIndex++}`,
        content,
        source,
        title,
        url,
      });

      // Overlap: keep last few sentences
      const overlapSentences: string[] = [];
      let overlapCount = 0;
      for (let i = currentChunk.length - 1; i >= 0; i--) {
        const t = estimateTokens(currentChunk[i]);
        if (overlapCount + t > overlapTokens) break;
        overlapSentences.unshift(currentChunk[i]);
        overlapCount += t;
      }

      currentChunk = overlapSentences;
      currentTokens = overlapCount;
    }

    currentChunk.push(sentence);
    currentTokens += sentenceTokens;
  }

  // Don't forget the last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      id: `${source}-${chunkIndex}`,
      content: currentChunk.join(' '),
      source,
      title,
      url,
    });
  }

  return chunks;
}
