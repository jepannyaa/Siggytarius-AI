'use client';

import { PERSONA_CONFIGS } from '@/lib/prompts';
import type { Persona } from '@/types';
import { cn } from '@/lib/utils';

interface WelcomeMessageProps {
  persona: Persona;
}

export function WelcomeMessage({ persona }: WelcomeMessageProps) {
  const config = PERSONA_CONFIGS[persona];

  return (
    <div className="flex gap-3 animate-fade-in">
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-base border mt-1',
          config.bgColor,
          config.borderColor
        )}
      >
        🐱
      </div>
      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-semibold', config.color)}>
            Siggy {config.emoji}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#262626] text-[#52525b]">
            Ritual Assistant
          </span>
        </div>
        <div
          className={cn(
            'bg-[#141414] border rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#e4e4e7] leading-relaxed',
            config.borderColor
          )}
        >
          {config.welcomeMessage}
        </div>
      </div>
    </div>
  );
}
