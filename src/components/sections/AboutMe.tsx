
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const AboutMe = () => {
  // This component's content is effectively replaced by CNNAnimation for the hero.
  // You can repurpose this for a more traditional "About Me" text section
  // if needed later, or remove it if CNNExplanation covers enough.
  // For now, I'll keep it minimal to avoid conflict if it were still on the page.
  return (
    <section id="about-placeholder" className="py-12 md:py-16 bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">About Gabriel Elohi</h2>
        <p className="text-lg text-muted-foreground">
          Further details about Gabriel can be presented here or integrated into other sections.
          The main hero visual is now handled by the CNN Animation.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
