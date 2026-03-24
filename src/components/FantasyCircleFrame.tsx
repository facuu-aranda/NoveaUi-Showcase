import { FantasyContainer } from './FantasyContainer';
import type { FantasyContainerProps } from '../types';

export function FantasyCircleFrame({
  variant = 1,
  children,
  contentClassName = '',
  ...props
}: FantasyContainerProps) {
  return (
    <FantasyContainer
      category="CircleFrame"
      variant={variant}
      contentInset={{ top: '22%', right: '22%', bottom: '22%', left: '22%' }}
      contentClassName={contentClassName}
      {...props}
    >
      {children}
    </FantasyContainer>
  );
}

export default FantasyCircleFrame;
