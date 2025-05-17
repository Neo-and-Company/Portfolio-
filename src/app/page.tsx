
import AboutMe from '@/components/sections/AboutMe'; // This is the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';

// Removed the inline AboutMeDetails, AboutMeQuoteBlock, and ContactCTA block
// The new AboutMe.tsx (Hero) serves as the primary introduction.
// ProfessionalSummary can serve as the more detailed "About" content if needed.

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* This is the new Hero section */}
      {/* ProfessionalSummary can act as a more detailed "About Me" or "Experience" section */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactForm />
    </div>
  );
}
