import { useMemo } from 'react';
import { FantasyElement } from './FantasyElement';
import type { FantasyCornerProps } from '../types';

const POSITION_TRANSFORMS: Record<string, { flipX: boolean; flipY: boolean }> = {
  'top-left': { flipX: false, flipY: false },
  'top-right': { flipX: true, flipY: false },
  'bottom-left': { flipX: false, flipY: true },
  'bottom-right': { flipX: true, flipY: true },
};

export function FantasyCorner({
  variant = 1,
  position = 'top-left',
  flipX: propFlipX = false,
  flipY: propFlipY = false,
  ...props
}: FantasyCornerProps) {
  const positionTransform = useMemo(
    () => POSITION_TRANSFORMS[position] ?? POSITION_TRANSFORMS['top-left'],
    [position]
  );

  return (
    <FantasyElement
      category="Corner"
      variant={variant}
      flipX={positionTransform.flipX !== propFlipX}
      flipY={positionTransform.flipY !== propFlipY}
      {...props}
    />
  );
}

export default FantasyCorner;
