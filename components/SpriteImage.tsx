
import React from 'react';
import { SPRITE_SHEET_URL, SPRITE_COLS, SPRITE_ROWS } from '../constants';

interface SpriteImageProps {
  index: number;
  className?: string;
  alt?: string;
}

/**
 * SpriteImage Component
 * Uses CSS background-position percentages to precisely extract a single shoe 
 * silhouette from the master shoes.png sprite sheet.
 */
const SpriteImage: React.FC<SpriteImageProps> = ({ index, className = "", alt = "Footwear Silhouette" }) => {
  const col = index % SPRITE_COLS;
  const row = Math.floor(index / SPRITE_COLS);

  // Background position percentage formula: (current_index / (total_indices_in_axis - 1)) * 100
  // For a 10-column grid, index 0 is 0%, index 9 is 100%.
  const x = (SPRITE_COLS > 1) ? (col * 100) / (SPRITE_COLS - 1) : 0;
  const y = (SPRITE_ROWS > 1) ? (row * 100) / (SPRITE_ROWS - 1) : 0;

  return (
    <div 
      className={`relative overflow-hidden bg-white shadow-inner ${className}`}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url('${SPRITE_SHEET_URL}')`,
        backgroundSize: `${SPRITE_COLS * 100}% ${SPRITE_ROWS * 100}%`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundRepeat: 'no-repeat',
        // Ensuring high-quality rendering for sprite assets
        imageRendering: 'auto'
      }}
    >
      {/* Invisible accessibility label */}
      <span className="sr-only">{alt}</span>
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
    </div>
  );
};

export default SpriteImage;
