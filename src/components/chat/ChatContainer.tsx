'use client';

import { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { PersonaSelector } from './PersonaSelector';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeMessage } from './WelcomeMessage';
import { useChat } from '@/hooks/useChat';
import { usePersona } from '@/hooks/usePersona';
import type { ChatMessage as ChatMessageType, Persona } from '@/types';

interface ChatContainerProps {
  onPersonaChange?: (persona: Persona) => void;
  onStreamingChange?: (streaming: boolean) => void;
}

export function ChatContainer({ onPersonaChange, onStreamingChange }: ChatContainerProps) {
  const { persona, setPersona } = usePersona();
  const { messages, input, setInput, isStreaming, sendMessage, clearChat } =
    useChat(persona);

  const handlePersonaChange = (next: Persona) => {
    setPersona(next);
    clearChat();
  };

  // Propagate state up
  useEffect(() => { onPersonaChange?.(persona); }, [persona, onPersonaChange]);
  useEffect(() => { onStreamingChange?.(isStreaming); }, [isStreaming, onStreamingChange]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-transparent">
      {/* Persona selector bar */}
      <PersonaSelector
        selected={persona}
        onChange={handlePersonaChange}
        disabled={isStreaming}
      />

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex flex-col justify-end min-h-full space-y-5">
        {/* Welcome message */}
        <WelcomeMessage persona={persona} key={`welcome-${persona}`} />

        {/* Message list */}
        {messages.map((msg: ChatMessageType) => (
          <ChatMessage key={msg.id} message={msg} persona={persona} />
        ))}

        {/* Typing indicator */}
        {isStreaming && <TypingIndicator persona={persona} />}

        <div ref={bottomRef} />
        </div>
      </div>

      {/* Clear chat button */}
      {messages.length > 0 && !isStreaming && (
        <div className="flex justify-center pb-1">
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-[#52525b] hover:text-[#a1a1aa] transition-colors py-1 px-3"
          >
            <Trash2 size={11} />
            Clear chat
          </button>
        </div>
      )}

      {/* Input */}
      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={sendMessage}
        disabled={isStreaming}
      />
    </div>
  );
}
