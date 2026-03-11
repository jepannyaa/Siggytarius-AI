'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ChatContainer } from '@/components/chat/ChatContainer';
import type { Persona } from '@/types';

export default function ChatPage() {
  const [persona, setPersona] = useState<Persona>('witty');
  const [isStreaming, setIsStreaming] = useState(false);

  return (
    <div
      className="h-screen flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/65" />

      {/* Back button — top left, outside container */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors group bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-2"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
      </div>

      <div className="relative z-10 flex-1 min-h-0 flex justify-center p-4">
        <div className="w-full max-w-2xl min-h-0 flex flex-col bg-black/55 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          <ChatContainer
            onPersonaChange={setPersona}
            onStreamingChange={setIsStreaming}
          />
        </div>
      </div>
    </div>
  );
}
