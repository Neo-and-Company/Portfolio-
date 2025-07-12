
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', description: 'About Gabriel Mancillas' }, // Points to AboutMe/Hero section
  { label: 'Journey', href: '#career-journey', description: 'Career Timeline' }, // Points to CareerRoadmap section
  { label: 'Experience', href: '#experience', description: 'Professional Background' }, // Points to ProfessionalSummary section
  { label: 'Projects', href: '#projects', description: 'Portfolio Showcase' }, // Points to ProjectShowcaseGrid section
  { label: 'Research', href: '/research', description: 'Academic Research & Publications' }, // Points to Research page
  { label: 'Resume', href: '#resume', description: 'Download CV' }, // Points to ResumeDownload section
  { label: 'Contact', href: '#contact', description: 'Get In Touch' }, // Points to ContactSection
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track active section and scroll position for glassmorphism effects
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'career-journey', 'experience', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;
      const currentScrollY = window.scrollY;

      // Update scroll state for glassmorphism effects
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 50);

      // Hide scroll hint after user scrolls
      if (scrollPosition > 100 && showScrollHint) {
        setShowScrollHint(false);
      }

      for (const section of sections) {
        const element = section === 'home' ? document.body : document.getElementById(section);
        if (element) {
          const offsetTop = section === 'home' ? 0 : element.offsetTop;
          const offsetBottom = offsetTop + (section === 'home' ? window.innerHeight : element.offsetHeight);

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollHint]);

  // Hide scroll hint after a few seconds or on user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 8000); // Hide after 8 seconds for better visibility

    const handleUserInteraction = () => {
      setShowScrollHint(false);
    };

    // Hide on any user interaction
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Dynamic glassmorphism styles based on scroll position
  const getGlassmorphismStyles = (baseOpacity = 0.8, maxOpacity = 0.95) => {
    const scrollProgress = Math.min(scrollY / 200, 1);
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
    const blur = 20 + scrollProgress * 10; // Increase blur on scroll

    return {
      background: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      borderRadius: '50px',
      border: `1px solid rgba(255, 255, 255, ${0.2 + scrollProgress * 0.3})`,
      boxShadow: isScrolled
        ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: isScrolled ? 'translateY(0px)' : 'translateY(0px)',
    };
  };

  // Enhanced logo glassmorphism styles
  const getLogoGlassmorphismStyles = () => {
    const scrollProgress = Math.min(scrollY / 200, 1);
    const opacity = 0.8 + scrollProgress * 0.15;
    const blur = 20 + scrollProgress * 10;

    return {
      background: `rgba(255, 255, 255, ${opacity})`,
      backdropFilter: `blur(${blur}px) saturate(180%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(180%)`,
      borderRadius: '50%',
      border: `1px solid rgba(255, 255, 255, ${0.2 + scrollProgress * 0.3})`,
      boxShadow: isScrolled
        ? '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        : '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  // Mirror reflection styles for Apple-style dock reflection
  const getReflectionStyles = (baseOpacity = 0.8, maxOpacity = 0.95) => {
    const scrollProgress = Math.min(scrollY / 200, 1);
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
    const blur = 20 + scrollProgress * 10;
    const reflectionOpacity = (0.25 + scrollProgress * 0.05); // 25-30% opacity for reflection

    return {
      background: `rgba(255, 255, 255, ${opacity * reflectionOpacity})`,
      backdropFilter: `blur(${blur * 0.8}px) saturate(150%)`, // Slightly less blur for reflection
      WebkitBackdropFilter: `blur(${blur * 0.8}px) saturate(150%)`,
      borderRadius: '50px',
      border: `1px solid rgba(255, 255, 255, ${(0.2 + scrollProgress * 0.3) * 0.5})`,
      boxShadow: 'none', // No shadow on reflection
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scaleY(-1)', // Flip vertically for mirror effect
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    };
  };

  // Logo reflection styles
  const getLogoReflectionStyles = () => {
    const scrollProgress = Math.min(scrollY / 200, 1);
    const opacity = 0.8 + scrollProgress * 0.15;
    const blur = 20 + scrollProgress * 10;
    const reflectionOpacity = (0.2 + scrollProgress * 0.05); // 20-25% opacity for logo reflection

    return {
      background: `rgba(255, 255, 255, ${opacity * reflectionOpacity})`,
      backdropFilter: `blur(${blur * 0.8}px) saturate(150%)`,
      WebkitBackdropFilter: `blur(${blur * 0.8}px) saturate(150%)`,
      borderRadius: '50%',
      border: `1px solid rgba(255, 255, 255, ${(0.2 + scrollProgress * 0.3) * 0.4})`,
      boxShadow: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      transform: 'scaleY(-1)',
      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
    };
  };

  return (
    <>
      {/* Apple-Style Island Navigation - Enhanced Glassmorphism with Mirror Reflection */}
      <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        {/* Main Navigation */}
        <nav
          style={{
            ...getGlassmorphismStyles(0.75, 0.95),
            padding: '14px 36px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            willChange: 'transform, opacity, backdrop-filter',
            position: 'relative',
            zIndex: 2,
          }}
          className="hidden md:flex items-center space-x-2"
        >
          {navItems.map((item) => {
            const isActive = (item.href === '/' && activeSection === 'home') ||
                           (item.href.includes('#') && activeSection === item.href.replace('#', ''));

            return (
              <Link
                key={item.label}
                href={item.href}
                title={item.description}
                style={{
                  padding: '14px 22px',
                  borderRadius: '28px',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: isActive
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'transparent',
                  color: isActive ? '#1d1d1f' : '#6e6e73',
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: isActive ? 'blur(10px)' : 'none',
                  border: isActive ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
                  boxShadow: isActive
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.5), 0 1px 3px rgba(0, 0, 0, 0.1)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.06)';
                    e.currentTarget.style.color = '#1d1d1f';
                    e.currentTarget.style.backdropFilter = 'blur(8px)';
                    e.currentTarget.style.border = '1px solid rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#6e6e73';
                    e.currentTarget.style.backdropFilter = 'none';
                    e.currentTarget.style.border = '1px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mirror Reflection - Apple Dock Style */}
        <div
          style={{
            ...getReflectionStyles(0.75, 0.95),
            padding: '14px 36px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            willChange: 'transform, opacity, backdrop-filter',
            position: 'absolute',
            top: 'calc(100% + 3px)', // 3px gap for floating effect
            left: '0',
            right: '0',
            zIndex: 1,
            pointerEvents: 'none', // Disable interactions with reflection
          }}
          className="hidden md:flex items-center space-x-2"
        >
          {navItems.map((item) => {
            const isActive = (item.href === '/' && activeSection === 'home') ||
                           (item.href.includes('#') && activeSection === item.href.replace('#', ''));

            return (
              <div
                key={`reflection-${item.label}`}
                style={{
                  padding: '14px 22px',
                  borderRadius: '28px',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  backgroundColor: isActive
                    ? 'rgba(0, 0, 0, 0.05)' // Reduced opacity for reflection
                    : 'transparent',
                  color: isActive ? 'rgba(29, 29, 31, 0.6)' : 'rgba(110, 110, 115, 0.6)', // Reduced opacity
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: isActive ? 'blur(5px)' : 'none', // Reduced blur for reflection
                  border: isActive ? '1px solid rgba(0, 0, 0, 0.02)' : '1px solid transparent',
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>

        {/* Mobile Island Menu - Enhanced Glassmorphism */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              ...getGlassmorphismStyles(0.8, 0.95),
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#1d1d1f',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              willChange: 'transform, opacity, backdrop-filter',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0px) scale(1)';
              e.currentTarget.style.boxShadow = isScrolled
                ? '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                : '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
            }}
          >
            <Menu size={16} />
            Menu
          </button>

          {/* Mobile Menu Button Reflection */}
          <div
            style={{
              ...getReflectionStyles(0.8, 0.95),
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: '500',
              color: 'rgba(29, 29, 31, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
              position: 'absolute',
              top: 'calc(100% + 3px)',
              left: '0',
              right: '0',
              zIndex: 1,
              pointerEvents: 'none',
            }}
          >
            <Menu size={16} style={{ opacity: 0.4 }} />
            <span style={{ opacity: 0.4 }}>Menu</span>
          </div>

          {/* Mobile Menu Dropdown - Enhanced Glassmorphism */}
          {isMobileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                ...getGlassmorphismStyles(0.9, 0.98),
                padding: '20px',
                minWidth: '220px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                animation: 'fadeInScale 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transformOrigin: 'top center',
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
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: '500',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                      color: isActive ? '#1d1d1f' : '#6e6e73',
                      marginBottom: '4px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.color = '#1d1d1f';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#6e6e73';
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* Logo in top-left corner - Enhanced Glassmorphism */}
      <div
        className="fixed top-8 left-8 z-40 cursor-pointer transition-all duration-300"
        style={{
          ...getLogoGlassmorphismStyles(),
          width: '68px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity, backdrop-filter',
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowScrollHint(false);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 16px 48px rgba(0, 0, 0, 0.18), 0 6px 16px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)';
          const scrollProgress = Math.min(scrollY / 200, 1);
          const hoverOpacity = 0.9 + scrollProgress * 0.08;
          e.currentTarget.style.background = `rgba(255, 255, 255, ${hoverOpacity})`;
          e.currentTarget.style.backdropFilter = `blur(${25 + scrollProgress * 10}px) saturate(200%)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0px)';
          const currentStyles = getLogoGlassmorphismStyles();
          e.currentTarget.style.boxShadow = currentStyles.boxShadow;
          e.currentTarget.style.background = currentStyles.background;
          e.currentTarget.style.backdropFilter = currentStyles.backdropFilter;
        }}
        title="Click to return to top"
      >
        <span
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#1d1d1f',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            userSelect: 'none'
          }}
        >
          G.
        </span>
      </div>

      {/* Logo Reflection - Apple Dock Style */}
      <div
        className="fixed top-[calc(2rem+68px+4px)] left-8 z-30 pointer-events-none"
        style={{
          ...getLogoReflectionStyles(),
          width: '68px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform, opacity, backdrop-filter',
        }}
      >
        <span
          style={{
            fontSize: '24px',
            fontWeight: '700',
            color: 'rgba(29, 29, 31, 0.4)', // Reduced opacity for reflection
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            userSelect: 'none',
            transform: 'scaleY(-1)', // Counter the parent transform to keep text readable
          }}
        >
          G.
        </span>
      </div>
    </>
  );
};

export default Header;
