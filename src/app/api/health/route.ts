import { loadVectorStore } from '@/lib/rag/vectorStore';

export async function GET() {
  const store = loadVectorStore();

  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    knowledgeBase: {
      loaded: store !== null,
      chunks: store?.entries.length ?? 0,
      vocabSize: store?.model.vocabulary.length ?? 0,
    },
  });
}
