
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
        {/* Main flex container: stacks image and content vertically, centers them horizontally */}
        <div className="flex flex-col items-center gap-12">
          {/* Image: Centered */}
          <div className="flex justify-center">
            <Image
              src="/DSC02786.jpg"
              alt="Gabriel Elohi Mancillas Gallardo"
              width={280} 
              height={280}
              className="rounded-lg shadow-lg aspect-square object-cover"
              data-ai-hint="professional headshot"
            />
          </div>

          {/* Text Content Area: Centered block with max-width for readability */}
          <div className="w-full max-w-3xl space-y-8">
            {/* Introductory Block: Centered text */}
            <div className="space-y-4 text-center">
              <Badge variant="secondary" className="text-sm">Hello, I'm Gabriel Elohi Mancillas Gallardo</Badge>
              <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl header-divider inline-block">
                Innovative Data Scientist & Engineer
              </h1>
              <p className="text-lg text-foreground">
                Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights, leveraging SQL, Tableau, Python, and AWS cloud services. Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
              </p>
            </div>

            {/* Skills Section: Heading left-aligned, badges below */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary flex items-center">
                <Zap className="mr-2 h-5 w-5 text-accent" />
                Core Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-sm">{skill}</Badge>
                ))}
              </div>
            </div>

            {/* Certifications Section: Heading left-aligned, list below */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary flex items-center">
                <Award className="mr-2 h-5 w-5 text-accent" />
                Certifications & Learning
              </h3>
              <ul className="space-y-1 text-foreground list-none pl-0">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-center">
                    <Star className="mr-2 h-4 w-4 text-yellow-500 flex-shrink-0" />
                    <span><strong>{cert.name}</strong> ({cert.institution}) - <em>{cert.date}</em></span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Career Goals Section: Heading left-aligned, paragraph below */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-primary flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-accent" />
                Career Goals
              </h3>
              <p className="text-foreground">
                Driven to apply expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling to contribute to a dynamic team focused on innovation and real-world problem-solving. Continuously advancing skills, currently pursuing a Master of Science in Applied Data Science (Expected May 2025) and holding certifications in Google Ads and HubSpot, with an AWS Machine Learning Specialty in progress. Eager to tackle complex challenges and explore leadership opportunities.
              </p>
            </div>

            {/* Security Clearance Section: Heading left-aligned, paragraph below */}
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
      </div>
    </section>
  );
};

export default AboutMe;
