"use client";

import React, { forwardRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  getLiquidGlassStyles,
  getLiquidGlassHoverStyles,
  getLiquidGlassCardStyles,
  getLiquidGlassButtonStyles,
  getLiquidGlassButtonHoverStyles,
  getLiquidGlassButtonActiveStyles,
  getLiquidGlassNavStyles,
  getScrollResponsiveLiquidGlass,
  getLiquidGlassTextStyles,
  type LiquidGlassConfig,
  type ScrollResponsiveConfig
} from '@/lib/liquid-glass-styles';

export interface LiquidGlassProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'card' | 'button' | 'nav';
  scrollResponsive?: boolean;
  hoverEffect?: boolean;
  config?: LiquidGlassConfig | ScrollResponsiveConfig;
  textVariant?: 'primary' | 'secondary' | 'accent';
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
}

/**
 * Apple Liquid Glass Component
 * Provides consistent glassmorphism styling across the portfolio
 */
export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(
  ({ 
    variant = 'base',
    scrollResponsive = false,
    hoverEffect = false,
    config = {},
    textVariant,
    className,
    children,
    as: Component = 'div',
    style,
    onMouseEnter,
    onMouseLeave,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Scroll tracking for responsive variants
    useEffect(() => {
      if (!scrollResponsive) return;

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / Math.max(maxScroll * 0.3, 200), 1);
        setScrollProgress(progress);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial call

      return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollResponsive]);

    // Get appropriate styles based on variant and state
    const getStyles = () => {
      const configWithScroll = scrollResponsive 
        ? { ...config, scrollProgress } as ScrollResponsiveConfig
        : config as LiquidGlassConfig;

      switch (variant) {
        case 'card':
          return isHovered && hoverEffect 
            ? getLiquidGlassHoverStyles(getLiquidGlassCardStyles(configWithScroll))
            : getLiquidGlassCardStyles(configWithScroll);
        
        case 'button':
          if (isPressed) {
            return getLiquidGlassButtonActiveStyles(configWithScroll);
          }
          return isHovered && hoverEffect
            ? getLiquidGlassButtonHoverStyles(configWithScroll)
            : getLiquidGlassButtonStyles(configWithScroll);
        
        case 'nav':
          return scrollResponsive
            ? getLiquidGlassNavStyles(configWithScroll)
            : getLiquidGlassNavStyles(config as ScrollResponsiveConfig);
        
        default:
          if (scrollResponsive) {
            return getScrollResponsiveLiquidGlass(configWithScroll);
          }
          return isHovered && hoverEffect 
            ? getLiquidGlassHoverStyles(configWithScroll)
            : getLiquidGlassStyles(configWithScroll);
      }
    };

    // Get text styles if textVariant is specified
    const textStyles = textVariant ? getLiquidGlassTextStyles(textVariant) : {};

    // Combined styles
    const generatedStyles = getStyles();
    const liquidGlassStyles = {
      ...generatedStyles,
      ...textStyles,
      ...style,
    };



    // Handle mouse events
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverEffect) setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (hoverEffect) {
        setIsHovered(false);
        setIsPressed(false);
      }
      onMouseLeave?.(e);
    };

    const handleMouseDown = () => {
      if (variant === 'button') setIsPressed(true);
    };

    const handleMouseUp = () => {
      if (variant === 'button') setIsPressed(false);
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'liquid-glass-element',
          variant === 'button' && 'cursor-pointer select-none',
          className
        )}
        style={liquidGlassStyles}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

LiquidGlass.displayName = 'LiquidGlass';

/**
 * Specialized Liquid Glass Card Component
 */
export const LiquidGlassCard = forwardRef<HTMLDivElement, Omit<LiquidGlassProps, 'variant'>>(
  (props, ref) => (
    <LiquidGlass ref={ref} variant="card" hoverEffect {...props} />
  )
);

LiquidGlassCard.displayName = 'LiquidGlassCard';

/**
 * Specialized Liquid Glass Button Component
 */
export const LiquidGlassButton = forwardRef<HTMLButtonElement, Omit<LiquidGlassProps, 'variant' | 'as'>>(
  (props, ref) => (
    <LiquidGlass ref={ref as any} variant="button" as="button" hoverEffect {...props} />
  )
);

LiquidGlassButton.displayName = 'LiquidGlassButton';

/**
 * Specialized Liquid Glass Navigation Component
 */
export const LiquidGlassNav = forwardRef<HTMLElement, Omit<LiquidGlassProps, 'variant' | 'as'>>(
  (props, ref) => (
    <LiquidGlass ref={ref as any} variant="nav" as="nav" scrollResponsive {...props} />
  )
);

LiquidGlassNav.displayName = 'LiquidGlassNav';

/**
 * Liquid Glass Text Component with proper contrast
 */
export interface LiquidGlassTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  as?: keyof JSX.IntrinsicElements;
}

export const LiquidGlassText = forwardRef<HTMLElement, LiquidGlassTextProps>(
  ({ variant = 'primary', as: Component = 'span', className, style, ...props }, ref) => {
    const textStyles = getLiquidGlassTextStyles(variant);

    return (
      <Component
        ref={ref as any}
        className={cn('liquid-glass-text', className)}
        style={{ ...textStyles, ...style }}
        {...props}
      />
    );
  }
);

LiquidGlassText.displayName = 'LiquidGlassText';

export default LiquidGlass;
