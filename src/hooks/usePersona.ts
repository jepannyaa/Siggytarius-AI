'use client';

import { useState } from 'react';
import type { Persona } from '@/types';

const DEFAULT_PERSONA: Persona = 'witty';
const STORAGE_KEY = 'siggy-persona';

export function usePersona() {
  const [persona, setPersonaState] = useState<Persona>(() => {
    if (typeof window === 'undefined') return DEFAULT_PERSONA;
    const stored = localStorage.getItem(STORAGE_KEY) as Persona | null;
    return stored ?? DEFAULT_PERSONA;
  });

  const setPersona = (next: Persona) => {
    setPersonaState(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return { persona, setPersona };
}
