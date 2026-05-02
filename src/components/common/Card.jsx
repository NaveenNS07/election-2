import React, { memo } from 'react';

/**
 * PRODUCTION-GRADE COMPONENT: Card
 * Features:
 * - React.memo for consistent performance.
 * - Tab navigation support for interactive states.
 * - Dynamic ARIA role assignment.
 */
const Card = memo(({ 
  children, 
  className = '', 
  onClick, 
  hover = true, 
  padding = 'p-8',
  ariaLabel
}) => {
  return (
    <div 
      onClick={onClick}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
      role={onClick ? 'button' : 'section'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      className={`
        bg-card border border-border rounded-[2rem] shadow-premium transition-all duration-300
        ${hover ? 'hover:shadow-hover hover:border-primary/30' : ''}
        ${onClick ? 'cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20' : ''}
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
});

export default Card;
