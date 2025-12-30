# Planning Guide

A modern mobile-first kinetic sculpture creator that lets users build and animate digital mobiles (hanging art sculptures) with physics-based movement and customizable elements.

**Experience Qualities**:
1. **Playful** - Creating mobiles should feel like a delightful toy, encouraging experimentation with shapes, colors, and motion
2. **Serene** - The gentle swaying motion of completed mobiles creates a calming, meditative experience
3. **Creative** - Users express themselves through unique combinations of shapes, colors, and balance configurations

**Complexity Level**: Light Application (multiple features with basic state)
This is a creative tool with multiple interactive features including shape selection, color customization, physics simulation, and persistent saved creations.

## Essential Features

### Mobile Builder Canvas
- **Functionality**: Visual canvas where users construct their mobile by adding shapes that hang and balance
- **Purpose**: Core creative space where the mobile comes to life with real-time physics
- **Trigger**: App loads with an empty canvas ready for creation
- **Progression**: User sees canvas → clicks add shape button → selects shape type → shape appears hanging from top → can add more shapes that automatically balance → mobile sways with simulated physics
- **Success criteria**: Shapes hang, sway naturally, and create visual balance

### Shape Library
- **Functionality**: Collection of geometric shapes (circles, triangles, stars, hearts) users can add to their mobile
- **Purpose**: Provides variety in mobile composition and artistic expression
- **Trigger**: User clicks the "Add Shape" button
- **Progression**: User clicks add → shape selector appears → user picks shape → shape appears on canvas → user can customize color
- **Success criteria**: At least 6 different shape types available, each renders clearly and hangs properly

### Color Customization
- **Functionality**: Users can select colors for each shape in their mobile
- **Purpose**: Personalization and artistic expression through color choices
- **Trigger**: User taps on a shape in the mobile
- **Progression**: User taps shape → color picker appears → user selects color → shape updates immediately → picker closes
- **Success criteria**: Smooth color changes with a curated palette of 12+ colors

### Save & Gallery
- **Functionality**: Users can save their mobile creations and view past creations in a gallery
- **Purpose**: Persistence and collection building, encouraging return visits
- **Trigger**: User clicks save button or views gallery tab
- **Progression**: User builds mobile → clicks save → names mobile → mobile appears in gallery → can tap gallery item to view saved mobile
- **Success criteria**: Mobiles persist between sessions, gallery shows thumbnails, can delete mobiles

### Physics Animation
- **Functionality**: Realistic swaying motion that responds to interaction
- **Purpose**: Brings mobiles to life with natural movement
- **Trigger**: Constantly running while mobile exists, amplified by user interaction
- **Progression**: Shapes gently sway → user drags/taps shape → motion increases → gradually returns to gentle sway
- **Success criteria**: Motion feels natural and calming, not jarring or mechanical

## Edge Case Handling

- **Empty Canvas**: Show friendly prompt with animation encouraging user to add first shape
- **Single Shape**: Adjust physics so single shapes still have gentle movement without looking static
- **Maximum Shapes**: Limit to 8 shapes per mobile to maintain performance and visual clarity
- **Long Shape Names**: Truncate saved mobile names over 30 characters with ellipsis
- **No Saved Mobiles**: Gallery shows empty state with illustration and "Create your first mobile" message
- **Rapid Interactions**: Debounce color changes and shape additions to prevent overwhelming the physics engine

## Design Direction

The design should evoke the gentle, meditative quality of watching a real mobile sway in a breeze, while feeling modern and playful. Think calm yet joyful, minimalist yet colorful—like a contemporary art gallery for kinetic sculptures. The interface should fade into the background, letting the user's creation take center stage.

## Color Selection

A soft, organic palette inspired by sky, sunset, and natural materials, with vibrant accent colors for the mobile shapes themselves.

