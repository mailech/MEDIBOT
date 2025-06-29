import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-gray-200';
  const interactiveClasses = hover ? 'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary-200 hover:-translate-y-1 active:scale-98' : '';

  if (onClick) {
    return (
      <div
        className={`${baseClasses} ${interactiveClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;