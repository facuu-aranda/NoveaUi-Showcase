import { FantasyElement } from './FantasyElement';
import type { FantasyBaseProps } from '../types';

export function FantasyLine({
  variant = 1,
  width = '100%',
  ...props
}: FantasyBaseProps) {
  return (
    <FantasyElement
      category="Line"
      variant={variant}
      width={width}
      {...props}
    />
  );
}

export default FantasyLine;