- **Primary Color**: Warm terracotta `oklch(0.65 0.15 35)` - earthy and inviting, used for primary actions and creating a grounded feel
- **Secondary Colors**: Soft sage `oklch(0.85 0.05 140)` for secondary UI elements; pale sky blue `oklch(0.92 0.03 240)` for backgrounds
- **Accent Color**: Bright coral `oklch(0.70 0.18 25)` - energetic and attention-grabbing for CTAs and active states
- **Foreground/Background Pairings**: 
  - Background (Pale Sky) `oklch(0.92 0.03 240)`: Deep Slate text `oklch(0.25 0.02 260)` - Ratio 11.2:1 ✓
  - Primary (Terracotta) `oklch(0.65 0.15 35)`: White text `oklch(1 0 0)` - Ratio 5.1:1 ✓
  - Accent (Coral) `oklch(0.70 0.18 25)`: White text `oklch(1 0 0)` - Ratio 4.9:1 ✓

## Font Selection

Typography should feel friendly and contemporary with a slight geometric quality that echoes the shapes in the mobiles.

**Primary**: Space Grotesk for headings and UI - geometric yet warm, distinctive without being distracting
**Secondary**: Inter for body text and smaller UI elements - clean, readable, pairs well with Space Grotesk

- **Typographic Hierarchy**: 
  - H1 (Page Title): Space Grotesk Bold/32px/tight letter spacing (-0.02em)
  - H2 (Section Headers): Space Grotesk Semibold/20px/normal spacing
  - Button Labels: Space Grotesk Medium/15px/wide spacing (0.02em)
  - Body Text: Inter Regular/15px/relaxed leading (1.6)
  - Shape Count: Space Grotesk Bold/48px/tight for the large display numbers

## Animations

Animations should enhance the feeling of gentle, natural motion and provide satisfying feedback without being distracting.

**Physics Motion**: Shapes continuously sway with pendulum-like motion using spring physics (damping: 0.3, stiffness: 50) creating a meditative quality
**Shape Entry**: New shapes fade in and drop from above with a gentle bounce (300ms ease-out)
**Color Changes**: Smooth color transitions using 200ms ease for immediate but not jarring updates
**Button Presses**: Subtle scale-down to 0.95 on press with 100ms spring-back for tactile feedback
**Gallery Navigation**: Slide transitions between mobiles with 400ms ease-in-out for spatial clarity

## Component Selection

- **Components**: 
  - Dialog (shape selector when adding new shapes)
  - Button (primary actions like "Add Shape", "Save", "Clear")
  - Card (gallery items showing saved mobiles)
  - Tabs (switching between Create and Gallery views)
  - Input (naming mobiles when saving)
  - Popover (color picker triggered by tapping shapes)
  - Badge (shape count indicator)
  - Alert Dialog (confirmation for clearing/deleting)
  
- **Customizations**: 
  - Custom SVG shapes (circle, triangle, star, square, heart, moon) with proper hanging animations
  - Custom color palette component with grid of color swatches
  - Canvas component using framer-motion for physics simulation
  
- **States**: 
  - Buttons: Default has subtle shadow, hover scales to 1.05, active scales to 0.95, disabled reduces opacity to 0.5
  - Shapes: Default gentle sway, hover brightens by 10%, selected shows pulsing ring, dragging increases scale to 1.1
  - Color swatches: Default with border, selected shows check icon, hover shows tooltip with color name
  
- **Icon Selection**: 
  - Plus (add shape)
  - Palette (color customization)
  - FloppyDisk (save mobile)
  - Trash (delete mobile)
  - Circle, Triangle, Star, Square, Heart (shape options)
  - ArrowLeft (back navigation)
  
- **Spacing**: 
  - Base unit: 4px (Tailwind's default)
  - Section gaps: gap-6 (24px)
  - Button padding: px-6 py-3 (24px horizontal, 12px vertical)
  - Card padding: p-4 (16px)
  - Canvas margins: m-4 (16px)
  
- **Mobile**: 
  - Bottom-fixed action bar with primary controls (Add, Save, Clear) always accessible
  - Gallery uses single-column grid on mobile, expanding to 2-column on tablet (768px+)
  - Tabs use full width with large touch targets (min 44px height)
  - Color picker appears as bottom sheet on mobile (using Drawer component) instead of popover
  - Canvas takes full viewport minus header and action bar for maximum creative space
