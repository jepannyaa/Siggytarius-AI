'use client';

import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check } from 'lucide-react';
import { cn, formatTimestamp } from '@/lib/utils';
import { PERSONA_CONFIGS } from '@/lib/prompts';
import type { ChatMessage as ChatMessageType, Persona } from '@/types';

interface ChatMessageProps {
  message: ChatMessageType;
  persona: Persona;
}

export function ChatMessage({ message, persona }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === 'assistant';
  const personaConfig = PERSONA_CONFIGS[persona];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAssistant) {
    return (
      <div className="flex justify-end animate-slide-up">
        <div className="max-w-[75%] flex flex-col items-end gap-1">
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 text-[#fafafa] rounded-2xl rounded-tr-sm px-4 py-3 text-sm leading-relaxed">
            {message.content}
          </div>
          <span className="text-xs text-[#52525b]">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 animate-slide-up group">
      {/* Cat Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border mt-1',
          personaConfig.borderColor
        )}
      >
        <Image src="/icon.jpg" alt="Siggytarius" width={32} height={32} className="object-cover object-center scale-[2] w-full h-full" />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={cn('text-xs font-semibold', personaConfig.color)}>
            Siggytarius {personaConfig.emoji}
          </span>
          <span className="text-xs text-[#52525b]">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>

        {/* Message bubble */}
        <div className="relative bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-[#e4e4e7] leading-relaxed">
          <div className="prose prose-invert prose-sm max-w-none prose-p:my-2.5 prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-code:text-[#a78bfa] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-md hover:bg-[#262626] text-[#52525b] hover:text-[#a1a1aa]"
            title="Copy message"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>

        {/* Sources */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.sources.map((source) => (
              <span
                key={source}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#1a1a1a] border border-[#262626] text-[#52525b]"
              >
                📄 {source}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
