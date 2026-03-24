import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Palette, Layers, Maximize2, RotateCw } from 'lucide-react';
import {
  FantasyArrow,
  FantasyBanner,
  FantasyButton,
  FantasyCallout,
  FantasyCircleFrame,
  FantasyCorner,
  FantasyDecorativeElement,
  FantasyDivider,
  FantasyIcon,
  FantasyLine,
  FantasySquareFrame,
  FantasyWindow,
} from '../components';
import { ALL_CATEGORIES, VARIANT_COUNTS } from '../types';
import type { SvgLayer, ComponentCategory } from '../types';

const LAYER_OPTIONS: { value: SvgLayer; label: string }[] = [
  { value: 'full', label: 'Full Elements' },
  { value: 'lines', label: 'Lines Only' },
  { value: 'shapes', label: 'Shapes Only' },
];

const COLOR_PRESETS = [
  { name: 'Gold', value: '#c4a35a' },
  { name: 'Silver', value: '#a0a0b0' },
  { name: 'Bronze', value: '#cd7f32' },
  { name: 'Emerald', value: '#2ecc71' },
  { name: 'Ruby', value: '#e74c3c' },
  { name: 'Sapphire', value: '#3498db' },
  { name: 'Amethyst', value: '#9b59b6' },
  { name: 'Ivory', value: '#fffff0' },
  { name: 'White', value: '#ffffff' },
];

const CATEGORY_ICONS: Record<ComponentCategory, string> = {
  Arrow: '➤',
  Banner: '🏴',
  Button: '◈',
  Callout: '💬',
  CircleFrame: '◎',
  Corner: '◸',
  DecorativeElement: '✦',
  Divider: '━',
  Icon: '✧',
  Line: '─',
  SquareFrame: '▣',
  Window: '⊞',
};

const CATEGORY_DESCRIPTIONS: Record<ComponentCategory, string> = {
  Arrow: 'Ornate directional arrows with Art Nouveau flourishes',
  Banner: 'Vertical & horizontal banners for titles and announcements',
  Button: 'Interactive button frames with elaborate borders',
  Callout: 'Speech bubbles and callout boxes with decorative edges',
  CircleFrame: 'Circular ornamental frames for avatars and icons',
  Corner: 'Corner decorations that can be mirrored to all four positions',
  DecorativeElement: 'Standalone ornamental elements for visual enrichment',
  Divider: 'Horizontal dividers and separators with fantasy motifs',
  Icon: 'Decorative icon shapes with intricate Art Nouveau details',
  Line: 'Elegant lines and underlines for subtle decoration',
  SquareFrame: 'Rectangular ornamental frames for cards and panels',
  Window: 'Large window frames for content panels and dialogs',
};

