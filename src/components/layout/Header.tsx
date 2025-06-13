
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

  // Track active section based on scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'career-journey', 'experience', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100;

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



  return (
    <>
      {/* Apple-Style Island Navigation - increased sizing */}
      <header className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <nav
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            borderRadius: '50px',
            padding: '12px 32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
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
                  padding: '12px 20px',
                  borderRadius: '25px',
                  fontSize: '16px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  backgroundColor: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                  color: isActive ? '#1d1d1f' : '#6e6e73',
                  position: 'relative',
                  overflow: 'hidden'
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
        </nav>

        {/* Mobile Island Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              borderRadius: '50px',
              padding: '12px 20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '14px',
              fontWeight: '500',
              color: '#1d1d1f',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
            }}
          >
            <Menu size={16} />
            Menu
          </button>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '60px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '200px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
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

      {/* Logo in top-left corner - increased sizing with scroll-to-top functionality */}
      <div
        className="fixed top-8 left-8 z-40 cursor-pointer transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '50%',
          width: '64px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setShowScrollHint(false);
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.05)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
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
    </>
  );
};

export default Header;
