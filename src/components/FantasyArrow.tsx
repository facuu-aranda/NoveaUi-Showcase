import { useMemo } from 'react';
import { FantasyElement } from './FantasyElement';
import type { FantasyArrowProps } from '../types';

const DIRECTION_ROTATIONS: Record<string, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

export function FantasyArrow({
  variant = 1,
  direction = 'up',
  rotate = 0,
  ...props
}: FantasyArrowProps) {
  const finalRotation = useMemo(
    () => (DIRECTION_ROTATIONS[direction] ?? 0) + rotate,
    [direction, rotate]
  );

  return (
    <FantasyElement
      category="Arrow"
      variant={variant}
      rotate={finalRotation}
      {...props}
    />
  );
}

export default FantasyArrow;
