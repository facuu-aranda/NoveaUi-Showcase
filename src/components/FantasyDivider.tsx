import { FantasyElement } from './FantasyElement';
import type { FantasyBaseProps } from '../types';

export function FantasyDivider({
  variant = 1,
  width = '100%',
  ...props
}: FantasyBaseProps) {
  return (
    <FantasyElement
      category="Divider"
      variant={variant}
      width={width}
      {...props}
    />
  );
}

export default FantasyDivider;
