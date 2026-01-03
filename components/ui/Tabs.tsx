'use client';

import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex space-x-1 border-b border-dark-border mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-3 text-sm font-medium transition-all duration-200
                border-b-2
                ${
                  isActive
                    ? 'border-primary-500 text-primary-400'
                    : 'border-transparent text-dark-textSecondary hover:text-dark-text hover:border-dark-border'
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTabContent}
      </div>
    </div>
  );
}

