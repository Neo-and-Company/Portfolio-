"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LiquidGlassNav, LiquidGlassText } from '@/components/ui/LiquidGlass';

const navItems = [
  { label: 'Home', href: '/', description: 'About Gabriel Mancillas' },
  { label: 'Journey', href: '#career-journey', description: 'Career Timeline' },
  { label: 'Experience', href: '#experience', description: 'Professional Background' },
  { label: 'Projects', href: '#projects', description: 'Portfolio Showcase' },
  { label: 'Resume', href: '#resume', description: 'Download CV' },
  { label: 'Contact', href: '#contact', description: 'Get In Touch' },
];

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position for glassmorphism effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Enhanced Apple Island Glassmorphism
  const getEnhancedIslandStyles = (baseOpacity = 0.12, maxOpacity = 0.22) => {
    const scrollProgress = Math.min(scrollY / 200, 1);
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
    const blur = 5;
    const saturation = 140 + scrollProgress * 20;
    const brightness = 108 + scrollProgress * 12;
    const contrast = 102 + scrollProgress * 8;

    return {
      background: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%) contrast(${contrast}%)`,
      borderRadius: '50px',
      // Remove border from inline styles to avoid conflict with LiquidGlass component
      // border: `0.5px solid rgba(255, 255, 255, ${0.25 + scrollProgress * 0.35})`,
      boxShadow: isScrolled
        ? `0 20px 60px rgba(0, 0, 0, 0.12),
           0 8px 25px rgba(0, 0, 0, 0.08),
           0 2px 8px rgba(255, 255, 255, 0.3),
           inset 0 1px 0 rgba(255, 255, 255, 0.6),
           inset 0 -0.5px 0 rgba(0, 0, 0, 0.08)`
        : `0 16px 50px rgba(0, 0, 0, 0.08),
           0 6px 20px rgba(0, 0, 0, 0.05),
           0 1px 4px rgba(255, 255, 255, 0.25),
           inset 0 1px 0 rgba(255, 255, 255, 0.5),
           inset 0 -0.5px 0 rgba(0, 0, 0, 0.06)`,
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      transform: isScrolled ? 'translateY(-2px)' : 'translateY(0px)',
    };
  };

  return (
    <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <LiquidGlassNav
        className="flex items-center space-x-1"
        style={{
          ...getEnhancedIslandStyles(0.1, 0.2),
          padding: '16px 40px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
          zIndex: 2,
          minHeight: '60px',
          isolation: 'isolate',
          fontSize: '16px',
          fontWeight: '500',
          color: '#000000',
          textShadow: '0 0.5px 1px rgba(255, 255, 255, 0.8)',
          letterSpacing: '-0.01em',
        }}
        config={{
          scrollProgress: Math.min(scrollY / 200, 1),
          baseOpacity: 0.12,
          maxOpacity: 0.22,
          baseBlur: 5,
          maxBlur: 5,
          saturation: 140,
          brightness: 108,
          contrast: 102,
          // Set borderOpacity to match the scroll-responsive border from inline styles
          borderOpacity: 0.25 + (Math.min(scrollY / 200, 1) * 0.35),
          shadowIntensity: 0.08
        }}
      >
        {navItems.map((item) => {
          const isActive = (item.href === '/' && activeSection === 'home') ||
                         (item.href.includes('#') && activeSection === item.href.replace('#', ''));

          return (
            <Link
              key={item.label}
              href={item.href}
              title={item.description}
              className="nav-link"
              style={{
                padding: '16px 24px',
                borderRadius: '32px',
                fontSize: '16px',
                fontWeight: '500',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                backgroundColor: isActive
                  ? 'rgba(0, 0, 0, 0.65)'
                  : 'transparent',
                color: isActive ? '#ffffff' : '#000000',
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: isActive ? 'blur(5px) saturate(140%)' : 'none',
                border: isActive ? '0.5px solid rgba(255, 255, 255, 0.3)' : '0.5px solid transparent',
                boxShadow: isActive
                  ? `inset 0 1px 0 rgba(255, 255, 255, 0.4),
                     inset 0 -0.5px 0 rgba(0, 0, 0, 0.2),
                     0 4px 12px rgba(0, 0, 0, 0.2),
                     0 1px 3px rgba(0, 0, 0, 0.1)`
                  : 'none',
                letterSpacing: '-0.01em',
                textShadow: isActive
                  ? '0 1px 2px rgba(0, 0, 0, 0.3)'
                  : '0 0.5px 1px rgba(255, 255, 255, 0.8)',
                isolation: 'isolate',
                zIndex: 10,
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              <LiquidGlassText variant={isActive ? "accent" : "primary"}>
                {item.label}
              </LiquidGlassText>
            </Link>
          );
        })}
      </LiquidGlassNav>
    </header>
  );
};

export default Header;
