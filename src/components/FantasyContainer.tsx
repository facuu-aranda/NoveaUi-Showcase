import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSvgLoader } from '../hooks/useSvgLoader';
import type { FantasyContainerProps, ComponentCategory } from '../types';

interface FantasyContainerInternalProps extends FantasyContainerProps {
  category: ComponentCategory;
  contentInset?: { top?: string; right?: string; bottom?: string; left?: string };
}

export function FantasyContainer({
  category,
  variant = 1,
  layer = 'full',
  color,
  secondaryColor,
  width,
  height,
  className = '',
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  animate = false,
  animationDuration = 2,
  opacity = 1,
  rotate = 0,
  flipX = false,
  flipY = false,
  title,
  ariaLabel,
  children,
  contentClassName = '',
  contentStyle,
  contentInset = {},
}: FantasyContainerInternalProps) {
  const { svgContent, viewBox, isLoading, error } = useSvgLoader(
    category,
    variant,
    layer,
    color,
    secondaryColor
  );

  const transform = useMemo(() => {
    const parts: string[] = [];
    if (rotate !== 0) parts.push(`rotate(${rotate}deg)`);
    if (flipX) parts.push('scaleX(-1)');
    if (flipY) parts.push('scaleY(-1)');
    return parts.length > 0 ? parts.join(' ') : undefined;
  }, [rotate, flipX, flipY]);

  const mergedStyle: React.CSSProperties = useMemo(
    () => ({
      width: width ?? '100%',
      height: height ?? 'auto',
      opacity,
      transform,
      position: 'relative' as const,
      display: 'inline-block',
      ...style,
    }),
    [width, height, opacity, transform, style]
  );

  const innerContentStyle: React.CSSProperties = useMemo(
    () => ({
      position: 'absolute' as const,
      top: contentInset.top ?? '20%',
      right: contentInset.right ?? '15%',
      bottom: contentInset.bottom ?? '20%',
      left: contentInset.left ?? '15%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      ...contentStyle,
    }),
    [contentInset, contentStyle]
  );

  if (isLoading) {
    return (
      <div
        className={`fantasy-container fantasy-loading ${className}`}
        style={{ ...mergedStyle, minHeight: 60 }}
      />
    );
  }

  if (error || !svgContent) {
    return null;
  }

  const inner = (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
        style={{ width: '100%', height: '100%', display: 'block' }}
        role={ariaLabel ? 'img' : 'presentation'}
        aria-label={ariaLabel}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
      {children && (
        <div className={`fantasy-container-content ${contentClassName}`} style={innerContentStyle}>
          {children}
        </div>
      )}
    </>
  );

  if (animate) {
    return (
      <motion.div
        className={`fantasy-container ${className}`}
        style={mergedStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity, y: 0 }}
        transition={{ duration: animationDuration * 0.3, ease: 'easeOut' }}
        whileHover={onClick ? { scale: 1.01 } : undefined}
        whileTap={onClick ? { scale: 0.99 } : undefined}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <div
      className={`fantasy-container ${className}`}
      style={mergedStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={title}
    >
      {inner}
    </div>
  );
}

export default FantasyContainer;
