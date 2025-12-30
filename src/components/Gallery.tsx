import { SavedMobile, ShapeType } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface GalleryProps {
  mobiles: SavedMobile[];
  onDelete: (id: string) => void;
  onView: (mobile: SavedMobile) => void;
}

export function Gallery({ mobiles, onDelete, onView }: GalleryProps) {
  const renderMiniShape = (type: ShapeType, color: string, index: number) => {
    const size = 20;
    const renderPath = () => {
      switch (type) {
        case 'circle':
          return <circle cx="10" cy="10" r="8" fill={color} />;
        case 'triangle':
          return <polygon points="10,2 18,16 2,16" fill={color} />;
        case 'square':
          return <rect x="3" y="3" width="14" height="14" fill={color} rx="2" />;
        case 'star':
          return (
            <polygon
              points="10,2 12,7 17,7 13,10 15,15 10,12 5,15 7,10 3,7 8,7"
              fill={color}
            />
          );
        case 'heart':
          return (
            <path
              d="M10,17 C10,17 3,12 3,8 C3,5 5,3 7,3 C9,3 10,5 10,5 C10,5 11,3 13,3 C15,3 17,5 17,8 C17,12 10,17 10,17 Z"
              fill={color}
            />
          );
        case 'moon':
          return (
            <path
              d="M12,3 A6,6 0 1,0 12,17 A5,5 0 1,1 12,3 Z"
              fill={color}
            />
          );
      }
    };

    return (
      <svg
        key={index}
        width={size}
        height={size}
        viewBox="0 0 20 20"
        style={{
          position: 'absolute',
          left: `${10 + index * 15}%`,
          top: `${20 + index * 8}%`,
        }}
      >
        {renderPath()}
      </svg>
    );
  };

  if (mobiles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-6xl">🎨</div>
          <h3 className="text-2xl font-bold text-foreground">No mobiles yet</h3>
          <p className="text-muted-foreground max-w-sm">
            Create your first kinetic sculpture and save it to see it here!
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {mobiles.map((mobile, idx) => (
        <motion.div
          key={mobile.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div
              onClick={() => onView(mobile)}
              className="relative h-40 bg-gradient-to-br from-secondary to-card border-b border-border"
            >
              {mobile.shapes.slice(0, 5).map((shape, index) =>
                renderMiniShape(shape.type, shape.color, index)
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {mobile.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {format(mobile.createdAt, 'MMM d, yyyy')} • {mobile.shapes.length}{' '}
                    {mobile.shapes.length === 1 ? 'shape' : 'shapes'}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(mobile.id);
                  }}
                  className="shrink-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
