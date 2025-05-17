
import AboutMe from '@/components/sections/AboutMe'; // This is now the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

// New "About Me" quote block component (inline for simplicity)
const AboutMeQuoteBlock = () => {
  return (
    <section id="about-details" className="w-full bg-background text-foreground py-16 md:py-24 section-fade-in">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2 relative inline-block">
              About Me
              <span className="block h-0.5 w-12 bg-accent mt-1"></span>
            </h2>
            <p className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              You can't use up creativity. The more you use, the more you have in your significant mind.
            </p>
            <p className="text-muted-foreground text-lg">
              Placeholder text: Describe your passion, your approach to data science and engineering, and what drives you. Highlight your problem-solving skills and your commitment to delivering impactful solutions. This is a space for a more personal touch.
            </p>
            {/* 
              In the example, there's a "30 Years Of Experience" visual.
              You can adapt this or use one of your key achievements here.
              For now, I'm omitting it as it requires specific data for "Years of Experience".
              You could add something like:
              <div className="mt-8">
                <span className="text-5xl font-bold text-accent">5+</span>
                <span className="ml-2 text-xl text-muted-foreground">Years of Professional Experience</span>
              </div>
            */}
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
              Any Type Of Query & Discussion.
            </h3>
            <p className="text-muted-foreground text-lg mb-6">
              Let's talk with me
            </p>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group px-8 py-6 text-lg rounded-md">
              <Link href="#contact">
                Get In Touch <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* This is the new Hero section */}
      <AboutMeQuoteBlock /> {/* New section added here */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactForm />
    </div>
  );
}
