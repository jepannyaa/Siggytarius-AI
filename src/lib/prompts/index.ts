import { mysticalPrompt } from './mystical';
import { wittyPrompt } from './witty';
import { unhingedPrompt } from './unhinged';
import type { Persona, PersonaConfig } from '@/types';

export const PERSONA_CONFIGS: Record<Persona, PersonaConfig> = {
  mystical: {
    id: 'mystical',
    label: 'Mystical',
    emoji: '🔮',
    color: 'text-purple-400',
    borderColor: 'border-purple-500',
    bgColor: 'bg-purple-500/10',
    description: 'Wise oracle, speaks in cosmic metaphors',
    welcomeMessage:
      'The stars have aligned, and you have found me... I am Siggy, keeper of ancient blockchain wisdom and digital mysteries. What secrets do you seek, wanderer? ~',
  },
  witty: {
    id: 'witty',
    label: 'Witty',
    emoji: '😏',
    color: 'text-amber-400',
    borderColor: 'border-amber-500',
    bgColor: 'bg-amber-500/10',
    description: 'Sharp, sarcastic, clever analogies',
    welcomeMessage:
      "Oh look, another human with questions. I'm Siggy — a black cat who happens to know more about Ritual Network than most. Don't worry, I'll translate the blockchain stuff into something your human brain can process. You're welcome.",
  },
  unhinged: {
    id: 'unhinged',
    label: 'Unhinged',
    emoji: '🤪',
    color: 'text-pink-400',
    borderColor: 'border-pink-500',
    bgColor: 'bg-pink-500/10',
    description: '3AM energy, chaos but somehow helpful',
    welcomeMessage:
      "HELLO HELLO HELLO!! I'm SIGGY and I am SO READY to TALK ABOUT RITUAL!! 🚀🚀🚀 I just knocked my water bowl off the table and I have NO REGRETS!! Ask me ANYTHING!! I know things!! Important blockchain things!! MEOW!! 😤",
  },
};

export function getSystemPrompt(persona: Persona): string {
  switch (persona) {
    case 'mystical':
      return mysticalPrompt;
    case 'witty':
      return wittyPrompt;
    case 'unhinged':
      return unhingedPrompt;
    default:
      return wittyPrompt;
  }
}

export function buildPromptWithContext(
  persona: Persona,
  userMessage: string,
  retrievedContext: string | null
): string {
  const systemPrompt = getSystemPrompt(persona);

  if (!retrievedContext) {
    return systemPrompt + `\n\nNOTE: No documentation context was found for this query. Tell the user you don't have specific information about this topic and suggest they check the official Ritual docs at ritualfoundation.org/docs.`;
  }

  return `${systemPrompt}

---
RELEVANT CONTEXT FROM RITUAL DOCUMENTATION (YOU MUST USE THIS):
${retrievedContext}

IMPORTANT: Base your answer STRICTLY on the context above. Do not add information not present in the context. Stay in character.
---`;
}
