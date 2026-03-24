import { FantasyElement } from './FantasyElement';
import type { FantasyBaseProps } from '../types';

export function FantasyIcon({
  variant = 1,
  width = 48,
  height = 48,
  ...props
}: FantasyBaseProps) {
  return (
    <FantasyElement
      category="Icon"
      variant={variant}
      width={width}
      height={height}
      {...props}
    />
  );
}

export default FantasyIcon;
