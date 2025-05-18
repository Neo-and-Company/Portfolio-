
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutMe = () => {
  return (
    <section 
      id="about" // This section serves as the hero
      className="w-full min-h-screen flex items-center bg-background text-foreground pt-10 pb-12 px-4 sm:px-6 lg:px-16 relative overflow-hidden section-fade-in"
    >
      {/* Decorative Circles */}
      <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-accent rounded-full opacity-20 pointer-events-none -z-20 blur-lg"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-primary/70 rounded-full opacity-5 pointer-events-none -z-20 blur-2xl"></div>

      <div className="container mx-auto grid md:grid-cols-12 gap-x-8 items-center relative z-10">
        {/* Giant Name Background - behind image and text on mobile, part of grid on md+ */}
        <div className="hero-name-display md:col-span-6 lg:col-span-5 text-center md:text-left select-none 
                        absolute md:relative inset-0 md:inset-auto 
                        flex flex-col justify-center items-center md:items-start 
                        -z-10 md:z-0 opacity-5 md:opacity-10 pointer-events-none">
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl break-words">
            GABRIEL
          </h1>
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl -mt-2 sm:-mt-2 md:-mt-3 lg:-mt-4 break-words">
            ELOHI
          </h1>
        </div>

        {/* Profile Image */}
        <div className="md:col-span-5 lg:col-span-4 flex justify-center relative order-first md:order-none my-8 md:my-0 
                        md:-ml-4 lg:-ml-6 xl:-ml-8"> {/* Adjusted negative margin for overlap */}
          <div className="relative z-10 w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]">
            <Image 
              src="/DSC02786.png" 
              alt="Gabriel Elohi Mancillas Gallardo" 
              fill={true}
              className="object-cover" // Removed rounded-lg and shadow-2xl
              priority
              data-ai-hint="professional headshot"
            />
          </div>
        </div>
        
        {/* Details Block */}
        <div className="md:col-span-3 lg:col-span-3 text-center md:text-left relative z-0 order-last md:order-none space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-1 tracking-wide">
            INNOVATIVE DATA SCIENTIST & ENGINEER
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-4 mx-auto md:mx-0"></div>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights.
          </p>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
            Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group px-8 py-3 text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-opacity-50">
            <Link href="#projects">
              SEE MORE
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
