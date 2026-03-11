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
    <div className="border-t border-[#262626] bg-[#0a0a0a] px-4 pb-4">
      <div className={cn(
          'flex items-end gap-3 bg-[#141414] border rounded-2xl px-4 py-3 transition-colors',
          disabled ? 'border-[#262626]' : 'border-[#3f3f46] focus-within:border-[#71717a]'
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
          className="flex-1 bg-transparent text-[#fafafa] placeholder:text-[#52525b] text-sm resize-none outline-none leading-relaxed max-h-40 disabled:opacity-50"
        />
        <button
          onClick={() => !disabled && value.trim() && onSubmit()}
          disabled={disabled || !value.trim()}
          className={cn(
            'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all',
            !disabled && value.trim()
              ? 'bg-[#fafafa] text-[#0a0a0a] hover:bg-[#e4e4e7]'
              : 'bg-[#262626] text-[#52525b] cursor-not-allowed'
          )}
        >
          <Send size={14} />
        </button>
      </div>
      <p className="text-[10px] text-[#3f3f46] text-center mt-2">
        Press Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}
