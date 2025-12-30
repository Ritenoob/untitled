import { motion } from 'framer-motion';
import { ShapeType } from '@/lib/types';

interface ShapeProps {
  type: ShapeType;
  color: string;
  size?: number;
  selected?: boolean;
  onClick?: () => void;
  x: number;
  y: number;
  delay: number;
}

export function Shape({ type, color, size = 60, selected, onClick, x, y, delay }: ShapeProps) {
  const renderPath = () => {
    switch (type) {
      case 'circle':
        return <circle cx="30" cy="30" r="25" fill={color} />;
      case 'triangle':
        return <polygon points="30,5 55,50 5,50" fill={color} />;
      case 'square':
        return <rect x="10" y="10" width="40" height="40" fill={color} rx="4" />;
      case 'star':
        return (
          <polygon
            points="30,5 37,22 55,22 41,33 47,50 30,40 13,50 19,33 5,22 23,22"
            fill={color}
          />
        );
      case 'heart':
        return (
          <path
            d="M30,50 C30,50 10,35 10,23 C10,15 15,10 20,10 C25,10 30,15 30,15 C30,15 35,10 40,10 C45,10 50,15 50,23 C50,35 30,50 30,50 Z"
            fill={color}
          />
        );
      case 'moon':
        return (
          <path
            d="M35,10 A18,18 0 1,0 35,50 A15,15 0 1,1 35,10 Z"
            fill={color}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{
        opacity: 1,
        y: [y, y + 10, y - 8, y + 5, y - 3, y],
        rotate: [0, 2, -2, 1, -1, 0],
      }}
      transition={{
        opacity: { duration: 0.3 },
        y: {
          duration: 4 + delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.3,
        },
        rotate: {
          duration: 5 + delay * 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.4,
        },
      }}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}px`,
        cursor: 'pointer',
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: selected ? Infinity : 0 }}
      >
        <svg width={size} height={size} viewBox="0 0 60 60">
          {selected && (
            <circle
              cx="30"
              cy="30"
              r="28"
              fill="none"
              stroke={color}
              strokeWidth="2"
              opacity="0.5"
            />
          )}
          {renderPath()}
        </svg>
      </motion.div>
      <motion.div
        style={{
          position: 'absolute',
          top: -20,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 20,
          backgroundColor: color,
          opacity: 0.3,
        }}
      />
    </motion.div>
  );
}
