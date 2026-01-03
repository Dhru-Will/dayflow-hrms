import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {icon && (
        <div className="mb-4 text-dark-textSecondary opacity-50">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-dark-text mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-dark-textSecondary text-center max-w-md mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

