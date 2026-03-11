'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { ChatContainer } from '@/components/chat/ChatContainer';
import type { Persona } from '@/types';

export default function ChatPage() {
  const [persona, setPersona] = useState<Persona>('witty');
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a]">
      <Header persona={persona} isStreaming={isStreaming} />
      <div className="flex-1 min-h-0 flex justify-center">
        <div className="w-full max-w-2xl min-h-0 flex flex-col">
          <ChatContainer
            onPersonaChange={setPersona}
            onStreamingChange={setIsStreaming}
          />
        </div>
      </div>
    </div>
  );
}
