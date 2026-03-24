import { FantasyContainer } from './FantasyContainer';
import type { FantasyContainerProps } from '../types';

export function FantasyWindow({
  variant = 1,
  children,
  contentClassName = '',
  ...props
}: FantasyContainerProps) {
  return (
    <FantasyContainer
      category="Window"
      variant={variant}
      contentInset={{ top: '12%', right: '10%', bottom: '14%', left: '10%' }}
      contentClassName={contentClassName}
      {...props}
    >
      {children}
    </FantasyContainer>
  );
}

export default FantasyWindow;
