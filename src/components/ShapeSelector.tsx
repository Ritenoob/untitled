import { ShapeType } from '@/lib/types';
import { motion } from 'framer-motion';

interface ShapeSelectorProps {
  onShapeSelect: (type: ShapeType) => void;
}

const SHAPES: { type: ShapeType; label: string }[] = [
  { type: 'circle', label: 'Circle' },
  { type: 'triangle', label: 'Triangle' },
  { type: 'square', label: 'Square' },
  { type: 'star', label: 'Star' },
  { type: 'heart', label: 'Heart' },
  { type: 'moon', label: 'Moon' },
];

export function ShapeSelector({ onShapeSelect }: ShapeSelectorProps) {
  const renderShapeSVG = (type: ShapeType) => {
    const color = 'oklch(0.65 0.15 35)';
    switch (type) {
      case 'circle':
        return <circle cx="30" cy="30" r="22" fill={color} />;
      case 'triangle':
        return <polygon points="30,8 52,48 8,48" fill={color} />;
      case 'square':
        return <rect x="12" y="12" width="36" height="36" fill={color} rx="4" />;
      case 'star':
        return (
          <polygon
            points="30,8 36,22 51,22 39,31 44,46 30,37 16,46 21,31 9,22 24,22"
            fill={color}
          />
        );
      case 'heart':
        return (
          <path
            d="M30,48 C30,48 12,35 12,24 C12,17 16,12 21,12 C26,12 30,17 30,17 C30,17 34,12 39,12 C44,12 48,17 48,24 C48,35 30,48 30,48 Z"
            fill={color}
          />
        );
      case 'moon':
        return (
          <path
            d="M35,12 A16,16 0 1,0 35,48 A13,13 0 1,1 35,12 Z"
            fill={color}
          />
        );
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {SHAPES.map((shape) => (
        <motion.button
          key={shape.type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onShapeSelect(shape.type)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border-2 border-border hover:border-primary transition-colors"
        >
          <svg width={60} height={60} viewBox="0 0 60 60">
            {renderShapeSVG(shape.type)}
          </svg>
          <span className="text-sm font-medium text-foreground">{shape.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
