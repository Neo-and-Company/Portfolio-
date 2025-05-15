import AboutMe from '@/components/sections/AboutMe';
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ProfileImprover from '@/components/sections/ProfileImprover';
import ContactForm from '@/components/sections/ContactForm';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe />
      <ProfessionalSummary />
      <ProjectShowcase />
      <ProfileImprover />
      <ContactForm />
    </div>
  );
}
