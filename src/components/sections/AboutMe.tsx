// src/components/sections/AboutMe.tsx (Hero Section)
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutMe = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center pt-32 pb-12 px-4 sm:px-6 lg:px-16 relative overflow-hidden bg-background text-foreground section-fade-in"
    >
      <div className="container mx-auto grid md:grid-cols-12 gap-8 items-center relative z-10">
        {/* Giant Name Background */}
        <div className="hero-name-display md:col-span-6 lg:col-span-7 text-center md:text-left select-none absolute md:relative inset-0 md:inset-auto flex flex-col justify-center items-center md:items-start -z-10 md:z-0 opacity-5 md:opacity-10">
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl break-words">
            Gabriel
          </h1>
          <h1 className="text-8xl sm:text-9xl md:text-10xl font-extrabold text-foreground/30 uppercase tracking-tighter-xl -mt-4 sm:-mt-6 md:-mt-10 lg:-mt-12 break-words">
            Elohi
          </h1>
        </div>

        {/* Image - positioned to overlap */}
        <div className="md:col-span-3 lg:col-span-3 flex justify-center relative order-first md:order-none my-8 md:my-0">
          {/* Simplified image container for debugging */}
          <div className="relative z-10">
            <Image
              src="/DSC02786.png"
              alt="Gabriel Elohi Mancillas Gallardo"
              width={240}
              height={300} // 4/5 aspect ratio for 240 width
              className="rounded-lg shadow-2xl object-cover border-4 border-red-500" // Added red border for debug
              data-ai-hint="professional headshot"
              priority
            />
          </div>
        </div>

        {/* Details Block */}
        <div className="md:col-span-4 lg:col-span-3 text-center md:text-left relative z-0 md:pl-4 lg:pl-0">
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-1 tracking-wide">
            INNOVATIVE DATA SCIENTIST & ENGINEER
          </h2>
          <div className="w-16 h-0.5 bg-primary mb-4 mx-auto md:mx-0"></div>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling.
          </p>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base leading-relaxed">
            Adept at transforming complex data sets into actionable strategic insights.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg text-base sm:text-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-opacity-50 px-8 py-3">
            <Link href="#projects">SEE MORE</Link>
          </Button>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-1/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 bg-accent rounded-full opacity-30 md:opacity-20 pointer-events-none z-0 blur-lg"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-primary/70 rounded-full opacity-10 md:opacity-5 pointer-events-none z-0 blur-2xl"></div>
    </section>
  );
};

export default AboutMe;
