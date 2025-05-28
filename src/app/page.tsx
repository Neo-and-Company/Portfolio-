
import AboutMe from '@/components/sections/AboutMe'; // This is now the Hero section
import CareerRoadmap from '@/components/sections/CareerRoadmap';
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcaseGrid from '@/components/sections/ProjectShowcaseGrid';
import ResumeDownload from '@/components/sections/ResumeDownload';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* Hero Section */}
      <CareerRoadmap /> {/* Career Journey Timeline */}
      <ProfessionalSummary />
      <ProjectShowcaseGrid />
      <ResumeDownload /> {/* Resume Download Section */}
      <ContactSection /> {/* Contact Form */}
    </div>
  );
}
