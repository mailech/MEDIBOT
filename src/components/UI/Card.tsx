import React from 'react';
import { motion } from 'framer-motion';

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
  const interactiveClasses = hover ? 'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary-200' : '';

  if (onClick) {
    return (
      <motion.div
        whileHover={hover ? { y: -2 } : {}}
        whileTap={hover ? { scale: 0.98 } : {}}
        className={`${baseClasses} ${interactiveClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;