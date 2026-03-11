'use client';

import Link from 'next/link';
import { PERSONA_CONFIGS } from '@/lib/prompts';
import type { Persona } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  persona?: Persona;
  isStreaming?: boolean;
}

export function Header({ persona = 'witty', isStreaming = false }: HeaderProps) {
  const config = PERSONA_CONFIGS[persona];

  return (
    <header className="flex items-center justify-between px-5 py-4 border-b border-[#262626] bg-[#0d0d0d] flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div
          className={cn(
            'w-9 h-9 rounded-full flex items-center justify-center text-xl border transition-colors',
            config.bgColor,
            config.borderColor
          )}
        >
          🐱
        </div>
        <div>
          <h1 className="text-[#fafafa] font-semibold font-heading text-base leading-none">
            Siggy
          </h1>
          <p className="text-[10px] text-[#52525b] mt-0.5">
            Ritual Network Assistant
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'w-2 h-2 rounded-full',
            isStreaming ? 'bg-[#eab308] animate-pulse' : 'bg-[#22c55e]'
          )}
        />
        <span className="text-xs text-[#a1a1aa]">
          {isStreaming ? 'Typing...' : 'Online'}
        </span>
      </div>
    </header>
  );
}
