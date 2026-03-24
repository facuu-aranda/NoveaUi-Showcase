import { FantasyContainer } from './FantasyContainer';
import type { FantasyContainerProps } from '../types';

export function FantasySquareFrame({
  variant = 1,
  children,
  contentClassName = '',
  ...props
}: FantasyContainerProps) {
  return (
    <FantasyContainer
      category="SquareFrame"
      variant={variant}
      contentInset={{ top: '18%', right: '18%', bottom: '18%', left: '18%' }}
      contentClassName={contentClassName}
      {...props}
    >
      {children}
    </FantasyContainer>
  );
}

export default FantasySquareFrame;
