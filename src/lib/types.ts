export type ShapeType = 'circle' | 'triangle' | 'star' | 'square' | 'heart' | 'moon';

export interface MobileShape {
  id: string;
  type: ShapeType;
  color: string;
  x: number;
  y: number;
}

export interface SavedMobile {
  id: string;
  name: string;
  shapes: MobileShape[];
  createdAt: number;
}

export const SHAPE_COLORS = [
  { name: 'Coral', value: 'oklch(0.70 0.18 25)' },
  { name: 'Rose', value: 'oklch(0.65 0.20 15)' },
  { name: 'Lavender', value: 'oklch(0.68 0.15 290)' },
  { name: 'Sky', value: 'oklch(0.70 0.15 240)' },
  { name: 'Teal', value: 'oklch(0.65 0.15 190)' },
  { name: 'Mint', value: 'oklch(0.70 0.15 160)' },
  { name: 'Sage', value: 'oklch(0.68 0.12 140)' },
  { name: 'Honey', value: 'oklch(0.75 0.18 80)' },
  { name: 'Peach', value: 'oklch(0.78 0.16 50)' },
  { name: 'Plum', value: 'oklch(0.55 0.20 320)' },
  { name: 'Navy', value: 'oklch(0.45 0.15 260)' },
  { name: 'Forest', value: 'oklch(0.50 0.15 150)' },
];

export const MAX_SHAPES = 8;
