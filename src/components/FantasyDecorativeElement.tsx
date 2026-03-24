import { FantasyElement } from './FantasyElement';
import type { FantasyBaseProps } from '../types';

export function FantasyDecorativeElement({
  variant = 1,
  ...props
}: FantasyBaseProps) {
  return (
    <FantasyElement
      category="DecorativeElement"
      variant={variant}
      {...props}
    />
  );
}

export default FantasyDecorativeElement;
