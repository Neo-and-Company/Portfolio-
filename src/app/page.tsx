
import AboutMe from '@/components/sections/AboutMe'; // This is the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';

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
