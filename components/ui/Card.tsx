import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
  children,
  className = '',
  hover = false,
  onClick,
}: CardProps) {
  const baseStyles = 'bg-dark-surface border border-dark-border rounded-xl p-6 transition-all duration-200';
  const hoverStyles = hover || onClick
    ? 'hover:border-primary-500 hover:bg-dark-surfaceHover hover:shadow-lg hover:shadow-primary-500/10 cursor-pointer'
    : '';
  const clickStyles = onClick ? 'active:scale-[0.98]' : '';

  const combinedClassName = `${baseStyles} ${hoverStyles} ${clickStyles} ${className}`;

  return (
    <div
      className={combinedClassName}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
}

