import { FantasyContainer } from './FantasyContainer';
import type { FantasyCalloutProps } from '../types';

export function FantasyCallout({
  variant = 1,
  text,
  children,
  contentClassName = '',
  ...props
}: FantasyCalloutProps) {
  return (
    <FantasyContainer
      category="Callout"
      variant={variant}
      contentInset={{ top: '10%', right: '12%', bottom: '10%', left: '12%' }}
      contentClassName={contentClassName}
      {...props}
    >
      {children ?? (
        text && (
          <span
            style={{
              fontFamily: "'Crimson Text', serif",
              textAlign: 'center',
              fontSize: 'clamp(0.65rem, 1.2vw, 1rem)',
              lineHeight: 1.4,
              color: 'inherit',
            }}
          >
            {text}
          </span>
        )
      )}
    </FantasyContainer>
  );
}

export default FantasyCallout;
