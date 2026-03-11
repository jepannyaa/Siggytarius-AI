export const RITUAL_DOCS = [
  {
    slug: 'what-is-ritual',
    title: 'What is Ritual?',
    url: 'https://www.ritualfoundation.org/docs/overview/what-is-ritual',
  },
  {
    slug: 'crypto-x-ai',
    title: 'Crypto × AI',
    url: 'https://www.ritualfoundation.org/docs/overview/crypto-x-ai',
  },
  {
    slug: 'evm-sidecars-overview',
    title: 'EVM++ Sidecars Overview',
    url: 'https://www.ritualfoundation.org/docs/whats-new/evm++-sidecars/overview',
  },
  {
    slug: 'scheduled-transactions',
    title: 'Scheduled Transactions',
    url: 'https://www.ritualfoundation.org/docs/architecture/scheduled-transactions',
  },
  {
    slug: 'enshrined-ai-models',
    title: 'Enshrined AI Models',
    url: 'https://www.ritualfoundation.org/docs/whats-new/ai-primitives/enshrined-ai-models',
  },
  {
    slug: 'resonance',
    title: 'Resonance',
    url: 'https://www.ritualfoundation.org/docs/whats-new/resonance',
  },
  {
    slug: 'symphony',
    title: 'Symphony',
    url: 'https://www.ritualfoundation.org/docs/whats-new/symphony',
  },
  {
    slug: 'infernet-to-chain',
    title: 'Infernet ↔ Chain',
    url: 'https://www.ritualfoundation.org/docs/architecture/infernet-to-chain',
  },
  {
    slug: 'node-specialization',
    title: 'Node Specialization',
    url: 'https://www.ritualfoundation.org/docs/whats-new/node-specialization',
  },
  {
    slug: 'verifiable-provenance',
    title: 'Verifiable Provenance',
    url: 'https://www.ritualfoundation.org/docs/whats-new/ai-primitives/verifiable-provenance',
  },
  {
    slug: 'modular-storage',
    title: 'Modular Storage',
    url: 'https://www.ritualfoundation.org/docs/whats-new/modular-storage',
  },
  {
    slug: 'account-abstraction',
    title: 'Account Abstraction',
    url: 'https://www.ritualfoundation.org/docs/whats-new/evm++/account-abstraction',
  },
  {
    slug: 'guardians',
    title: 'Guardians',
    url: 'https://www.ritualfoundation.org/docs/whats-new/guardians',
  },
  {
    slug: 'model-marketplace',
    title: 'Model Marketplace',
    url: 'https://www.ritualfoundation.org/docs/beyond-crypto-x-ai/model-marketplace',
  },
  {
    slug: 'prover-networks',
    title: 'Prover Networks',
    url: 'https://www.ritualfoundation.org/docs/beyond-crypto-x-ai/prover-networks',
  },
];

export const CHUNK_SIZE = 600; // target tokens per chunk
export const CHUNK_OVERLAP = 100; // overlap tokens
export const TOP_K_RETRIEVAL = 5; // number of chunks to retrieve
export const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX || '20');
export const RATE_LIMIT_WINDOW_MS = parseInt(
  process.env.RATE_LIMIT_WINDOW_MS || '60000'
);
