"use client";

import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface MagnifyingLensProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  intensity?: 'subtle' | 'normal' | 'strong';
  enableScrollActivation?: boolean;
  scrollThreshold?: number;
  magnification?: number;
  lensSize?: number;
  distortionStrength?: number;
  className?: string;
}

/**
 * Apple-inspired Magnifying Glass Lens Effect
 * Creates realistic optical magnification effects when scrolling over content
 */
export const MagnifyingLens = forwardRef<HTMLDivElement, MagnifyingLensProps>(
  ({ 
    children,
    intensity = 'normal',
    enableScrollActivation = true,
    scrollThreshold = 100,
    magnification = 1.15,
    lensSize = 200,
    distortionStrength = 0.3,
    className,
    style,
    ...props 
  }, ref) => {
    const [isActive, setIsActive] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const lensRef = useRef<HTMLDivElement>(null);

    // Track scroll position for activation
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        if (enableScrollActivation) {
          setIsActive(currentScrollY > scrollThreshold);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }, [enableScrollActivation, scrollThreshold]);

    // Track mouse position for lens positioning
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        setMousePosition({ x, y });
      };

      if (isActive) {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, [isActive]);

    // Intensity configurations
    const intensityConfig = {
      subtle: {
        magnification: 1.08,
        blur: 0.5,
        brightness: 1.05,
        contrast: 1.02,
        distortion: 0.1,
        opacity: 0.15,
      },
      normal: {
        magnification: 1.15,
        blur: 0.8,
        brightness: 1.08,
        contrast: 1.05,
        distortion: 0.3,
        opacity: 0.2,
      },
      strong: {
        magnification: 1.25,
        blur: 1.2,
        brightness: 1.12,
        contrast: 1.08,
        distortion: 0.5,
        opacity: 0.25,
      }
    };

    const config = intensityConfig[intensity];

    // Calculate lens effect styles
    const getLensStyles = () => {
      if (!isActive) return { display: 'none' };

      const scrollProgress = Math.min(scrollY / 300, 1);
      const dynamicMagnification = config.magnification + scrollProgress * 0.08;
      const dynamicBlur = config.blur + scrollProgress * 0.4;
      const dynamicBrightness = config.brightness + scrollProgress * 0.06;
      const dynamicDistortion = config.distortion + scrollProgress * 0.2;

      return {
        position: 'absolute' as const,
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        pointerEvents: 'none' as const,
        zIndex: 10,

        // Enhanced lens distortion effect with Apple-style physics
        backdropFilter: `blur(${dynamicBlur}px) brightness(${dynamicBrightness}) contrast(${config.contrast + scrollProgress * 0.03}) saturate(${110 + scrollProgress * 10}%)`,
        WebkitBackdropFilter: `blur(${dynamicBlur}px) brightness(${dynamicBrightness}) contrast(${config.contrast + scrollProgress * 0.03}) saturate(${110 + scrollProgress * 10}%)`,

        // Sophisticated optical lens appearance with realistic light physics
        background: `
          radial-gradient(circle ${lensSize * (1 + scrollProgress * 0.3)}px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            rgba(255, 255, 255, ${config.opacity * (1 + scrollProgress * 0.5)}) 0%,
            rgba(255, 255, 255, ${config.opacity * 0.8 * (1 + scrollProgress * 0.3)}) 20%,
            rgba(255, 255, 255, ${config.opacity * 0.5 * (1 + scrollProgress * 0.2)}) 40%,
            rgba(255, 255, 255, ${config.opacity * 0.2}) 70%,
            transparent 100%),
          linear-gradient(45deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 50%,
            rgba(255, 255, 255, 0.05) 100%)`,

        // Advanced perspective distortion with realistic optical physics
        transform: `
          perspective(1200px)
          rotateX(${mousePosition.y * dynamicDistortion * 2}deg)
          rotateY(${(mousePosition.x - 0.5) * dynamicDistortion * 3}deg)
          scale(${dynamicMagnification})
          translateZ(${scrollProgress * 10}px)`,
        transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,

        // Smooth Apple-style transitions
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',

        // Subtle lens edge effects - reduced intensity
        boxShadow: `
          inset 0 0 ${lensSize * 0.6}px rgba(255, 255, 255, 0.08),
          inset 0 0 ${lensSize * 0.3}px rgba(0, 150, 255, 0.02),
          0 0 ${dynamicDistortion * 10}px rgba(255, 255, 255, 0.05)`,

        // Subtle optical refraction - reduced light scattering
        filter: `
          drop-shadow(0 0 ${dynamicDistortion * 8}px rgba(255, 255, 255, 0.15))
          drop-shadow(0 0 ${dynamicDistortion * 4}px rgba(0, 150, 255, 0.05))`,
      };
    };

    // Container styles with lens activation
    const getContainerStyles = () => {
      const scrollProgress = Math.min(scrollY / 300, 1);

      return {
        position: 'relative' as const,
        overflow: 'visible', // Allow lens effects to extend beyond bounds
        isolation: 'isolate',

        // Enhanced backdrop effects when lens is active with Apple-style refinement
        ...(isActive && {
          backdropFilter: `blur(${0.3 + scrollProgress * 0.7}px) saturate(${105 + scrollProgress * 5}%) brightness(${100 + scrollProgress * 2}%)`,
          WebkitBackdropFilter: `blur(${0.3 + scrollProgress * 0.7}px) saturate(${105 + scrollProgress * 5}%) brightness(${100 + scrollProgress * 2}%)`,

          // Subtle container enhancement for better lens visibility
          transform: `translateZ(0) scale(${1 + scrollProgress * 0.01})`,
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }),

        ...style,
      };
    };

    return (
      <div
        ref={ref}
        className={cn('magnifying-lens-container', className)}
        style={getContainerStyles()}
        {...props}
      >
        {/* Original Content */}
        <div ref={containerRef} className="relative z-0">
          {children}
        </div>

        {/* Magnifying Lens Effect */}
        <div
          ref={lensRef}
          className="magnifying-lens-effect"
          style={getLensStyles()}
          aria-hidden="true"
        />
      </div>
    );
  }
);

MagnifyingLens.displayName = 'MagnifyingLens';

export default MagnifyingLens;
