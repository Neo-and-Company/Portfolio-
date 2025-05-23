
"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PhysicsPoint } from '@/lib/physics';
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

// Font style classes for hover effect - using the imported fonts
const fontStyles = [
  { name: 'font-style-1', font: 'font-style-1', color: '', fontFamily: "var(--font-roboto), sans-serif" }, 
  { name: 'font-style-2', font: 'font-style-2', color: '', fontFamily: "var(--font-lora), serif" }, 
  { name: 'font-style-3', font: 'font-style-3', color: '', fontFamily: "var(--font-source-code-pro), monospace" }, 
  { name: 'font-style-4', font: 'font-style-4', color: '', fontFamily: "var(--font-playfair-display), serif" }, 
  { name: 'font-style-5', font: 'font-style-5', color: '', fontFamily: "var(--font-dancing-script), cursive" } 
];

const AboutMe = () => {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const physicsLettersRef = useRef<{element: HTMLElement, physics: PhysicsPoint, initialX: number, initialY: number}[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [fontChangeCounter, setFontChangeCounter] = useState(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  // Physics animation setup
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const physicsLetters: {element: HTMLElement, physics: PhysicsPoint, initialX: number, initialY: number}[] = [];
    
    const letterElements = sectionRef.current.querySelectorAll('.physics-letter, .physics-title-letter');
    
    letterElements.forEach((el) => {
      const element = el as HTMLElement;
      // Ensure element is still in the DOM before calling getBoundingClientRect
      if (!document.body.contains(element)) return;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const physics = new PhysicsPoint(centerX, centerY, 0);
      
      const initialX = centerX;
      const initialY = centerY;
      
      physicsLetters.push({
        element,
        physics,
        initialX,
        initialY
      });
      
      element.classList.add(fontStyles[0].font);
      element.setAttribute('data-font-style-index', '0');
    });
    
    physicsLettersRef.current = physicsLetters;
    
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      const viewportWidth = window.innerWidth;
      const interactionRadius = viewportWidth < 768 ? 150 : 300;
      const forceMult = viewportWidth < 768 ? 10 : 15;
      
      physicsLettersRef.current.forEach(({ element, physics, initialX, initialY }) => {
        // Ensure element is still in the DOM before calling getBoundingClientRect
        if (!document.body.contains(element)) return;
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
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
    
    let animationTime = 0;
    const animationSpeed = 0.001;
    
    const animate = () => {
      animationTime += animationSpeed;
      
      physicsLettersRef.current.forEach(({ element, physics, initialX, initialY }, index) => {
        const offsetX = Math.sin(animationTime + index * 0.5) * 5;
        const offsetY = Math.cos(animationTime + index * 0.7) * 3;
        
        if (Math.abs(physics.position.x - initialX) < 10 && 
            Math.abs(physics.position.y - initialY) < 10) {
          physics.setTarget(initialX + offsetX, initialY + offsetY, 0);
        }
        
        physics.update();
        
        // Corrected transform calculation
        const transformX = physics.position.x - initialX;
        const transformY = physics.position.y - initialY;
        
        element.style.transform = `translate(${transformX}px, ${transformY}px)`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      physicsLettersRef.current.forEach((item) => {
        // Ensure element is still in the DOM before calling getBoundingClientRect
        if (!document.body.contains(item.element)) return;
        
        const rect = item.element.getBoundingClientRect();
        const newCenterX = rect.left + item.element.offsetWidth / 2; // Use offsetWidth for more stable centering
        const newCenterY = rect.top + item.element.offsetHeight / 2;

        item.initialX = newCenterX;
        item.initialY = newCenterY;
        
        item.physics.position.x = newCenterX;
        item.physics.position.y = newCenterY;
        item.physics.position.z = 0;

        item.physics.setTarget(newCenterX, newCenterY, 0);
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set positions correctly
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const titleText = 'INNOVATIVE DATA SCIENTIST & ENGINEER';
    const fontChangeInterval = setInterval(() => {
      setActiveLetterIndex(prev => (prev + 1) % titleText.length);
      setFontChangeCounter(prev => prev + 1);
    }, 600); 
    
    return () => clearInterval(fontChangeInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top;
        const viewportHeight = window.innerHeight;
        
        // Detect if we're scrolling into the professional experience section
        const professionalSection = document.getElementById('experience');
        if (professionalSection) {
          const profRect = professionalSection.getBoundingClientRect();
          // Check if professional section is coming into view
          const isScrollingToExperience = profRect.top < viewportHeight * 1.2;
          setIsScrollingDown(isScrollingToExperience);
          
          if (isScrollingToExperience) {
            // Calculate how far we've scrolled into the professional section
            const scrollProgress = Math.min(
              Math.max((viewportHeight - profRect.top) / (viewportHeight * 0.7), 0), 
              1
            );
            setScrollY(scrollProgress);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageScale = 1 - (scrollY * 0.2); 
  const imageOpacity = 1 - (scrollY * 0.2);
  const sectionScale = isScrollingDown ? Math.max(0.85 - (scrollY * 0.25), 0.6) : 1;
  const sectionOpacity = isScrollingDown ? Math.max(1 - (scrollY * 1.8), 0) : 1;

  return (
    <section 
      ref={sectionRef} 
      className="w-full min-h-screen relative overflow-hidden section-fade-in bg-background"
      style={{
        transform: `scale(${sectionScale})`,
        opacity: sectionOpacity,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out'
      }}
    >
      <div className="relative h-screen z-10">
        <div className="absolute left-[5%] sm:left-[10%] top-[15%] sm:top-[22%] z-10">
          <div className="physics-text-container">
            {/* Added small text above name */}
            <p className="text-gray-500 text-sm sm:text-base mb-2 ml-1 tracking-wide">
              hello, i am
            </p>
            <h1 className="font-extrabold tracking-tighter leading-[0.8] break-words max-w-[90vw]">
              <div className="flex flex-col items-start">
                <span className="physics-letter-container text-primary opacity-90 inline-block text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[14rem]">
                  {'Gabriel'.split('').map((letter, index) => (
                    <span 
                      key={`gabriel-${index}`} 
                      className="physics-letter inline-block"
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="physics-letter-container text-primary opacity-90 inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[5rem] xl:text-[7rem] mt-4 sm:mt-6 md:mt-8">
                  {'Mancillas'.split('').map((letter, index) => (
                    <span 
                      key={`mancillas-${index}`} 
                      className="physics-letter inline-block"
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </div>
            </h1>
            {/* Subtitle below name */}
            <p className="text-gray-500 text-base sm:text-lg mt-2 ml-1 tracking-wide">
              Data Scientist & Engineer
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 flex justify-center z-20">
          <div 
            className="w-full md:w-[75%] h-[70vh] md:h-[80vh] relative transition-all duration-100"
            style={{
              transform: `scale(${imageScale})`,
              transformOrigin: 'bottom center',
            }}
          >
            <div 
              className="w-full h-full transition-all duration-100" 
              style={{ opacity: imageOpacity }}
            >
              <Image 
                src="/gabe.png" 
                alt="Gabriel Elohi" 
                fill
                className="object-cover object-center object-bottom filter-none saturate-100"
                priority
                data-ai-hint="color portrait"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute md:right-0 md:top-0 md:bottom-0 md:w-[40%] w-full bottom-0 p-8 md:p-12 flex items-end md:items-center z-30">
          <div className="w-full mb-16 md:mb-0">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-gray-100">
              {/* Add "this is what I am" above the title */}
              <p className="text-gray-500 text-base sm:text-lg mb-2 ml-1 tracking-wide">
                this is what I am
              </p>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">
                {'INNOVATIVE DATA SCIENTIST & ENGINEER'.split('').map((letter, index) => {
                  const isActive = index === activeLetterIndex;
                  const fontIndex = isActive ? (fontChangeCounter % fontStyles.length) : 0;
                  return (
                    <span 
                      key={index} 
                      className={isActive ? fontStyles[fontIndex].font : ''}
                      style={{ 
                        fontFamily: isActive ? fontStyles[fontIndex].fontFamily : 'inherit',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {letter}
                    </span>
                  );
                })}
              </h2>
              <p className="text-gray-600 mt-4 mb-6">
                Transforming complex data into actionable insights through advanced analytics and machine learning. Passionate about solving real-world problems with data-driven approaches.
              </p>
              <div className="flex space-x-4">
                <Link 
                  href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-link" 
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-6 h-6" />
                </Link>
                <Link 
                  href="https://github.com/Gabeleo24" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="icon-link" 
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
