
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PhysicsPoint } from '@/lib/physics';
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

// Font style classes for hover effect - using the imported fonts
const fontStyles = [
  { name: 'font-style-1', font: 'font-style-1', color: '', fontFamily: "var(--font-roboto), sans-serif" }, // Blue
  { name: 'font-style-2', font: 'font-style-2', color: '', fontFamily: "var(--font-lora), serif" }, // Emerald
  { name: 'font-style-3', font: 'font-style-3', color: '', fontFamily: "var(--font-source-code-pro), monospace" }, // Red
  { name: 'font-style-4', font: 'font-style-4', color: '', fontFamily: "var(--font-playfair-display), serif" }, // Amber
  { name: 'font-style-5', font: 'font-style-5', color: '', fontFamily: "var(--font-dancing-script), cursive" } // Violet
];

const AboutMe = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const physicsLettersRef = useRef<{element: HTMLElement, physics: PhysicsPoint, initialX: number, initialY: number}[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [fontChangeCounter, setFontChangeCounter] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);

  // Physics animation setup
  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Initialize physics for letters
    const physicsLetters: {element: HTMLElement, physics: PhysicsPoint, initialX: number, initialY: number}[] = [];
    
    // Get all elements with the physics-letter class
    const letterElements = sectionRef.current.querySelectorAll('.physics-letter, .physics-title-letter');
    
    letterElements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Create physics point for this letter
      const physics = new PhysicsPoint(centerX, centerY, 0);
      
      // Store initial position
      const initialX = centerX;
      const initialY = centerY;
      
      // Add to our array
      physicsLetters.push({
        element,
        physics,
        initialX,
        initialY
      });
      
      // Initialize with first font style
      element.classList.add(fontStyles[0].font);
      element.setAttribute('data-font-style-index', '0');
    });
    
    physicsLettersRef.current = physicsLetters;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      // Get viewport width to adjust physics parameters responsively
      const viewportWidth = window.innerWidth;
      
      // Adjust interaction radius based on screen size
      const interactionRadius = viewportWidth < 768 ? 150 : 300;
      
      // Adjust force multiplier based on screen size
      const forceMult = viewportWidth < 768 ? 10 : 15;
      
      // Update physics targets based on mouse position
      physicsLetters.forEach(({ element, physics, initialX, initialY }) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to element center
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply force inversely proportional to distance
        if (distance < interactionRadius) {
          const force = 5 / (distance + 10);
          const repelX = dx * force * -0.015;
          const repelY = dy * force * -0.015;
          
          physics.setTarget(initialX + repelX * forceMult, initialY + repelY * forceMult, 0);
        } else {
          physics.setTarget(initialX, initialY, 0);
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Autonomous animation
    let animationTime = 0;
    const animationSpeed = 0.001;
    
    // Animation loop
    const animate = () => {
      // Update animation time
      animationTime += animationSpeed;
      
      // Apply autonomous movement if no recent mouse interaction
      physicsLetters.forEach(({ element, physics, initialX, initialY }, index) => {
        // Create unique oscillation for each letter
        const offsetX = Math.sin(animationTime + index * 0.5) * 5;
        const offsetY = Math.cos(animationTime + index * 0.7) * 3;
        
        // Only apply autonomous movement if not being affected by mouse
        if (Math.abs(physics.position.x - initialX) < 10 && 
            Math.abs(physics.position.y - initialY) < 10) {
          physics.setTarget(initialX + offsetX, initialY + offsetY, 0);
        }
        
        // Update physics
        physics.update();
        
        // Apply physics to element
        // This part needs to be adjusted as getBoundingClientRect is relative to viewport
        // and we want to translate relative to the element's flow position.
        // For simplicity, we'll assume initialX/Y are relative to a common parent or document for now.
        const transformX = physics.position.x - initialX;
        const transformY = physics.position.y - initialY;
        
        // Apply the transform
        element.style.transform = `translate(${transformX}px, ${transformY}px)`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      // Recalculate initial positions
      physicsLetters.forEach((item) => {
        const element = item.element as HTMLElement; // Ensure element is HTMLElement
        const rect = element.getBoundingClientRect();
        const parentRect = element.offsetParent ? element.offsetParent.getBoundingClientRect() : {left:0, top:0};

        item.initialX = rect.left - parentRect.left;
        item.initialY = rect.top - parentRect.top;
        
        item.physics.setTarget(item.initialX, item.initialY, 0);
        
        item.physics.position.x = item.initialX;
        item.physics.position.y = item.initialY;
        item.physics.position.z = 0;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Initial resize call
    handleResize();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add this new effect for automatic font cycling with sequential pattern
  useEffect(() => {
    const titleText = 'INNOVATIVE DATA SCIENTIST & ENGINEER';
    
    // Set up interval to change fonts sequentially
    const fontChangeInterval = setInterval(() => {
      setActiveLetterIndex(prev => (prev + 1) % titleText.length);
      setFontChangeCounter(prev => prev + 1);
    }, 600); // Slower change - every 600ms
    
    return () => clearInterval(fontChangeInterval);
  }, []);

  // Original scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress within the section
        const scrollProgress = Math.min(Math.max(-sectionTop / (viewportHeight * 0.7), 0), 1);
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate image scale and opacity based on scroll
  const imageScale = 1 - (scrollY * 0.2); // Scale from 1 to 0.8
  const imageOpacity = 1 - (scrollY * 0.2); // Opacity from 1 to 0.8

  return (
    <section ref={sectionRef} className="w-full min-h-screen relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/AdobeStock_432194964.jpeg"
          alt="About me background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
          data-ai-hint="abstract texture"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      {/* Three-part layout container */}
      <div className="relative h-screen z-10">
        {/* Part 1: Name positioned on left side, higher on the page */}
        <div className="absolute left-[5%] sm:left-[10%] top-[15%] sm:top-[22%] z-10">
          <div className="physics-text-container">
            <h1 className="text-7xl sm:text-8xl md:text-[10rem] lg:text-[14rem] font-extrabold tracking-tighter leading-[0.8]">
              <span className="physics-letter-container text-amber-300 opacity-90">
                {'GABRIEL'.split('').map((letter, index) => (
                  <span 
                    key={`gabriel-${index}`} 
                    className="physics-letter"
                    data-physics-index={index}
                    style={{ 
                      display: 'inline-block',
                      padding: '0.1em',
                      position: 'relative',
                      transition: 'transform 0.2s ease',
                      color: '#F59E0B', // Explicitly setting amber/gold color
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
              <span className="block -mt-4 sm:-mt-5 md:-mt-8 lg:-mt-12 text-amber-300 opacity-90">
                {'ELOHI'.split('').map((letter, index) => (
                  <span 
                    key={`elohi-${index}`} 
                    className="physics-letter"
                    data-physics-index={index + 7}
                    style={{ 
                      display: 'inline-block',
                      padding: '0.1em',
                      position: 'relative',
                      transition: 'transform 0.2s ease',
                      color: '#F59E0B', // Explicitly setting amber/gold color
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
          </div>
        </div>
        
        {/* Part 2: Image positioned at bottom of section, horizontally centered */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center z-20">
          <div 
            className="w-full md:w-[75%] h-[70vh] md:h-[80vh] relative transition-all duration-100"
            style={{
              transform: `scale(${imageScale})`,
              transformOrigin: 'bottom center',
            }}
          >
            {/* Profile image with dynamic opacity */}
            <div 
              className="w-full h-full transition-all duration-100" 
              style={{ opacity: imageOpacity }}
            >
              <Image 
                src="/DSC02786.png" 
                alt="Gabriel Elohi" 
                fill
                className="object-cover object-center object-bottom"
                priority
                data-ai-hint="professional headshot"
              />
            </div>
          </div>
        </div>
        
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-5 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 z-5 md:hidden"></div>
        
        {/* Part 3: Content on right side (desktop) or bottom (mobile) */}
        <div className="absolute md:right-0 md:top-0 md:bottom-0 md:w-[40%] w-full bottom-0 p-8 md:p-12 flex items-center z-30">
          <div className="w-full">
            {/* Details Block */}
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl">
              {/* Title and Description - Apply interactive font effect here */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-300 mb-2">
                {'INNOVATIVE DATA SCIENTIST & ENGINEER'.split('').map((letter, index) => {
                  // Only the active letter gets a new font style
                  const isActive = index === activeLetterIndex;
                  const fontIndex = isActive ? (fontChangeCounter % fontStyles.length) : 0;
                  
                  return (
                    <span 
                      key={`title-${index}`} 
                      className={`physics-title-letter ${fontStyles[fontIndex].font}`}
                      data-physics-index={index + 12} // Start after GABRIEL ELOHI (12 letters)
                      style={{ 
                        display: 'inline-block',
                        padding: '0.05em',
                        position: 'relative',
                        transition: 'all 0.3s ease-in-out',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                        textShadow: isActive ? '0 0 8px rgba(255, 215, 0, 0.5)' : 'none',
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  );
                })}
              </h2>
              <p className="text-base md:text-lg text-amber-400 mb-4">
                Transforming complex data into clear insights and actionable strategies.
              </p>
              <p className="text-amber-100 mb-3 text-sm md:text-base leading-relaxed">
                Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights.
              </p>
              <p className="text-amber-100 mb-6 text-sm md:text-base leading-relaxed">
                Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-start space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <Link href="#projects" className="btn-primary text-center">
                  View Projects
                </Link>
                <Link 
                  href="/Resume_25.pdf" 
                  download 
                  className="btn-secondary text-center"
                >
                  Download Resume
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <Link 
                  href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-link text-amber-400 hover:text-amber-300" 
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link 
                  href="https://github.com/Gabeleo24"  // Corrected general GitHub profile link
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-link text-amber-400 hover:text-amber-300" 
                  aria-label="GitHub Profile"
                >
                  <Github className="w-6 h-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
