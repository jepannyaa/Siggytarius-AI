'use client';

import { PERSONA_CONFIGS } from '@/lib/prompts';
import type { Persona } from '@/types';
import { cn } from '@/lib/utils';

interface TypingIndicatorProps {
  persona: Persona;
}

export function TypingIndicator({ persona }: TypingIndicatorProps) {
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
      <div className="flex items-center">
        <div className="bg-[#141414] border border-[#262626] rounded-2xl rounded-tl-sm px-4 py-3">
          <div className="flex gap-1 items-center">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn('w-1.5 h-1.5 rounded-full', config.color.replace('text-', 'bg-'))}
                style={{
                  animation: 'typing-dot 1.4s infinite ease-in-out',
                  animationDelay: `${i * 0.2}s`,
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
