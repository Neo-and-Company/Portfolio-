
// src/components/sections/AboutMe.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// This component is the Hero section
const AboutMe = () => {
  return (
    <section id="about" className="w-full min-h-screen flex items-center bg-background text-foreground py-16 md:py-24 lg:py-32 section-fade-in relative overflow-hidden">
      {/* Background Image and Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/SD.jpg" // Your background image
          alt="Abstract background"
          fill
          className="object-cover"
          quality={80}
          priority
          data-ai-hint="abstract texture"
        />
        <div className="absolute inset-0 bg-black/90"></div> {/* Dark overlay */}
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content & Buttons */}
          <div className="space-y-6 text-center lg:text-left">
            <Badge variant="secondary" className="text-sm font-semibold bg-accent/20 text-accent border-accent/30 py-1 px-3 rounded-full inline-block">
              Hello!
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter !leading-tight">
              I&apos;m <span className="text-accent">Gabriel</span>,
              <br />
              Innovative Data Scientist & Engineer
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-3 text-base">
                <Link href="#projects">Portfolio</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 rounded-full px-8 py-3 text-base">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
             {/* Social Links */}
            <div className="flex gap-5 mt-10 justify-center lg:justify-start text-muted-foreground">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-accent transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Right Column: Image and Contact Info */}
          <div className="relative flex justify-center items-center min-h-[350px] lg:min-h-[500px]">
            {/* Decorative Shapes (Optional - keeping them simple) */}
            <div className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 opacity-20 -translate-x-1/2 -translate-y-1/2">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,0 100,100 0,100" fill="hsl(var(--muted) / 0.5)"/>
              </svg>
            </div>
            <div className="absolute -bottom-10 -right-10 w-20 h-20 md:w-28 md:h-28 bg-accent rounded-full opacity-30 translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[420px] md:w-[350px] md:h-[450px] z-10">
              <Image
                src="/DSC02786.png" 
                alt="Gabriel Elohi Mancillas Gallardo"
                fill
                className="object-cover rounded-lg shadow-2xl"
                data-ai-hint="professional headshot"
                priority
              />
            </div>
             {/* Contact Info */}
            <div className="absolute bottom-0 right-0 lg:bottom-5 lg:right-5 bg-card/80 backdrop-blur-sm p-4 rounded-lg shadow-lg z-20 text-xs text-card-foreground space-y-1 max-w-[200px]">
                <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-accent"/>
                    <span>gabriel@example.com</span> {/* Placeholder */}
                </div>
                <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-accent"/>
                    <span>+1 (234) 567-890</span> {/* Placeholder */}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
