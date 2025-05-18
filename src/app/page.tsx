
import CNNAnimation from '@/components/sections/CNNAnimation';
import CNNExplanation from '@/components/sections/CNNExplanation';
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';
// Remove the old AboutMe/Hero component if CNNAnimation replaces it
// import AboutMe from '@/components/sections/AboutMe'; 

export default function Home() {
  return (
    <div className="flex flex-col">
      <CNNAnimation />
      <CNNExplanation />
      {/* Keep other sections as desired */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactForm />
    </div>
  );
}
