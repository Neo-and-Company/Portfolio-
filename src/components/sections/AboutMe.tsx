
import Image from 'next/image';
import Link from 'next/link';
import { UserCircle2, Briefcase, Zap, TrendingUp, ShieldCheck, Award, Star, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <section id="about" className="w-full py-16 md:py-24 lg:py-32 section-fade-in relative overflow-hidden">
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <Image
          src="/la.jpeg" // Updated path to use the image from the public folder
          alt="Abstract background"
          fill
          className="object-cover"
          data-ai-hint="abstract texture" // Updated hint
          priority
        />
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay for readability */}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Content Area */}
          <div className="space-y-5 text-center md:text-left">
            <Badge variant="outline" className="border-accent text-accent text-sm font-semibold py-1 px-4 rounded-full">Hello!</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary !leading-tight">
              I'm <span className="text-accent">Gabriel</span>,
              <br />
              Innovative Data Scientist & Engineer
            </h1>
            <p className="text-lg text-foreground/90 max-w-xl mx-auto md:mx-0">
              Analytical professional with strong expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling. Adept at transforming complex data sets into actionable strategic insights, leveraging SQL, Tableau, Python, and AWS cloud services. Proven ability to develop and implement analytical frameworks to optimize marketing performance, enhance audience engagement, and deliver impactful business results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="rounded-full px-10 py-6 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="#projects">Portfolio <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-6 text-base font-semibold border-primary text-primary hover:bg-primary/5 hover:text-primary shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
          {/* Image Area */}
          <div className="flex justify-center md:items-start md:justify-end order-first md:order-last">
            <div className="relative w-[300px] h-[375px] sm:w-[360px] sm:h-[450px] ">
              <Image
                src="/DSC02786.jpg" 
                alt="Gabriel Elohi Mancillas Gallardo"
                fill
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="professional headshot"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Existing Details Content - This part remains from the old AboutMe */}
      <div id="about-details" className="container mx-auto px-4 md:px-6 max-w-screen-lg mt-20 md:mt-28 lg:mt-32 relative z-10">
        <div className="space-y-12 max-w-3xl mx-auto ">
          {/* Skills Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary flex items-center justify-center md:justify-start header-divider">
              <Zap className="mr-3 h-6 w-6 text-accent" />
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary flex items-center justify-center md:justify-start header-divider">
              <Award className="mr-3 h-6 w-6 text-accent" />
              Certifications & Learning
            </h2>
            <ul className="space-y-2 text-foreground list-none pl-0 text-left">
              {certifications.map((cert) => (
                <li key={cert.name} className="flex items-start sm:items-center bg-card p-3 rounded-md shadow-sm">
                  <Star className="mr-3 h-5 w-5 text-yellow-500 flex-shrink-0 mt-1 sm:mt-0" />
                  <span className="flex-grow text-sm"><strong>{cert.name}</strong> ({cert.institution}) – <em>{cert.date}</em></span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Goals Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary flex items-center justify-center md:justify-start header-divider">
              <TrendingUp className="mr-3 h-6 w-6 text-accent" />
              Career Goals
            </h2>
            <p className="text-foreground/90 text-left md:text-left bg-card p-4 rounded-md shadow-sm">
              Driven to apply expertise in data-driven marketing analytics, ETL pipelines, and advanced statistical modeling to contribute to a dynamic team focused on innovation and real-world problem-solving. Continuously advancing skills, currently pursuing a Master of Science in Applied Data Science (Expected May 2025) and holding certifications in Google Ads and HubSpot, with an AWS Machine Learning Specialty in progress. Eager to tackle complex challenges and explore leadership opportunities.
            </p>
          </div>

          {/* Security Clearance Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-primary flex items-center justify-center md:justify-start header-divider">
              <ShieldCheck className="mr-3 h-6 w-6 text-accent" />
              Security Clearance
            </h2>
            <p className="text-destructive bg-destructive/10 p-4 rounded-md shadow-sm font-medium text-left md:text-left">
              Holds an active Secret clearance with the government, valid through <strong>October 2026</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

    