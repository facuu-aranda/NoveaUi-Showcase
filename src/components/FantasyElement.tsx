import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSvgLoader } from '../hooks/useSvgLoader';
import type { FantasyBaseProps, ComponentCategory } from '../types';

interface FantasyElementInternalProps extends FantasyBaseProps {
  category: ComponentCategory;
}

export function FantasyElement({
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
}: FantasyElementInternalProps) {
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
      display: 'inline-block',
      lineHeight: 0,
      ...style,
    }),
    [width, height, opacity, transform, style]
  );

  if (isLoading) {
    return (
      <div
        className={`fantasy-element fantasy-loading ${className}`}
        style={{ ...mergedStyle, minHeight: 40 }}
      />
    );
  }

  if (error || !svgContent) {
    return null;
  }

  const svgElement = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{ width: '100%', height: '100%' }}
      role={ariaLabel ? 'img' : 'presentation'}
      aria-label={ariaLabel}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );

  if (animate) {
    return (
      <motion.div
        className={`fantasy-element ${className}`}
        style={mergedStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={title}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity, scale: 1 }}
        transition={{ duration: animationDuration * 0.3, ease: 'easeOut' }}
        whileHover={onClick ? { scale: 1.02 } : undefined}
        whileTap={onClick ? { scale: 0.98 } : undefined}
      >
        {svgElement}
      </motion.div>
    );
  }

  return (
    <div
      className={`fantasy-element ${className}`}
      style={mergedStyle}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      title={title}
    >
      {svgElement}
    </div>
  );
}

export default FantasyElement;
