
import AboutMe from '@/components/sections/AboutMe'; // This is now the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcaseGrid from '@/components/sections/ProjectShowcaseGrid';

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* Hero Section */}
      <ProfessionalSummary />
      <ProjectShowcaseGrid />
    </div>
  );
}
