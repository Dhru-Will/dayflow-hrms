'use client';

import { useAIAssistant } from '@/context/AIAssistantContext';
import { AIUseCase } from '@/constants/aiAssistant';

interface AIAssistantButtonProps {
  useCase?: AIUseCase;
  className?: string;
}

export default function AIAssistantButton({ useCase, className = '' }: AIAssistantButtonProps) {
  const { openAssistant } = useAIAssistant();

  return (
    <button
      onClick={() => openAssistant(useCase)}
      className={`
        fixed bottom-6 right-6 z-30
        w-14 h-14 rounded-full
        bg-gradient-primary
        shadow-lg shadow-primary-500/50
        flex items-center justify-center
        hover:scale-110 active:scale-95
        transition-all duration-200
        ${className}
      `}
      title="Open AI Assistant"
    >
      <svg
        className="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    </button>
  );
}

