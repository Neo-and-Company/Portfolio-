
import AboutMe from '@/components/sections/AboutMe'; // This is now the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* Hero Section */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactSection />
    </div>
  );
}
