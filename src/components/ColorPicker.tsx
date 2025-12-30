import { Check } from '@phosphor-icons/react';
import { SHAPE_COLORS } from '@/lib/types';
import { motion } from 'framer-motion';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPicker({ selectedColor, onColorSelect }: ColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-3 p-4">
      {SHAPE_COLORS.map((color) => (
        <motion.button
          key={color.value}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onColorSelect(color.value)}
          className="relative w-12 h-12 rounded-full border-2 border-border transition-all"
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {selectedColor === color.value && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check size={24} weight="bold" color="white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
