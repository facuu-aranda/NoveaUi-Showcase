import { FantasyContainer } from './FantasyContainer';
import type { FantasyButtonProps } from '../types';

export function FantasyButton({
  variant = 1,
  children,
  disabled = false,
  href,
  target,
  onClick,
  contentClassName = '',
  ...props
}: FantasyButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if (href) {
      window.open(href, target ?? '_self');
    }
    onClick?.(e);
  };

  return (
    <FantasyContainer
      category="Button"
      variant={variant}
      contentInset={{ top: '15%', right: '20%', bottom: '15%', left: '20%' }}
      onClick={handleClick}
      contentClassName={contentClassName}
      style={{
        cursor: disabled ? 'not-allowed' : href || onClick ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : props.opacity ?? 1,
        transition: 'filter 0.2s ease',
        ...(props.style ?? {}),
      }}
      {...props}
    >
      {children && (
        <span
          style={{
            fontFamily: "'Cinzel', serif",
            textAlign: 'center',
            fontSize: 'clamp(0.6rem, 1.2vw, 1rem)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </span>
      )}
    </FantasyContainer>
  );
}

export default FantasyButton;
