'use client';

import { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = 'Ask Siggy anything...',
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSubmit();
      }
    }
  };

  return (
    <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm px-4 py-3">
      <div className={cn(
          'flex items-center gap-2 bg-white/5 border rounded-2xl px-4 py-2.5 transition-colors',
          disabled ? 'border-white/10' : 'border-white/15 focus-within:border-white/30'
        )}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          rows={1}
          className="flex-1 bg-transparent text-[#fafafa] placeholder:text-[#52525b] text-sm resize-none outline-none leading-normal max-h-40 disabled:opacity-50 py-0.5"
        />
        <button
          onClick={() => !disabled && value.trim() && onSubmit()}
          disabled={disabled || !value.trim()}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            !disabled && value.trim()
              ? 'bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e4e4e7]'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          )}
        >
          <Send size={14} />
        </button>
      </div>
      <p className="text-[10px] text-white/20 text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
