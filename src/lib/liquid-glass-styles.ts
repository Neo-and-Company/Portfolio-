/**
 * Apple Liquid Glass Design System
 * Reusable styling utilities for consistent glassmorphism effects
 */

export interface LiquidGlassConfig {
  opacity?: number;
  blur?: number;
  saturation?: number;
  brightness?: number;
  contrast?: number;
  borderOpacity?: number;
  shadowIntensity?: number;
}

export interface ScrollResponsiveConfig extends LiquidGlassConfig {
  scrollProgress?: number;
  baseOpacity?: number;
  maxOpacity?: number;
  baseBlur?: number;
  maxBlur?: number;
}

/**
 * Core Apple Liquid Glass styling function
 */
export const getLiquidGlassStyles = (config: LiquidGlassConfig = {}) => {
  const {
    opacity = 0.15,
    blur = 5,
    saturation = 130,
    brightness = 108,
    contrast = 102,
    borderOpacity = 0.25,
    shadowIntensity = 0.08
  } = config;

  const styles: any = {
    background: `rgba(255, 255, 255, ${opacity})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`,
    boxShadow: `
      0 20px 60px rgba(0, 0, 0, ${shadowIntensity}),
      0 8px 25px rgba(0, 0, 0, ${shadowIntensity * 0.6}),
      inset 0 1px 0 rgba(255, 255, 255, 0.9),
      inset 0 -0.5px 0 rgba(0, 0, 0, 0.03)
    `,
    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  // Only apply border styles if borderOpacity > 0 to avoid conflicts
  if (borderOpacity > 0) {
    styles.borderTop = `0.5px solid rgba(255, 255, 255, ${borderOpacity})`;
    styles.borderRight = `0.5px solid rgba(255, 255, 255, ${borderOpacity})`;
    styles.borderBottom = `0.5px solid rgba(255, 255, 255, ${borderOpacity})`;
    styles.borderLeft = `0.5px solid rgba(255, 255, 255, ${borderOpacity})`;
  }

  return styles;
};

/**
 * Scroll-responsive Liquid Glass styling
 */
export const getScrollResponsiveLiquidGlass = (config: ScrollResponsiveConfig = {}) => {
  const {
    scrollProgress = 0,
    baseOpacity = 0.12,
    maxOpacity = 0.20,
    baseBlur = 5,
    maxBlur = 5,
    saturation = 130,
    brightness = 108,
    contrast = 102,
    borderOpacity = 0.25,
    shadowIntensity = 0.08
  } = config;

  const currentOpacity = baseOpacity + (scrollProgress * (maxOpacity - baseOpacity));
  const currentBlur = baseBlur + (scrollProgress * (maxBlur - baseBlur));
  const currentBorderOpacity = borderOpacity + (scrollProgress * 0.15);
  const currentShadowIntensity = shadowIntensity + (scrollProgress * 0.04);

  return getLiquidGlassStyles({
    opacity: currentOpacity,
    blur: currentBlur,
    saturation: saturation + (scrollProgress * 15),
    brightness: brightness + (scrollProgress * 8),
    contrast: contrast + (scrollProgress * 3),
    borderOpacity: currentBorderOpacity,
    shadowIntensity: currentShadowIntensity
  });
};

/**
 * Hover state for Liquid Glass elements
 */
export const getLiquidGlassHoverStyles = (config: LiquidGlassConfig = {}) => {
  const baseStyles = getLiquidGlassStyles(config);
  
  return {
    ...baseStyles,
    opacity: Math.min((config.opacity || 0.15) + 0.1, 0.35),
    backdropFilter: `blur(${(config.blur || 32) + 8}px) saturate(${(config.saturation || 130) + 10}%) brightness(${(config.brightness || 108) + 4}%) contrast(${(config.contrast || 102) + 3}%)`,
    WebkitBackdropFilter: `blur(${(config.blur || 32) + 8}px) saturate(${(config.saturation || 130) + 10}%) brightness(${(config.brightness || 108) + 4}%) contrast(${(config.contrast || 102) + 3}%)`,
    transform: 'scale(1.02) translateY(-1px)',
    boxShadow: `
      0 24px 70px rgba(0, 0, 0, ${(config.shadowIntensity || 0.08) + 0.04}),
      0 10px 30px rgba(0, 0, 0, ${(config.shadowIntensity || 0.08) + 0.02}),
      inset 0 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -0.5px 0 rgba(0, 0, 0, 0.02)
    `,
  };
};

/**
 * Card variant of Liquid Glass
 */
export const getLiquidGlassCardStyles = (config: LiquidGlassConfig = {}) => {
  const baseStyles = getLiquidGlassStyles({
    opacity: 0.18,
    blur: 5,
    saturation: 125,
    brightness: 110,
    contrast: 104,
    borderOpacity: 0.3,
    shadowIntensity: 0.06,
    ...config
  });

  // Handle border properties separately to avoid conflicts with inline styles
  const { borderTop, borderRight, borderBottom, borderLeft, ...stylesWithoutBorder } = baseStyles;

  return {
    ...stylesWithoutBorder,
    borderRadius: '16px',
    padding: '24px',
    // Only include border properties if borderOpacity is not explicitly set to 0
    ...(config.borderOpacity !== 0 && {
      borderTop,
      borderRight,
      borderBottom,
      borderLeft
    }),
  };
};

/**
 * Button variant of Liquid Glass with enhanced animations
 */
export const getLiquidGlassButtonStyles = (config: LiquidGlassConfig = {}) => {
  const baseStyles = getLiquidGlassStyles({
    opacity: 0.22,
    blur: 5,
    saturation: 140,
    brightness: 112,
    contrast: 105,
    borderOpacity: 0.4,
    shadowIntensity: 0.1,
    ...config
  });

  return {
    ...baseStyles,
    borderRadius: '12px',
    padding: '12px 24px',
    cursor: 'pointer',
    userSelect: 'none' as const,
    transform: 'scale(1) translateY(0px)',
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };
};

/**
 * Button hover state with Apple-style animations
 */
export const getLiquidGlassButtonHoverStyles = (config: LiquidGlassConfig = {}) => {
  const baseStyles = getLiquidGlassButtonStyles(config);

  return {
    ...baseStyles,
    transform: 'scale(1.03) translateY(-1px)',
    opacity: Math.min((config.opacity || 0.22) + 0.08, 0.4),
    backdropFilter: `blur(${(config.blur || 5) + 3}px) saturate(${(config.saturation || 140) + 15}%) brightness(${(config.brightness || 112) + 6}%) contrast(${(config.contrast || 105) + 4}%)`,
    WebkitBackdropFilter: `blur(${(config.blur || 5) + 3}px) saturate(${(config.saturation || 140) + 15}%) brightness(${(config.brightness || 112) + 6}%) contrast(${(config.contrast || 105) + 4}%)`,
    boxShadow: `
      0 8px 32px rgba(0, 0, 0, ${(config.shadowIntensity || 0.1) + 0.05}),
      0 4px 16px rgba(0, 0, 0, ${(config.shadowIntensity || 0.1) + 0.03}),
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -0.5px 0 rgba(0, 0, 0, 0.04)
    `,
  };
};

/**
 * Button active/pressed state
 */
export const getLiquidGlassButtonActiveStyles = (config: LiquidGlassConfig = {}) => {
  const baseStyles = getLiquidGlassButtonStyles(config);

  return {
    ...baseStyles,
    transform: 'scale(0.98) translateY(1px)',
    opacity: Math.min((config.opacity || 0.22) + 0.05, 0.35),
    transition: 'all 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };
};

/**
 * Navigation variant of Liquid Glass
 */
export const getLiquidGlassNavStyles = (config: ScrollResponsiveConfig = {}) => {
  return getScrollResponsiveLiquidGlass({
    baseOpacity: 0.08,
    maxOpacity: 0.18,
    baseBlur: 5,
    maxBlur: 5,
    saturation: 120,
    brightness: 105,
    contrast: 101,
    borderOpacity: 0.2,
    shadowIntensity: 0.05,
    ...config
  });
};

/**
 * Apple-style text styling for Liquid Glass backgrounds with enhanced visibility
 */
export const getLiquidGlassTextStyles = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const styles = {
    primary: {
      color: '#ffffff',
      fontWeight: '600' as const,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 8px rgba(0, 0, 0, 0.2)',
      letterSpacing: '-0.02em',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    secondary: {
      color: '#ffffff',
      fontWeight: '500' as const,
      textShadow: '0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.25), 0 0 6px rgba(0, 0, 0, 0.15)',
      letterSpacing: '-0.01em',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    accent: {
      color: '#ffffff',
      fontWeight: '700' as const,
      textShadow: '0 1px 3px rgba(0, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4), 0 0 10px rgba(0, 0, 0, 0.3)',
      letterSpacing: '-0.03em',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    }
  };

  return styles[variant];
};

/**
 * Utility function to apply Liquid Glass styles to React elements
 */
export const applyLiquidGlassStyles = (
  element: HTMLElement,
  config: LiquidGlassConfig = {},
  hover: boolean = false
) => {
  const styles = hover ? getLiquidGlassHoverStyles(config) : getLiquidGlassStyles(config);
  
  Object.assign(element.style, styles);
};

/**
 * CSS class names for Liquid Glass variants
 */
export const liquidGlassClasses = {
  base: 'liquid-glass-base',
  card: 'liquid-glass-card',
  button: 'liquid-glass-button',
  nav: 'liquid-glass-nav',
  text: {
    primary: 'liquid-glass-text-primary',
    secondary: 'liquid-glass-text-secondary',
    accent: 'liquid-glass-text-accent',
  }
};
