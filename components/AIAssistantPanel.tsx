'use client';

import { useEffect } from 'react';
import { useAIAssistant } from '@/context/AIAssistantContext';
import { MOCK_AI_RESPONSES, AIUseCase } from '@/constants/aiAssistant';
import { Card, Button } from './ui';

export default function AIAssistantPanel() {
  const { isOpen, currentUseCase, closeAssistant, setUseCase } = useAIAssistant();
  const activeResponse = currentUseCase ? MOCK_AI_RESPONSES[currentUseCase] : MOCK_AI_RESPONSES.general;

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeAssistant();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeAssistant]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={closeAssistant}
      />

      {/* Sidebar Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-surface border-l border-dark-border shadow-2xl z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
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
            </div>
            <div>
              <h2 className="text-lg font-bold text-dark-text">AI Assistant</h2>
              <p className="text-xs text-dark-textSecondary">Your HRMS helper</p>
            </div>
          </div>
          <button
            onClick={closeAssistant}
            className="p-2 hover:bg-dark-surfaceHover rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-dark-textSecondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-b border-dark-border">
          <p className="text-sm font-medium text-dark-textSecondary mb-3">Quick Actions</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={currentUseCase === 'salary' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setUseCase('salary')}
            >
              💰 Salary
            </Button>
            <Button
              variant={currentUseCase === 'attendance' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setUseCase('attendance')}
            >
              📅 Attendance
            </Button>
            <Button
              variant={currentUseCase === 'general' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setUseCase('general')}
            >
              💡 General
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <Card className="mb-6">
            <h3 className="text-lg font-semibold text-dark-text mb-4">
              {activeResponse.title}
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-dark-textSecondary leading-relaxed whitespace-pre-line">
                {activeResponse.explanation}
              </p>
            </div>
          </Card>

          {/* Insights */}
          {activeResponse.insights && activeResponse.insights.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-dark-text mb-4">Key Insights</h3>
              <ul className="space-y-3">
                {activeResponse.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5">
                      <svg
                        className="w-3 h-3 text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-dark-textSecondary flex-1">{insight}</p>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-dark-border bg-dark-surfaceHover">
          <p className="text-xs text-dark-textSecondary text-center">
            AI-generated insights • For informational purposes only
          </p>
        </div>
      </div>
    </>
  );
}

