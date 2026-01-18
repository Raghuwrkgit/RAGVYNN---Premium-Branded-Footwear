
import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  color?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconOnly = false, 
  color = "text-black",
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "h-5",
    md: "h-8",
    lg: "h-12",
    xl: "h-20"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg 
        viewBox="0 0 100 100" 
        className={`${sizeClasses[size]} fill-current ${color} flex-shrink-0 transform hover:scale-110 transition-transform duration-500`}
        aria-hidden="true"
      >
        {/* The Kinetic Sole-V: Proprietary mark */}
        <path d="M10 20 L40 50 L10 80 L30 80 L60 50 L30 20 Z" className="opacity-40" />
        <path d="M35 20 L65 50 L35 80 L55 80 L85 50 L55 20 Z" className="opacity-70" />
        <path d="M60 20 L90 50 L60 80 L80 80 L100 50 L80 20 Z" fill="currentColor" />
      </svg>
      
      {!iconOnly && (
        <span className={`${textSizeClasses[size]} font-black tracking-tighter uppercase ${color}`}>
          RAG<span className="text-blue-600">VYNN</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
