
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

  // Enhanced Mirror/Reflection Glassmorphism - Clean Single Layer Design
  const getMirrorReflectionStyles = (baseOpacity = 0.15, maxOpacity = 0.25) => {
    const scrollProgress = Math.min(scrollY / 150, 1); // Responsive scroll
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * scrollProgress;
    const blur = 20 + scrollProgress * 15; // Clean blur progression
    const saturation = 150 + scrollProgress * 30; // Subtle saturation enhancement
    const brightness = 110 + scrollProgress * 10; // Gentle brightness boost

    return {
      background: `rgba(255, 255, 255, ${opacity})`, // Single layer mirror surface
      backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
      borderRadius: '50px',
      border: `1px solid rgba(255, 255, 255, ${0.3 + scrollProgress * 0.4})`, // Clean reflective edge
      boxShadow: isScrolled
        ? `0 12px 40px rgba(0, 0, 0, 0.1),
           0 4px 16px rgba(255, 255, 255, 0.2),
           inset 0 1px 0 rgba(255, 255, 255, 0.4),
           inset 0 -1px 0 rgba(0, 0, 0, 0.1)` // Clean mirror reflections
        : `0 8px 32px rgba(0, 0, 0, 0.08),
           0 2px 12px rgba(255, 255, 255, 0.15),
           inset 0 1px 0 rgba(255, 255, 255, 0.3),
           inset 0 -1px 0 rgba(0, 0, 0, 0.08)`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  // Enhanced Mirror Logo - Clean Circular Reflection
  const getMirrorLogoStyles = () => {
    const scrollProgress = Math.min(scrollY / 150, 1); // Responsive scroll
    const opacity = 0.18 + scrollProgress * 0.12; // Enhanced visibility
    const blur = 18 + scrollProgress * 12; // Clean blur progression
    const saturation = 150 + scrollProgress * 25;
    const brightness = 110 + scrollProgress * 8;

    return {
      background: `rgba(255, 255, 255, ${opacity})`, // Single layer circular mirror
      backdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
      WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%) brightness(${brightness}%)`,
      borderRadius: '50%',
      border: `1px solid rgba(255, 255, 255, ${0.35 + scrollProgress * 0.3})`, // Clean circular edge
      boxShadow: isScrolled
        ? `0 16px 48px rgba(0, 0, 0, 0.12),
           0 6px 20px rgba(255, 255, 255, 0.25),
           inset 0 2px 0 rgba(255, 255, 255, 0.5),
           inset 0 -2px 0 rgba(0, 0, 0, 0.1)` // Clean circular reflections
        : `0 12px 40px rgba(0, 0, 0, 0.1),
           0 4px 16px rgba(255, 255, 255, 0.2),
           inset 0 1px 0 rgba(255, 255, 255, 0.4),
           inset 0 -1px 0 rgba(0, 0, 0, 0.08)`,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };



  return (
    <>
      {/* Apple-Style Island Navigation - Mirror Reflection Effect */}
      <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        {/* Main Navigation - Clean Mirror Reflection Style */}
        <nav
          style={{
            ...getMirrorReflectionStyles(0.15, 0.25), // Enhanced mirror reflection
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
                    ? 'rgba(0, 0, 0, 0.6)' // Enhanced active state for mirror contrast
                    : 'transparent',
                  color: isActive ? '#ffffff' : '#1a202c', // Darker text for enhanced mirror visibility
                  position: 'relative',
                  overflow: 'hidden',
                  backdropFilter: isActive ? 'blur(10px)' : 'none',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid transparent',
                  boxShadow: isActive
                    ? 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 2px 8px rgba(0, 0, 0, 0.15)'
                    : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)'; // Darker hover for mirror contrast
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backdropFilter = 'blur(12px)';
                    e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 2px 6px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1a202c';
                    e.currentTarget.style.backdropFilter = 'none';
                    e.currentTarget.style.border = '1px solid transparent';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0px)';
                  }
                }}
                onClick={(e) => {
                  // Clean mirror click state - enhanced visibility
                  const target = e.currentTarget;
                  target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Enhanced click state for mirror
                  target.style.transform = 'translateY(0px) scale(0.98)';
                  setTimeout(() => {
                    // Check if element still exists before accessing style
                    if (target && target.style) {
                      if (isActive) {
                        target.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Enhanced active state for mirror
                      } else {
                        target.style.backgroundColor = 'transparent';
                      }
                      target.style.transform = 'translateY(0px) scale(1)';
                    }
                  }, 150);
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>



        {/* Mobile Island Menu - Enhanced Mirror Reflection */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              ...getMirrorReflectionStyles(0.18, 0.28), // Enhanced mobile mirror reflection
              padding: '14px 22px',
              fontSize: '15px',
              fontWeight: '500',
              color: '#1a202c', // Darker text for enhanced mirror visibility
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



          {/* Mobile Menu Dropdown - Enhanced Glassmorphism */}
          {isMobileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
                ...getMirrorReflectionStyles(0.22, 0.32), // Enhanced mobile dropdown mirror
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
                      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
                      color: isActive ? '#ffffff' : '#1a202c', // Darker text for enhanced mirror
                      marginBottom: '4px'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.color = '#ffffff';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#1a202c';
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

      {/* Logo in top-left corner - Magnifying Glass Lens */}
      <div
        className="fixed top-8 left-8 z-40 cursor-pointer transition-all duration-300"
        style={{
          ...getMagnifyingLogoStyles(),
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
          const hoverOpacity = 0.35 + scrollProgress * 0.1; // Darker hover for dark theme
          e.currentTarget.style.background = `rgba(0, 0, 0, ${hoverOpacity})`;
          e.currentTarget.style.backdropFilter = `blur(${25 + scrollProgress * 10}px) saturate(180%)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0px)';
          const currentStyles = getDarkLogoGlassmorphismStyles();
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
            color: '#ffffff', // White text for dark background
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            userSelect: 'none'
          }}
        >
          G.
        </span>
      </div>


    </>
  );
};

export default Header;
