
import AboutMe from '@/components/sections/AboutMe'; // This is the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';

// The AboutMe.tsx component now serves as the primary hero introduction,
// inspired by the Samay Raina example.
// The detailed skills, certifications etc. are handled by ProfessionalSummary or other sections.

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* This is the new Hero section */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactForm />
    </div>
  );
}
