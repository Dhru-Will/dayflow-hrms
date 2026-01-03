import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const inputStyles = `
    w-full px-4 py-3
    bg-dark-surfaceHover border rounded-lg
    text-dark-text placeholder-dark-textMuted
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-dark-border'}
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-2 text-sm font-medium text-dark-text"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={inputStyles.trim()}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-dark-textSecondary">{helperText}</p>
      )}
    </div>
  );
}

