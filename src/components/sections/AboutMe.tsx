
import Image from 'next/image';
import { UserCircle2, Briefcase, Zap, TrendingUp, ShieldCheck, Award, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const AboutMe = () => {
  const skills = [
    "Python", "SQL", "AWS", "Tableau", "Scikit-learn",
    "Statistical Modeling", "ETL Pipelines", "Data Wrangling", "R", "Java"
  ];

  const certifications = [
    { name: "Google Ads Search Certification", institution: "Google", date: "Achieved: Aug 2023" },
    { name: "HubSpot Email Marketing Certification", institution: "HubSpot", date: "Achieved: Aug 2023" },
    { name: "AWS Certified Machine Learning - Specialty", institution: "Amazon Web Services", date: "In Progress" },
  ];

  return (
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 force-white-bg section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        {/* Main intro: Image on left, Text on right for medium screens and up */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Image Area */}
          <div className="w-full md:w-1/3 lg:w-2/5 flex justify-center md:justify-start">
            <Image
              src="/DSC02786.jpg"
              alt="Gabriel Elohi Mancillas Gallardo"
              width={320} 
              height={400} // More portrait-like for side layout
              className="rounded-lg shadow-lg object-cover"
              data-ai-hint="professional headshot"
            />
          </div>

          {/* Text Content Area for Intro */}
          <div className="w-full md:w-2/3 lg:w-3/5 space-y-4 text-center md:text-left">
            <Badge variant="secondary" className="text-sm">Hello, I'm Gabriel Elohi Mancillas Gallardo</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl header-divider">
              Innovative Data Scientist & Engineer
            </h1>
            <p className="text-lg text-foreground">
              Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights, leveraging SQL, Tableau, Python, and AWS cloud services. Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
            </p>
          </div>
        </div>

        {/* Subsequent Details: Centered and below the intro */}
        <div className="space-y-10 max-w-3xl mx-auto">
          {/* Skills Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary flex items-center">
              <Zap className="mr-2 h-5 w-5 text-accent" />
              Core Skills
            </h3>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-sm">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary flex items-center">
              <Award className="mr-2 h-5 w-5 text-accent" />
              Certifications & Learning
            </h3>
            <ul className="space-y-1 text-foreground list-none pl-0">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-start sm:items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500 flex-shrink-0 mt-1 sm:mt-0" />
                  <span className="flex-grow"><strong>{cert.name}</strong> ({cert.institution}) - <em>{cert.date}</em></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Goals Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-accent" />
              Career Goals
            </h3>
            <p className="text-foreground">
              Driven to apply expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling to contribute to a dynamic team focused on innovation and real-world problem-solving. Continuously advancing skills, currently pursuing a Master of Science in Applied Data Science (Expected May 2025) and holding certifications in Google Ads and HubSpot, with an AWS Machine Learning Specialty in progress. Eager to tackle complex challenges and explore leadership opportunities.
            </p>
          </div>

          {/* Security Clearance Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-primary flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-accent" />
              Security Clearance
            </h3>
            <p className="text-destructive">
              Holds an active Secret clearance with the government, valid through <strong>October 2026</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
