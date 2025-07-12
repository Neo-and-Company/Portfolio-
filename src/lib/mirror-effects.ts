/**
 * Mirror Effects Utility Library
 * Physics-based mirror reflection system with light engineering effects
 */

export interface MirrorConfig {
  opacity?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  perspective?: number;
  rotationX?: number;
  rotationY?: number;
  height?: number; // Percentage of original height
  fadeStops?: number[]; // Custom gradient stops
}

export interface LightPhysicsConfig {
  refraction?: boolean;
  scattering?: boolean;
  luminescence?: boolean;
  surfaceTension?: boolean;
  dynamicResponse?: boolean;
}

/**
 * Generate CSS styles for mirror reflection with light physics
 */
export const getMirrorReflectionStyles = (config: MirrorConfig = {}) => {
  const {
    opacity = 0.08,
    blur = 0.5,
    brightness = 0.9,
    contrast = 1.1,
    saturation = 1.0,
    perspective = 1000,
    rotationX = 2,
    rotationY = 0,
    height = 100,
    fadeStops = [0.9, 0.7, 0.4, 0.2, 0.05, 0]
  } = config;

  // Generate advanced gradient mask for realistic light physics
  const gradientStops = fadeStops.map((stop, index) => {
    const position = (index / (fadeStops.length - 1)) * 100;
    return `rgba(0,0,0,${stop}) ${position}%`;
  }).join(', ');

  return {
    position: 'absolute' as const,
    top: '100%',
    left: 0,
    right: 0,
    height: `${height}%`,
    transform: `scaleY(-1) perspective(${perspective}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
    opacity,
    pointerEvents: 'none' as const,
    zIndex: -1,
    
    // Advanced gradient mask for light physics
    maskImage: `linear-gradient(to bottom, ${gradientStops})`,
    WebkitMaskImage: `linear-gradient(to bottom, ${gradientStops})`,
    
    // Light refraction and surface effects
    filter: `blur(${blur}px) brightness(${brightness}) contrast(${contrast}) saturate(${saturation})`,
    backdropFilter: `blur(${blur * 2}px) brightness(${brightness + 0.05})`,
    WebkitBackdropFilter: `blur(${blur * 2}px) brightness(${brightness + 0.05})`,
    
    // Smooth physics-based transitions
    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
  };
};

/**
 * Enhanced mirror reflection with light scattering effects
 */
export const getEnhancedMirrorStyles = (config: MirrorConfig = {}) => {
  const baseStyles = getMirrorReflectionStyles({
    opacity: 0.05,
    blur: 1,
    brightness: 0.85,
    contrast: 1.15,
    saturation: 0.9,
    height: 120,
    ...config
  });

  return {
    ...baseStyles,
    
    // Advanced multi-layer gradient for light scattering
    maskImage: `
      radial-gradient(ellipse 100% 60% at center top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%),
      linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)
    `,
    WebkitMaskImage: `
      radial-gradient(ellipse 100% 60% at center top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%),
      linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%)
    `,
    maskComposite: 'intersect',
    WebkitMaskComposite: 'source-in',
    
    // Surface tension-like animation
    transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
  };
};

/**
 * Mirror surface with luminescence effects
 */
export const getMirrorSurfaceStyles = (intensity: number = 0.6) => {
  return {
    position: 'absolute' as const,
    top: '100%',
    left: '-2%',
    right: '-2%',
    height: '2px',
    background: `linear-gradient(
      90deg,
      transparent 0%,
      rgba(255,255,255,${intensity * 0.17}) 20%,
      rgba(255,255,255,${intensity * 0.33}) 50%,
      rgba(255,255,255,${intensity * 0.17}) 80%,
      transparent 100%
    )`,
    borderRadius: '50%',
    filter: 'blur(1px)',
    opacity: intensity,
    zIndex: 1,
    animation: 'surfaceGlow 3s ease-in-out infinite alternate',
  };
};

/**
 * Dynamic light interaction based on mouse position
 */
export const getDynamicLightStyles = (
  mouseX: number, 
  mouseY: number, 
  baseConfig: MirrorConfig = {}
) => {
  // Normalize mouse position (0-1)
  const normalizedX = Math.max(0, Math.min(1, mouseX));
  const normalizedY = Math.max(0, Math.min(1, mouseY));
  
  // Calculate light angle and intensity
  const lightAngle = (normalizedX - 0.5) * 10; // -5 to 5 degrees
  const lightIntensity = Math.max(0.3, 1 - normalizedY * 0.5); // Stronger at top
  const distortionFactor = normalizedY * 0.5; // More distortion towards bottom
  
  return getMirrorReflectionStyles({
    ...baseConfig,
    blur: (baseConfig.blur || 0.5) + distortionFactor,
    brightness: (baseConfig.brightness || 0.9) + lightIntensity * 0.1,
    contrast: (baseConfig.contrast || 1.1) + normalizedX * 0.1,
    rotationX: (baseConfig.rotationX || 2) + normalizedY * 2,
    rotationY: lightAngle,
  });
};

/**
 * Hover state enhancements for mirror effects
 */
export const getMirrorHoverStyles = (baseConfig: MirrorConfig = {}) => {
  return getMirrorReflectionStyles({
    ...baseConfig,
    opacity: Math.min((baseConfig.opacity || 0.08) * 1.5, 0.2),
    blur: Math.max((baseConfig.blur || 0.5) * 0.6, 0.3),
    brightness: Math.min((baseConfig.brightness || 0.9) + 0.05, 0.98),
    contrast: Math.min((baseConfig.contrast || 1.1) - 0.05, 1.15),
    rotationX: Math.max((baseConfig.rotationX || 2) - 1, 0.5),
  });
};

/**
 * Dock-style mirror reflection (macOS-inspired)
 */
export const getDockMirrorStyles = (config: MirrorConfig = {}) => {
  return getMirrorReflectionStyles({
    opacity: 0.1,
    blur: 0.3,
    brightness: 0.95,
    contrast: 1.05,
    saturation: 1.0,
    perspective: 1000,
    rotationX: 1.5,
    height: 80,
    fadeStops: [0.8, 0.6, 0.4, 0.2, 0.1, 0],
    ...config
  });
};

/**
 * Apply mirror effect to an existing DOM element
 */
export const applyMirrorEffect = (
  element: HTMLElement,
  config: MirrorConfig = {},
  lightPhysics: LightPhysicsConfig = {}
) => {
  // Create mirror container if it doesn't exist
  if (!element.parentElement?.classList.contains('mirror-container')) {
    const container = document.createElement('div');
    container.className = 'mirror-container';
    container.style.cssText = 'position: relative; display: inline-block; isolation: isolate;';
    
    element.parentNode?.insertBefore(container, element);
    container.appendChild(element);
  }

  // Create reflection element
  const reflection = element.cloneNode(true) as HTMLElement;
  reflection.className += ' mirror-reflection-clone';
  reflection.setAttribute('aria-hidden', 'true');
  
  // Apply mirror styles
  const styles = config.opacity && config.opacity > 0.1 
    ? getEnhancedMirrorStyles(config)
    : getMirrorReflectionStyles(config);
  
  Object.assign(reflection.style, styles);
  
  // Add to container
  element.parentElement?.appendChild(reflection);
  
  // Add surface luminescence if enabled
  if (lightPhysics.luminescence) {
    const surface = document.createElement('div');
    surface.className = 'mirror-surface-dynamic';
    surface.setAttribute('aria-hidden', 'true');
    Object.assign(surface.style, getMirrorSurfaceStyles());
    element.parentElement?.appendChild(surface);
  }
  
  return reflection;
};

/**
 * CSS class names for mirror effects
 */
export const mirrorClasses = {
  container: 'mirror-container',
  reflection: 'mirror-reflection',
  enhanced: 'mirror-reflection-enhanced',
  surface: 'mirror-surface',
  dock: 'mirror-dock-style',
} as const;
