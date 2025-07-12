"use client";

import { useEffect, useState, useRef } from 'react';
import { GraduationCap, TrendingUp, ShoppingBag, Shield, FileText, Rocket, Brain, Code } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Skill descriptions for tooltips
const skillDescriptions: Record<string, string> = {
  // Educational skills
  "Finance": "Understanding financial markets, investment strategies, and corporate finance principles",
  "Marketing": "Consumer behavior analysis, brand management, and strategic marketing campaigns",
  "Business Strategy": "Strategic planning, competitive analysis, and organizational development",
  "Leadership": "Team management, project coordination, and cross-functional collaboration",

  // Early Career skills
  "Customer Service": "Building relationships, problem-solving, and maintaining high service standards",
  "Team Collaboration": "Working effectively in diverse teams and supporting collective goals",
  "Operations Management": "Streamlining processes and ensuring efficient daily operations",
  "Communication": "Clear verbal and written communication across all organizational levels",

  // Fraud Analyst skills
  "Fraud Detection": "Identifying patterns and anomalies in transaction data to prevent financial losses",
  "Risk Mitigation": "Implementing strategies to reduce exposure to potential fraud and financial risks",
  "Advanced Analytics": "Using statistical methods and data visualization to extract insights from complex datasets",
  "Payment Systems": "Knowledge of credit card processing, ACH, wire transfers, and digital payment platforms",

  // Contract Specialist skills
  "Contract Management": "Overseeing the complete lifecycle of contracts from drafting to execution and renewal",
  "Financial Analysis": "Evaluating financial data to support decision-making and optimize resource allocation",
  "Regulatory Compliance": "Ensuring adherence to relevant laws, regulations, and internal policies",
  "Budget Forecasting": "Projecting future financial needs and tracking expenditures against allocated funds",

  // Data Science skills
  "Data Science": "Extracting knowledge and insights from structured and unstructured data",
  "Machine Learning": "Developing algorithms that learn from and make predictions based on data",
  "ETL Pipelines": "Building robust data extraction, transformation, and loading processes",
  "Statistical Modeling": "Creating mathematical models to represent relationships in data",
  "Python/R": "Programming languages for data analysis, machine learning, and statistical computing",

  // Current Role skills
  "Web Development": "Building responsive, user-friendly websites using modern frameworks and technologies",
  "Data ETL Pipelines": "Designing and implementing automated data extraction, transformation, and loading systems",
  "Data Engineering": "Creating scalable data infrastructure and optimizing data workflows for business insights",
  "Business Development": "Identifying growth opportunities and developing strategic partnerships",
  "Photography/Production Industry Knowledge": "Understanding the unique needs and workflows of creative production services",

  // Future Growth skills
  "AI/ML Leadership": "Guiding teams in implementing artificial intelligence and machine learning solutions",
  "Innovation": "Developing novel approaches to solve complex business and technical challenges",
  "Strategic Planning": "Defining long-term objectives and mapping paths to achieve organizational goals",
  "Advanced Technologies": "Expertise in cutting-edge tools and frameworks that drive digital transformation"
};

const milestones = [
  {
    id: 1,
    title: "Undergraduate Education",
    subtitle: "Finance, Marketing & Business Strategies",
    date: "2017 - 2021",
    description: "Built a strong foundation in business fundamentals while gaining practical experience in customer service and operations. This diverse education sparked my interest in data-driven decision making.",
    icon: <GraduationCap className="h-8 w-8 text-amber-400" />,
    skills: ["Finance", "Marketing", "Business Strategy", "Leadership"],
    type: "education"
  },
  {
    id: 2,
    title: "Early Career Experience",
    subtitle: "Lululemon & Starbucks",
    date: "2018 - 2021",
    description: "Developed essential professional skills in fast-paced retail environments, learning the importance of customer experience, team collaboration, and operational efficiency.",
    icon: <ShoppingBag className="h-8 w-8 text-amber-400" />,
    skills: ["Customer Service", "Team Collaboration", "Operations Management", "Communication"],
    type: "experience"
  },
  {
    id: 3,
    title: "Chargeback Fraud Analyst",
    subtitle: "BlueSnap, Boston",
    date: "March 2021 - August 2023",
    description: "Discovered my passion for data analysis while investigating high-risk transactions. This role revealed how powerful data could be in uncovering patterns and driving business decisions.",
    icon: <Shield className="h-8 w-8 text-amber-400" />,
    skills: ["Fraud Detection", "Risk Mitigation", "Advanced Analytics", "Payment Systems"],
    type: "experience"
  },
  {
    id: 4,
    title: "Contract Specialist",
    subtitle: "Naval Information Warfare Center",
    date: "October 2023 - October 2024",
    description: "Bridged business strategy with technical implementation, managing complex contracts while collaborating with engineers and analysts. This experience solidified my desire to work at the intersection of business and technology.",
    icon: <FileText className="h-8 w-8 text-amber-400" />,
    skills: ["Contract Management", "Financial Analysis", "Regulatory Compliance", "Budget Forecasting"],
    type: "experience"
  },
  {
    id: 5,
    title: "Data Science Graduate Program",
    subtitle: "Current Studies",
    date: "2024 - Present",
    description: "Pursuing advanced education in data science to formalize my analytical skills and learn cutting-edge techniques. Combining my business background with technical expertise to solve complex problems.",
    icon: <Brain className="h-8 w-8 text-amber-400" />,
    skills: ["Data Science", "Machine Learning", "Statistical Modeling", "Python/R"],
    type: "education"
  },
  {
    id: 6,
    title: "Website Developer & Data Engineer",
    subtitle: "EM3 Photography & Production Services",
    date: "October 2024 - Present",
    description: "Applying data science skills in an entrepreneurial setting, developing comprehensive web solutions and data pipelines for a creative production company. This role bridges technical expertise with business development, demonstrating the practical application of data engineering in diverse industries.",
    icon: <Code className="h-8 w-8 text-amber-400" />,
    skills: ["Web Development", "Data ETL Pipelines", "Data Engineering", "Business Development", "Photography/Production Industry Knowledge"],
    type: "experience"
  },
  {
    id: 7,
    title: "Future Vision",
    subtitle: "Data Science Leadership",
    date: "2025 and beyond",
    description: "Leveraging my unique combination of business acumen, technical skills, and entrepreneurial experience to lead data-driven initiatives that create meaningful impact for organizations and society.",
    icon: <Rocket className="h-8 w-8 text-amber-400" />,
    skills: ["AI/ML Leadership", "Innovation", "Strategic Planning", "Advanced Technologies"],
    type: "future"
  }
];

