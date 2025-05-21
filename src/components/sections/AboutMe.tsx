
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

  // Physics animation setup
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const physicsLetters: {element: HTMLElement, physics: PhysicsPoint, initialX: number, initialY: number}[] = [];
    
    const letterElements = sectionRef.current.querySelectorAll('.physics-letter, .physics-title-letter');
    
    letterElements.forEach((el) => {
      const element = el as HTMLElement;
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
        
        const transformX = physics.position.x - initialX;
        const transformY = physics.position.y - initialY;
        
        element.style.transform = `translate(${transformX}px, ${transformY}px)`;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      physicsLettersRef.current.forEach((item) => {
        const element = item.element;
        if (!document.body.contains(element)) return;
        
        const rect = element.getBoundingClientRect();
        const newCenterX = rect.left + rect.width / 2;
        const newCenterY = rect.top + rect.height / 2;

        item.initialX = newCenterX;
        item.initialY = newCenterY;
        
        item.physics.position.x = newCenterX;
        item.physics.position.y = newCenterY;
        item.physics.position.z = 0;

        item.physics.setTarget(newCenterX, newCenterY, 0);
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); 
    
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
        const scrollProgress = Math.min(Math.max(-sectionTop / (viewportHeight * 0.7), 0), 1);
        setScrollY(scrollProgress);
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

  return (
    <section ref={sectionRef} className="w-full min-h-screen relative overflow-hidden section-fade-in">
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
      
      <div className="relative h-screen z-10">
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
                      color: '#F59E0B', 
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
                      color: '#F59E0B', 
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
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
                src="/DSC02786.png" 
                alt="Gabriel Elohi" 
                fill
                className="object-cover object-center object-bottom filter-none saturate-100"
                priority
                data-ai-hint="color portrait"
              />
            </div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-5 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 z-5 md:hidden"></div>
        
        <div className="absolute md:right-0 md:top-0 md:bottom-0 md:w-[40%] w-full bottom-0 p-8 md:p-12 flex items-center z-30">
          <div className="w-full">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-300 mb-2">
                {'INNOVATIVE DATA SCIENTIST & ENGINEER'.split('').map((letter, index) => {
                  const isActive = index === activeLetterIndex;
                  const fontIndex = isActive ? (fontChangeCounter % fontStyles.length) : 0;
                  
                  return (
                    <span 
                      key={`title-${index}`} 
                      className={`physics-title-letter ${fontStyles[fontIndex].font}`}
                      data-physics-index={index + 12} 
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
