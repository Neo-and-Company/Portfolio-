
import AboutMe from '@/components/sections/AboutMe'; // This is the Hero section
import ProfessionalSummary from '@/components/sections/ProfessionalSummary';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import ContactForm from '@/components/sections/ContactForm';

// New "About Me" section, different from the Hero
const AboutMeDetails = () => {
  return (
    <section id="about-details" className="w-full bg-card text-card-foreground py-16 md:py-24 section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-md"> {/* Centered content */}
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-4 header-divider">
          About Me
        </h2>
        <p className="text-lg text-muted-foreground mb-6 text-center">
          Driven to apply expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling to contribute to a dynamic team focused on innovation and real-world problem-solving. Continuously advancing skills, currently pursuing a Master of Science in Applied Data Science (Expected May 2025) and holding certifications in Google Ads and HubSpot, with an AWS Machine Learning Specialty in progress. Eager to tackle complex challenges and explore leadership opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-accent mb-3">Core Skills</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>Python, SQL, R, Java</li>
              <li>AWS Cloud Services</li>
              <li>Tableau, Scikit-learn</li>
              <li>Statistical Modeling</li>
              <li>ETL Pipelines, Data Wrangling</li>
            </ul>
          </div>
          <div className="bg-background p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-accent mb-3">Certifications & Learning</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>Google Ads Search Certification</li>
              <li>HubSpot Email Marketing Certification</li>
              <li>AWS Certified Machine Learning - Specialty (In Progress)</li>
              <li>M.S. Applied Data Science (Expected May 2025)</li>
            </ul>
          </div>
        </div>
        <div className="bg-background p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-accent mb-3">Security Clearance</h3>
            <p className="text-muted-foreground">
              Holds an active Secret clearance with the government, valid through <strong>October 2026</strong>.
            </p>
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <div className="flex flex-col">
      <AboutMe /> {/* This is the Hero section */}
      <AboutMeDetails /> {/* This is the new detailed About Me section */}
      <ProfessionalSummary />
      <ProjectShowcase />
      <ContactForm />
    </div>
  );
}
