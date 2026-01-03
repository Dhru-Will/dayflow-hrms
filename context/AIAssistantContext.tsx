'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AIUseCase } from '@/constants/aiAssistant';

interface AIAssistantContextType {
  isOpen: boolean;
  currentUseCase: AIUseCase | null;
  openAssistant: (useCase?: AIUseCase) => void;
  closeAssistant: () => void;
  setUseCase: (useCase: AIUseCase) => void;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

export const AIAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUseCase, setCurrentUseCase] = useState<AIUseCase | null>(null);

  const openAssistant = (useCase?: AIUseCase) => {
    if (useCase) {
      setCurrentUseCase(useCase);
    }
    setIsOpen(true);
  };

  const closeAssistant = () => {
    setIsOpen(false);
  };

  const setUseCase = (useCase: AIUseCase) => {
    setCurrentUseCase(useCase);
  };

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        currentUseCase,
        openAssistant,
        closeAssistant,
        setUseCase,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (context === undefined) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};

