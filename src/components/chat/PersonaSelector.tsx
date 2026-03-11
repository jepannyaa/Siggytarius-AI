'use client';

import { PERSONA_CONFIGS } from '@/lib/prompts';
import type { Persona } from '@/types';
import { cn } from '@/lib/utils';
import { useAudio } from '@/hooks/useAudio';

interface PersonaSelectorProps {
  selected: Persona;
  onChange: (persona: Persona) => void;
  disabled?: boolean;
}

export function PersonaSelector({ selected, onChange, disabled }: PersonaSelectorProps) {
  const { playClick } = useAudio();

  return (
    <div className="flex gap-2 px-4 py-3 border-b border-white/10 bg-black/30 backdrop-blur-sm">
      {(Object.values(PERSONA_CONFIGS) as ReturnType<typeof Object.values>).map((config) => {
        const p = config as (typeof PERSONA_CONFIGS)[Persona];
        const isActive = selected === p.id;
        return (
          <button
            key={p.id}
            onClick={() => {
              if (!disabled) {
                playClick();
                onChange(p.id);
              }
            }}
            disabled={disabled}
            title={p.description}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border',
              isActive
                ? `${p.bgColor} ${p.borderColor} ${p.color}`
                : 'bg-transparent border-[#262626] text-[#a1a1aa] hover:border-[#3f3f46] hover:text-[#fafafa]',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <span>{p.emoji}</span>
            <span>{p.label}</span>
          </button>
        );
      })}
    </div>
  );
}
