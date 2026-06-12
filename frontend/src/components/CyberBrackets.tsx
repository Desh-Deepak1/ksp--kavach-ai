import React from 'react';

export const CyberBrackets: React.FC<{ active?: boolean; variant?: 'cyan' | 'purple' }> = ({ active, variant = 'cyan' }) => {
  const colorClass = variant === 'cyan' ? 'border-cyber-cyan' : 'border-cyber-purple';
  const opacityClass = active ? 'opacity-100 scale-105' : 'opacity-40 scale-100';
  
  return (
    <div className={`absolute inset-0 pointer-events-none transition-all duration-300 ${opacityClass}`}>
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${colorClass}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${colorClass}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${colorClass}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${colorClass}`} />
    </div>
  );
};