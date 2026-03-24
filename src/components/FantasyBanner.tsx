import { FantasyContainer } from './FantasyContainer';
import type { FantasyBannerProps } from '../types';

export function FantasyBanner({
  variant = 1,
  text,
  children,
  contentClassName = '',
  ...props
}: FantasyBannerProps) {
  return (
    <FantasyContainer
      category="Banner"
      variant={variant}
      contentInset={{ top: '18%', right: '18%', bottom: '8%', left: '18%' }}
      contentClassName={contentClassName}
      {...props}
    >
      {children ?? (
        text && (
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              textAlign: 'center',
              fontSize: 'clamp(0.7rem, 1.5vw, 1.2rem)',
              lineHeight: 1.3,
              color: 'inherit',
              wordBreak: 'break-word',
            }}
          >
            {text}
          </span>
        )
      )}
    </FantasyContainer>
  );
}

export default FantasyBanner;
