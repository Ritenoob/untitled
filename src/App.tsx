import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { MobileShape, SavedMobile, ShapeType, MAX_SHAPES, SHAPE_COLORS } from '@/lib/types';
import { Shape } from '@/components/Shape';
import { ShapeSelector } from '@/components/ShapeSelector';
import { ColorPicker } from '@/components/ColorPicker';
import { Gallery } from '@/components/Gallery';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { Plus, FloppyDisk, Trash, Palette } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

function App() {
  const isMobile = useIsMobile();
  const [shapes, setShapes] = useState<MobileShape[]>([]);
  const [savedMobiles, setSavedMobiles] = useKV<SavedMobile[]>('saved-mobiles', []);
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
  const [showShapeSelector, setShowShapeSelector] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [mobileName, setMobileName] = useState('');
  const [activeTab, setActiveTab] = useState('create');

  const addShape = (type: ShapeType) => {
    if (shapes.length >= MAX_SHAPES) {
      toast.error(`Maximum ${MAX_SHAPES} shapes allowed`);
      return;
    }

    const newShape: MobileShape = {
      id: Date.now().toString(),
      type,
      color: SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)].value,
      x: 20 + Math.random() * 60,
      y: 100 + shapes.length * 80,
    };

    setShapes((current) => [...current, newShape]);
    setShowShapeSelector(false);
    toast.success('Shape added!');
  };

  const selectShape = (id: string) => {
    setSelectedShapeId(id);
    setShowColorPicker(true);
  };

  const updateShapeColor = (color: string) => {
    if (!selectedShapeId) return;

    setShapes((current) =>
      current.map((shape) =>
        shape.id === selectedShapeId ? { ...shape, color } : shape
      )
    );
    setShowColorPicker(false);
    setSelectedShapeId(null);
  };

  const clearMobile = () => {
    setShapes([]);
    setSelectedShapeId(null);
    setShowClearDialog(false);
    toast.success('Mobile cleared');
  };

  const saveMobile = () => {
    if (!mobileName.trim()) {
      toast.error('Please enter a name for your mobile');
      return;
    }

    if (shapes.length === 0) {
      toast.error('Add some shapes before saving');
      return;
    }

    const newMobile: SavedMobile = {
      id: Date.now().toString(),
      name: mobileName.trim().slice(0, 30),
      shapes: [...shapes],
      createdAt: Date.now(),
    };

    setSavedMobiles((current) => [...(current || []), newMobile]);
    setMobileName('');
    setShowSaveDialog(false);
    toast.success('Mobile saved!');
  };

  const deleteMobile = (id: string) => {
    setSavedMobiles((current) => (current || []).filter((m) => m.id !== id));
    toast.success('Mobile deleted');
  };

  const viewMobile = (mobile: SavedMobile) => {
    setShapes(mobile.shapes);
    setActiveTab('create');
    toast.success(`Viewing "${mobile.name}"`);
  };

  const selectedShape = shapes.find((s) => s.id === selectedShapeId);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight">Mobil</h1>
              <p className="text-sm text-muted-foreground">Kinetic Sculpture Creator</p>
            </div>
            {activeTab === 'create' && shapes.length > 0 && (
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {shapes.length} / {MAX_SHAPES}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <div className="border-b border-border bg-card/30 backdrop-blur-sm sticky top-[73px] z-10">
            <div className="container mx-auto px-4">
              <TabsList className="w-full grid grid-cols-2 h-14">
                <TabsTrigger value="create" className="text-base">Create</TabsTrigger>
                <TabsTrigger value="gallery" className="text-base">
                  Gallery {savedMobiles && savedMobiles.length > 0 && `(${savedMobiles.length})`}
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="create" className="m-0 pb-24">
            <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-200px)] relative">
              <AnimatePresence>
                {shapes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center min-h-[400px] text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-8xl mb-6"
                    >
                      🎨
                    </motion.div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Start creating your mobile
                    </h2>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Tap the + button below to add your first shape and watch it sway!
                    </p>
                  </motion.div>
                ) : (
                  <div className="relative min-h-[500px]">
                    {shapes.map((shape, index) => (
                      <Shape
                        key={shape.id}
                        type={shape.type}
                        color={shape.color}
                        x={shape.x}
                        y={shape.y}
                        selected={shape.id === selectedShapeId}
                        onClick={() => selectShape(shape.id)}
                        delay={index}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>

            <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex gap-3 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setShowShapeSelector(true)}
                    disabled={shapes.length >= MAX_SHAPES}
                    className="flex-1 max-w-[200px]"
                  >
                    <Plus size={20} weight="bold" />
                    Add Shape
                  </Button>
                  {shapes.length > 0 && (
                    <>
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => setShowSaveDialog(true)}
                        className="flex-1 max-w-[200px]"
                      >
                        <FloppyDisk size={20} weight="bold" />
                        Save
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => setShowClearDialog(true)}
                        className="shrink-0"
                      >
                        <Trash size={20} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="m-0">
            <Gallery
              mobiles={savedMobiles || []}
              onDelete={deleteMobile}
              onView={viewMobile}
            />
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showShapeSelector} onOpenChange={setShowShapeSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Choose a Shape</DialogTitle>
          </DialogHeader>
          <ShapeSelector onShapeSelect={addShape} />
        </DialogContent>
      </Dialog>

      {isMobile ? (
        <Drawer open={showColorPicker} onOpenChange={setShowColorPicker}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Choose a Color</DrawerTitle>
            </DrawerHeader>
            <ColorPicker
              selectedColor={selectedShape?.color || ''}
              onColorSelect={updateShapeColor}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Choose a Color</DialogTitle>
            </DialogHeader>
            <ColorPicker
              selectedColor={selectedShape?.color || ''}
              onColorSelect={updateShapeColor}
            />
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Save Your Mobile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              id="mobile-name"
              placeholder="My Beautiful Mobile"
              value={mobileName}
              onChange={(e) => setMobileName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveMobile()}
              maxLength={30}
              autoFocus
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowSaveDialog(false)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={saveMobile}>
                <FloppyDisk size={20} weight="bold" />
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear Mobile?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove all shapes from your current mobile. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearMobile}>Clear</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default App;
