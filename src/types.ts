export type SvgLayer = 'full' | 'lines' | 'shapes';

export type ComponentCategory =
  | 'Arrow'
  | 'Banner'
  | 'Button'
  | 'Callout'
  | 'CircleFrame'
  | 'Corner'
  | 'DecorativeElement'
  | 'Divider'
  | 'Icon'
  | 'Line'
  | 'SquareFrame'
  | 'Window';

export const VARIANT_COUNTS: Record<ComponentCategory, number> = {
  Arrow: 10,
  Banner: 8,
  Button: 16,
  Callout: 10,
  CircleFrame: 8,
  Corner: 8,
  DecorativeElement: 12,
  Divider: 10,
  Icon: 21,
  Line: 10,
  SquareFrame: 8,
  Window: 9,
};

export const ALL_CATEGORIES: ComponentCategory[] = Object.keys(VARIANT_COUNTS) as ComponentCategory[];

export interface FantasyBaseProps {
  variant?: number;
  layer?: SvgLayer;
  color?: string;
  secondaryColor?: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
  animate?: boolean;
  animationDuration?: number;
  opacity?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  title?: string;
  ariaLabel?: string;
}

export interface FantasyContainerProps extends FantasyBaseProps {
  children?: React.ReactNode;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

export interface FantasyButtonProps extends FantasyContainerProps {
  disabled?: boolean;
  href?: string;
  target?: string;
}

export interface FantasyBannerProps extends FantasyContainerProps {
  text?: string;
}

export interface FantasyCalloutProps extends FantasyContainerProps {
  text?: string;
}

export interface FantasyArrowProps extends FantasyBaseProps {
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface FantasyCornerProps extends FantasyBaseProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
