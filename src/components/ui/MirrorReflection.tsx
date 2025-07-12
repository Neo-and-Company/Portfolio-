"use client";

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MirrorReflectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'standard' | 'enhanced' | 'dock';
  intensity?: 'subtle' | 'normal' | 'strong';
  enablePhysics?: boolean;
  enableLightEffects?: boolean;
  reflectionHeight?: number; // Percentage of original height
  surfaceGlow?: boolean;
  className?: string;
}

/**
 * Advanced Mirror Reflection Component with Light Physics
 * Implements realistic mirror effects similar to macOS dock reflections
 */
export const MirrorReflection = forwardRef<HTMLDivElement, MirrorReflectionProps>(
  ({ 
    children,
    variant = 'standard',
    intensity = 'normal',
    enablePhysics = true,
    enableLightEffects = true,
    reflectionHeight = 100,
    surfaceGlow = true,
    className,
    style,
    onMouseEnter,
    onMouseLeave,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const reflectionRef = useRef<HTMLDivElement>(null);

    // Physics-based light interaction
    useEffect(() => {
      if (!enablePhysics || !containerRef.current) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      };

      const container = containerRef.current;
      container.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    }, [enablePhysics]);

    // Dynamic light refraction based on mouse position
    const getLightRefractionStyle = () => {
      if (!enablePhysics || !isHovered) return {};
      
      const { x, y } = mousePosition;
      const lightAngle = (x - 0.5) * 10; // -5 to 5 degrees
      const lightIntensity = Math.max(0.3, 1 - y * 0.5); // Stronger at top
      
      return {
        transform: `scaleY(-1) perspective(1000px) rotateX(${2 + y * 2}deg) rotateY(${lightAngle}deg)`,
        filter: `blur(${0.5 + y * 0.5}px) brightness(${0.85 + lightIntensity * 0.1}) contrast(${1.1 + x * 0.1})`,
      };
    };

    // Get intensity-based opacity values
    const getIntensityConfig = () => {
      const configs = {
        subtle: { base: 0.04, hover: 0.07, enhanced: 0.03 },
        normal: { base: 0.08, hover: 0.12, enhanced: 0.05 },
        strong: { base: 0.15, hover: 0.20, enhanced: 0.10 }
      };
      return configs[intensity];
    };

    const intensityConfig = getIntensityConfig();

    // Handle mouse events
    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setMousePosition({ x: 0.5, y: 0.5 });
      onMouseLeave?.(e);
    };

    // Reflection styles based on variant
    const getReflectionStyles = () => {
      const baseStyle = {
        position: 'absolute' as const,
        top: '100%',
        left: 0,
        right: 0,
        height: `${reflectionHeight}%`,
        pointerEvents: 'none' as const,
        zIndex: -1,
        transition: enablePhysics 
          ? 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'all 0.3s ease-out',
      };

      switch (variant) {
        case 'enhanced':
          return {
            ...baseStyle,
            opacity: isHovered ? intensityConfig.hover : intensityConfig.enhanced,
            ...getLightRefractionStyle(),
          };
        
        case 'dock':
          return {
            ...baseStyle,
            opacity: isHovered ? intensityConfig.hover * 1.2 : intensityConfig.base * 1.1,
            transform: isHovered 
              ? 'scaleY(-1) translateY(-2px) perspective(1000px) rotateX(1deg)'
              : 'scaleY(-1) perspective(1000px) rotateX(2deg)',
            filter: isHovered
              ? 'blur(0.3px) brightness(0.95) contrast(1.05)'
              : 'blur(0.5px) brightness(0.9) contrast(1.1)',
          };
        
        default:
          return {
            ...baseStyle,
            opacity: isHovered ? intensityConfig.hover : intensityConfig.base,
            transform: isHovered 
              ? 'scaleY(-1) translateY(-1px)'
              : 'scaleY(-1)',
            filter: isHovered
              ? 'blur(0.3px) brightness(0.95) contrast(1.05)'
              : 'blur(0.5px) brightness(0.9) contrast(1.1)',
          };
      }
    };

    // Surface glow styles
    const getSurfaceStyles = () => {
      if (!surfaceGlow) return { display: 'none' };
      
      return {
        position: 'absolute' as const,
        top: '100%',
        left: '-2%',
        right: '-2%',
        height: '2px',
        background: isHovered
          ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)'
          : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)',
        borderRadius: '50%',
        filter: 'blur(1px)',
        opacity: isHovered ? 0.8 : 0.6,
        zIndex: 1,
        animation: 'surfaceGlow 3s ease-in-out infinite alternate',
        transition: 'all 0.3s ease-out',
      };
    };

    return (
      <div
        ref={ref}
        className={cn('mirror-container', className)}
        style={{
          position: 'relative',
          display: 'inline-block',
          isolation: 'isolate',
          ...style,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Original Content */}
        <div ref={containerRef}>
          {children}
        </div>

        {/* Mirror Reflection */}
        <div
          ref={reflectionRef}
          className={cn(
            variant === 'enhanced' ? 'mirror-reflection-enhanced' : 'mirror-reflection',
            'select-none'
          )}
          style={getReflectionStyles()}
          aria-hidden="true"
        >
          {children}
        </div>

        {/* Mirror Surface with Luminescence */}
        {enableLightEffects && (
          <div
            className="mirror-surface"
            style={getSurfaceStyles()}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

MirrorReflection.displayName = 'MirrorReflection';

export default MirrorReflection;