const CareerRoadmap = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const roadmapSection = sectionRef.current;
      if (roadmapSection) {
        const rect = roadmapSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Start the transition earlier for a smoother effect
        if (rect.top < viewportHeight * 1.2) {
          // Calculate progress as section approaches viewport
          const progress = Math.min(
            Math.max((viewportHeight * 1.2 - rect.top) / (viewportHeight * 0.8), 0),
            1
          );
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TooltipProvider>
      <section ref={sectionRef} id="career-journey" className="w-full py-28 md:py-40 relative bg-background">
        {/* Background Image - Set to 100% opacity as requested */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/AdobeStock_432194964.jpeg')",
            opacity: 1.0, /* 100% opacity for full visibility */
            zIndex: 0
          }}
        />

        {/* Content Overlay */}
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl relative z-10">
          <div className="text-center mb-20">
            <h2
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-6 font-mono"
              style={{
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 50}px)`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
              }}
            >
              My Journey to Data Science
            </h2>
            <div
              className="h-2 w-48 bg-primary mx-auto mb-8 rounded-full"
              style={{
                opacity: scrollProgress,
                transform: `scaleX(${scrollProgress})`,
                transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
              }}
            />
            <p
              className="text-xl md:text-2xl text-gray-800 max-w-4xl mx-auto font-mono leading-relaxed"
              style={{
                opacity: scrollProgress,
                transform: `translateY(${(1 - scrollProgress) * 30}px)`,
                transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
              }}
            >
              From business foundations to data science mastery—a story of continuous learning,
              strategic thinking, and the pursuit of meaningful impact through data-driven insights.
            </p>
          </div>

          {/* Vertical Timeline for Better Storytelling */}
          <div className="relative max-w-6xl mx-auto">
            {/* Timeline Line */}
            <div
              className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-primary/30 hidden md:block"
              style={{
                height: `${scrollProgress * 100}%`,
                opacity: scrollProgress,
                transition: 'height 0.5s ease-out, opacity 0.5s ease-out'
              }}
            ></div>

            {/* Timeline Items */}
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.id}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  style={{
                    opacity: Math.min(scrollProgress * 2 - (index * 0.15), 1),
                    transform: `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px)`,
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                  }}
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white border-4 border-primary shadow-lg mb-6 md:mb-0 md:mx-8">
                    {milestone.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full md:w-96 ${
                    index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                  }`}>
                    {/* Type Badge */}
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold font-mono ${
                        milestone.type === 'education' ? 'bg-blue-100 text-blue-800' :
                        milestone.type === 'experience' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {milestone.type === 'education' ? 'Education' :
                         milestone.type === 'experience' ? 'Experience' : 'Future'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-mono">{milestone.title}</h3>
                    {milestone.subtitle && (
                      <h4 className="text-lg text-primary mb-3 font-mono">{milestone.subtitle}</h4>
                    )}
                    <p className="text-amber-600 text-sm mb-4 font-mono font-semibold">{milestone.date}</p>
                    <p className="text-gray-700 mb-6 text-base leading-relaxed font-mono">{milestone.description}</p>

                    {/* Skills with Tooltips */}
                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill, skillIndex) => (
                        <Tooltip key={`${milestone.id}-${skill}`} delayDuration={300}>
                          <TooltipTrigger asChild>
                            <span
                              className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 cursor-help transition-colors hover:bg-primary hover:text-white font-mono"
                            >
                              {skill}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="bg-gray-800 text-gray-200 border-gray-700 max-w-[300px] text-sm"
                          >
                            {skillDescriptions[skill] || skill}
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Reflection */}
          <div
            className="mt-24 text-center bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-xl max-w-4xl mx-auto"
            style={{
              opacity: Math.min(scrollProgress * 2 - 0.8, 1),
              transform: `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            <div className="inline-flex items-center justify-center mb-6">
              <TrendingUp className="h-10 w-10 text-primary mr-3" />
              <h3 className="text-3xl font-bold text-gray-900 font-mono">The Power of Diverse Experience</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed font-mono mb-6">
              My journey from business foundations to data science represents more than just career progression—it's a
              strategic evolution that combines analytical rigor with business acumen. Each experience has contributed
              unique perspectives that strengthen my approach to data science.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 font-mono">Business Foundation</h4>
                <p className="text-gray-600 text-sm font-mono">Understanding market dynamics and strategic thinking</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 font-mono">Analytical Expertise</h4>
                <p className="text-gray-600 text-sm font-mono">Pattern recognition and risk assessment capabilities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 font-mono">Technical Innovation</h4>
                <p className="text-gray-600 text-sm font-mono">Applying cutting-edge data science techniques</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default CareerRoadmap;