function ComponentShowcase({
  category,
  layer,
  color,
}: {
  category: ComponentCategory;
  layer: SvgLayer;
  color: string;
}) {
  const count = VARIANT_COUNTS[category];
  const variants = useMemo(() => Array.from({ length: count }, (_, i) => i + 1), [count]);

  const renderComponent = useCallback(
    (variant: number) => {
      const commonProps = {
        variant,
        layer,
        color,
        animate: true,
      };

      switch (category) {
        case 'Arrow':
          return <FantasyArrow {...commonProps} width={120} height={160} />;
        case 'Banner':
          return <FantasyBanner {...commonProps} width={160} height={320} text={`Banner ${variant}`} />;
        case 'Button':
          return (
            <FantasyButton {...commonProps} width={220} height={80} onClick={() => {}}>
              Button {variant}
            </FantasyButton>
          );
        case 'Callout':
          return <FantasyCallout {...commonProps} width={200} height={80} text={`Callout ${variant}`} />;
        case 'CircleFrame':
          return (
            <FantasyCircleFrame {...commonProps} width={160} height={160}>
              <span style={{ fontSize: '0.7rem', fontFamily: "'Cinzel', serif", color }}>
                {variant}
              </span>
            </FantasyCircleFrame>
          );
        case 'Corner':
          return <FantasyCorner {...commonProps} width={120} height={120} />;
        case 'DecorativeElement':
          return <FantasyDecorativeElement {...commonProps} width={180} height={180} />;
        case 'Divider':
          return <FantasyDivider {...commonProps} width={280} />;
        case 'Icon':
          return <FantasyIcon {...commonProps} width={80} height={80} />;
        case 'Line':
          return <FantasyLine {...commonProps} width={280} />;
        case 'SquareFrame':
          return (
            <FantasySquareFrame {...commonProps} width={180} height={160}>
              <span style={{ fontSize: '0.65rem', fontFamily: "'Cinzel', serif", color }}>
                Frame {variant}
              </span>
            </FantasySquareFrame>
          );
        case 'Window':
          return (
            <FantasyWindow {...commonProps} width={280} height={220}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.7rem', fontFamily: "'Cinzel', serif", color }}>
                  Window {variant}
                </span>
              </div>
            </FantasyWindow>
          );
        default:
          return null;
      }
    },
    [category, layer, color]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {variants.map((v) => (
        <motion.div
          key={`${category}-${v}`}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-fantasy-surface/50 border border-fantasy-border/30 hover:border-fantasy-gold/40 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: v * 0.03, duration: 0.4 }}
        >
          <div className="flex items-center justify-center min-h-[120px] w-full">
            {renderComponent(v)}
          </div>
          <span className="text-xs text-fantasy-text-dim font-heading mt-1">
            Variant {v}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function CornerDemo({ layer, color }: { layer: SvgLayer; color: string }) {
  return (
    <div className="mt-6 p-6 rounded-xl bg-fantasy-surface/50 border border-fantasy-border/30">
      <h4 className="font-heading text-fantasy-gold text-sm mb-4 text-center">Corner Positions Demo</h4>
      <div className="relative w-64 h-64 mx-auto border border-fantasy-border/50 rounded-lg">
        <div className="absolute top-0 left-0">
          <FantasyCorner variant={1} layer={layer} color={color} width={60} height={60} position="top-left" />
        </div>
        <div className="absolute top-0 right-0">
          <FantasyCorner variant={1} layer={layer} color={color} width={60} height={60} position="top-right" />
        </div>
        <div className="absolute bottom-0 left-0">
          <FantasyCorner variant={1} layer={layer} color={color} width={60} height={60} position="bottom-left" />
        </div>
        <div className="absolute bottom-0 right-0">
          <FantasyCorner variant={1} layer={layer} color={color} width={60} height={60} position="bottom-right" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-heading text-fantasy-text-dim text-xs">4 Corners</span>
        </div>
      </div>
    </div>
  );
}

function ArrowDirectionDemo({ layer, color }: { layer: SvgLayer; color: string }) {
  return (
    <div className="mt-6 p-6 rounded-xl bg-fantasy-surface/50 border border-fantasy-border/30">
      <h4 className="font-heading text-fantasy-gold text-sm mb-4 text-center">Arrow Directions Demo</h4>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {(['up', 'right', 'down', 'left'] as const).map((dir) => (
          <div key={dir} className="flex flex-col items-center gap-1">
            <FantasyArrow variant={1} layer={layer} color={color} width={60} height={80} direction={dir} />
            <span className="text-xs text-fantasy-text-dim capitalize">{dir}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Showcase() {
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>('Button');
  const [layer, setLayer] = useState<SvgLayer>('full');
  const [color, setColor] = useState('#c4a35a');
  const [customColor, setCustomColor] = useState('#c4a35a');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleColorPreset = (value: string) => {
    setColor(value);
    setCustomColor(value);
  };

  const handleCustomColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomColor(e.target.value);
    setColor(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-fantasy-bg">
      {/* Mobile menu toggle */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-fantasy-surface border border-fantasy-border text-fantasy-gold"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay on mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-black/60 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-72 
          bg-fantasy-surface border-r border-fantasy-border 
          overflow-y-auto flex-shrink-0
          transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo header */}
        <div className="p-6 border-b border-fantasy-border">
          <h1 className="font-heading text-xl text-fantasy-gold tracking-wider">
            NouveaUI
          </h1>
          <p className="text-xs text-fantasy-text-dim mt-1">UI Component Library</p>
        </div>

        {/* Category nav */}
        <nav className="p-3">
          <p className="text-[10px] uppercase tracking-widest text-fantasy-text-dim px-3 mb-2 font-heading">
            Components
          </p>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm
                transition-all duration-200 mb-0.5 group
                ${
                  activeCategory === cat
                    ? 'bg-fantasy-gold/15 text-fantasy-gold border border-fantasy-gold/30'
                    : 'text-fantasy-text-dim hover:text-fantasy-text hover:bg-fantasy-surface-light border border-transparent'
                }
              `}
            >
              <span className="text-base w-5 text-center">{CATEGORY_ICONS[cat]}</span>
              <span className="flex-1 font-heading text-xs tracking-wide">{cat}</span>
              <span className="text-[10px] opacity-60">{VARIANT_COUNTS[cat]}</span>
              <ChevronRight
                size={12}
                className={`opacity-0 group-hover:opacity-60 transition-opacity ${
                  activeCategory === cat ? '!opacity-60' : ''
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="p-4 border-t border-fantasy-border mt-2">
          {/* Layer selector */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Layers size={12} className="text-fantasy-gold" />
              <span className="text-[10px] uppercase tracking-widest text-fantasy-text-dim font-heading">
                Layer
              </span>
            </div>
            <div className="flex flex-col gap-1">
              {LAYER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setLayer(opt.value)}
                  className={`
                    px-3 py-1.5 rounded text-xs text-left transition-all duration-200
                    ${
                      layer === opt.value
                        ? 'bg-fantasy-gold/15 text-fantasy-gold border border-fantasy-gold/30'
                        : 'text-fantasy-text-dim hover:text-fantasy-text hover:bg-fantasy-surface-light border border-transparent'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Palette size={12} className="text-fantasy-gold" />
              <span className="text-[10px] uppercase tracking-widest text-fantasy-text-dim font-heading">
                Color
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mb-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleColorPreset(preset.value)}
                  className={`
                    flex items-center gap-1.5 px-2 py-1 rounded text-[10px] transition-all duration-200
                    ${
                      color === preset.value
                        ? 'bg-fantasy-gold/15 ring-1 ring-fantasy-gold/40'
                        : 'hover:bg-fantasy-surface-light'
                    }
                  `}
                  title={preset.name}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-fantasy-border flex-shrink-0"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span className="text-fantasy-text-dim truncate">{preset.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColor}
                className="w-8 h-8 rounded cursor-pointer border border-fantasy-border bg-transparent"
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) {
                    setColor(e.target.value);
                  }
                }}
                className="flex-1 px-2 py-1 text-xs bg-fantasy-bg border border-fantasy-border rounded text-fantasy-text font-mono"
                placeholder="#c4a35a"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-fantasy-bg/80 backdrop-blur-md border-b border-fantasy-border px-4 sm:px-8 py-5">
          <div className="flex items-center gap-4 pl-10 lg:pl-0">
            <span className="text-2xl">{CATEGORY_ICONS[activeCategory]}</span>
            <div>
              <h2 className="font-heading text-lg text-fantasy-gold tracking-wide">
                {activeCategory}
              </h2>
              <p className="text-xs text-fantasy-text-dim">
                {CATEGORY_DESCRIPTIONS[activeCategory]}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-fantasy-text-dim">
                <Maximize2 size={10} />
                <span>{VARIANT_COUNTS[activeCategory]} variants</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-[10px] text-fantasy-text-dim">
                <RotateCw size={10} />
                <span>3 layers</span>
              </div>
              <div
                className="w-4 h-4 rounded-full border border-fantasy-border"
                style={{ backgroundColor: color }}
                title={color}
              />
            </div>
          </div>
        </header>

        {/* Component grid */}
        <div className="p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${layer}-${color}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ComponentShowcase
                category={activeCategory}
                layer={layer}
                color={color}
              />

              {activeCategory === 'Corner' && <CornerDemo layer={layer} color={color} />}
              {activeCategory === 'Arrow' && <ArrowDirectionDemo layer={layer} color={color} />}
            </motion.div>
          </AnimatePresence>

          {/* Usage example */}
          <div className="mt-10 p-6 rounded-xl bg-fantasy-surface/50 border border-fantasy-border/30">
            <h3 className="font-heading text-sm text-fantasy-gold mb-3 flex items-center gap-2">
              <span>{'</>'}</span> Usage Example
            </h3>
            <pre className="text-xs text-fantasy-text-dim bg-fantasy-bg rounded-lg p-4 overflow-x-auto">
              <code>{getUsageExample(activeCategory, layer, color)}</code>
            </pre>
          </div>

          {/* Composition demo */}
          <div className="mt-8 p-6 rounded-xl bg-fantasy-surface/50 border border-fantasy-border/30">
            <h3 className="font-heading text-sm text-fantasy-gold mb-6 text-center">
              ✦ Composition Demo ✦
            </h3>
            <CompositionDemo layer={layer} color={color} />
          </div>
        </div>
      </main>
    </div>
  );
}

function CompositionDemo({ layer, color }: { layer: SvgLayer; color: string }) {
  return (
    <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
      {/* Title with decorative elements */}
      <div className="flex items-center gap-4 w-full justify-center">
        <FantasyLine variant={3} layer={layer} color={color} width={120} flipX />
        <FantasyIcon variant={1} layer={layer} color={color} width={40} height={40} />
        <FantasyLine variant={3} layer={layer} color={color} width={120} />
      </div>

      {/* Window with content */}
      <FantasyWindow variant={1} layer={layer} color={color} width={400}>
        <div className="text-center" style={{ color }}>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', marginBottom: 4 }}>
            Welcome, Adventurer
          </p>
          <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.7rem', opacity: 0.7 }}>
            Choose your destiny wisely
          </p>
        </div>
      </FantasyWindow>

      {/* Buttons row */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <FantasyButton variant={1} layer={layer} color={color} width={180} height={60} onClick={() => {}}>
          Accept Quest
        </FantasyButton>
        <FantasyButton variant={4} layer={layer} color={color} width={180} height={60} onClick={() => {}}>
          Decline
        </FantasyButton>
      </div>

      {/* Divider */}
      <FantasyDivider variant={5} layer={layer} color={color} width="80%" />

      {/* Frames row */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        <FantasyCircleFrame variant={1} layer={layer} color={color} width={100} height={100}>
          <span style={{ fontSize: '0.5rem', fontFamily: "'Cinzel', serif", color }}>Avatar</span>
        </FantasyCircleFrame>
        <FantasySquareFrame variant={1} layer={layer} color={color} width={140} height={120}>
          <span style={{ fontSize: '0.5rem', fontFamily: "'Cinzel', serif", color }}>Card</span>
        </FantasySquareFrame>
        <FantasyCircleFrame variant={3} layer={layer} color={color} width={100} height={100}>
          <span style={{ fontSize: '0.5rem', fontFamily: "'Cinzel', serif", color }}>Badge</span>
        </FantasyCircleFrame>
      </div>

      <FantasyDivider variant={1} layer={layer} color={color} width="60%" />
    </div>
  );
}

function getUsageExample(category: ComponentCategory, layer: SvgLayer, color: string): string {
  const layerStr = layer === 'full' ? '' : `\n  layer="${layer}"`;
  const colorStr = color === '#c4a35a' ? '' : `\n  color="${color}"`;

  switch (category) {
    case 'Arrow':
      return `import { FantasyArrow } from './components';

<FantasyArrow
  variant={1}${layerStr}${colorStr}
  direction="right"
  width={120}
  height={160}
/>`;
    case 'Banner':
      return `import { FantasyBanner } from './components';

<FantasyBanner
  variant={1}${layerStr}${colorStr}
  text="Your Title Here"
  width={160}
/>`;
    case 'Button':
      return `import { FantasyButton } from './components';

<FantasyButton
  variant={1}${layerStr}${colorStr}
  onClick={() => console.log('clicked')}
  width={220}
  height={80}
>
  Click Me
</FantasyButton>`;
    case 'Callout':
      return `import { FantasyCallout } from './components';

<FantasyCallout
  variant={1}${layerStr}${colorStr}
  text="Important message!"
  width={200}
/>`;
    case 'CircleFrame':
      return `import { FantasyCircleFrame } from './components';

<FantasyCircleFrame
  variant={1}${layerStr}${colorStr}
  width={160}
  height={160}
>
  <img src="avatar.png" alt="avatar" />
</FantasyCircleFrame>`;
    case 'Corner':
      return `import { FantasyCorner } from './components';

<FantasyCorner
  variant={1}${layerStr}${colorStr}
  position="top-left"
  width={80}
  height={80}
/>`;
    case 'DecorativeElement':
      return `import { FantasyDecorativeElement } from './components';

<FantasyDecorativeElement
  variant={1}${layerStr}${colorStr}
  width={180}
  height={180}
  animate
/>`;
    case 'Divider':
      return `import { FantasyDivider } from './components';

<FantasyDivider
  variant={1}${layerStr}${colorStr}
  width="100%"
/>`;
    case 'Icon':
      return `import { FantasyIcon } from './components';

<FantasyIcon
  variant={1}${layerStr}${colorStr}
  width={48}
  height={48}
/>`;
    case 'Line':
      return `import { FantasyLine } from './components';

<FantasyLine
  variant={1}${layerStr}${colorStr}
  width="100%"
/>`;
    case 'SquareFrame':
      return `import { FantasySquareFrame } from './components';

<FantasySquareFrame
  variant={1}${layerStr}${colorStr}
  width={200}
  height={180}
>
  <p>Your content</p>
</FantasySquareFrame>`;
    case 'Window':
      return `import { FantasyWindow } from './components';

<FantasyWindow
  variant={1}${layerStr}${colorStr}
  width={400}
  height={300}
>
  <div>Your window content here</div>
</FantasyWindow>`;
    default:
      return '';
  }
}

export default Showcase;
