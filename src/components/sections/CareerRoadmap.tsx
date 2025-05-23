"use client";

import { useEffect, useState, useRef } from 'react';
import { ArrowRight, AlertCircle, FileText, Briefcase, Rocket, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Skill descriptions for tooltips
const skillDescriptions: Record<string, string> = {
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
  
  // Data Scientist skills
  "Data Science": "Extracting knowledge and insights from structured and unstructured data",
  "Machine Learning": "Developing algorithms that learn from and make predictions based on data",
  "ETL Pipelines": "Building robust data extraction, transformation, and loading processes",
  "Statistical Modeling": "Creating mathematical models to represent relationships in data",
  
  // Future Growth skills
  "AI/ML Leadership": "Guiding teams in implementing artificial intelligence and machine learning solutions",
  "Innovation": "Developing novel approaches to solve complex business and technical challenges",
  "Strategic Planning": "Defining long-term objectives and mapping paths to achieve organizational goals",
  "Advanced Technologies": "Expertise in cutting-edge tools and frameworks that drive digital transformation"
};

const milestones = [
  {
    id: 1,
    title: "Chargeback Fraud Analyst",
    date: "March 2021 - August 2021",
    description: "Led audit and investigation of high-risk transactions, implementing advanced analytics to uncover fraud patterns and support fund recovery.",
    icon: <AlertCircle className="h-8 w-8 text-amber-400" />,
    skills: ["Fraud Detection", "Risk Mitigation", "Advanced Analytics", "Payment Systems"]
  },
  {
    id: 2,
    title: "Contract Specialist",
    date: "October 2021 - October 2023",
    description: "Collaborated with multidisciplinary teams to drive policy implementation, ensure regulatory alignment, and promote inter-departmental collaboration.",
    icon: <FileText className="h-8 w-8 text-amber-400" />,
    skills: ["Contract Management", "Financial Analysis", "Regulatory Compliance", "Budget Forecasting"]
  },
  {
    id: 3,
    title: "Data Scientist & Engineer",
    date: "Present",
    description: "Transforming complex data into clear insights and actionable strategies through advanced statistical modeling and analytical frameworks.",
    icon: <Briefcase className="h-8 w-8 text-amber-400" />,
    skills: ["Data Science", "Machine Learning", "ETL Pipelines", "Statistical Modeling"]
  },
  {
    id: 4,
    title: "Future Growth",
    date: "2024 and beyond",
    description: "Expanding expertise in AI/ML technologies and leading innovative data-driven projects that deliver measurable business impact.",
    icon: <Rocket className="h-8 w-8 text-amber-400" />,
    skills: ["AI/ML Leadership", "Innovation", "Strategic Planning", "Advanced Technologies"]
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

  // Calculate background opacity based on scroll progress
  const overlayOpacity = Math.min(0.9 * scrollProgress * 1.3, 0.9);

  return (
    <TooltipProvider>
      <section ref={sectionRef} id="roadmap" className="w-full py-16 md:py-24 relative bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-xl relative z-10">
          <h2 
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-center mb-16 header-divider"
            style={{ 
              opacity: scrollProgress,
              transform: `translateY(${(1 - scrollProgress) * 50}px)`,
              transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
            }}
          >
            Career Roadmap
          </h2>
          
          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-0 right-0 h-1 bg-gray-200 top-16 hidden md:block"
              style={{ 
                opacity: scrollProgress,
                transform: `scaleX(${scrollProgress})`,
                transformOrigin: 'left',
                transition: 'opacity 0.5s ease-out, transform 1s ease-out'
              }}
            ></div>
            
            {/* Timeline Items */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.id}
                  className="relative flex flex-col items-center"
                  style={{ 
                    opacity: Math.min(scrollProgress * 2 - (index * 0.2), 1),
                    transform: `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px)`,
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
                  }}
                >
                  {/* Timeline Node */}
                  <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-white border-2 border-primary mb-4 shadow-sm">
                    {React.cloneElement(milestone.icon, {
                      className: "h-8 w-8 text-amber-400"
                    })}
                  </div>
                  
                  {/* Arrow between nodes (hidden on mobile) */}
                  {index < milestones.length - 1 && (
                    <div className="absolute top-8 left-full transform -translate-x-1/2 hidden md:block">
                      <ArrowRight className="h-6 w-6 text-amber-400" />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full">
                    <h3 className="text-xl font-bold text-white mb-1 font-mono">{milestone.title}</h3>
                    <p className="text-amber-400 text-sm mb-3 font-mono">{milestone.date}</p>
                    <p className="text-gray-300 mb-4 text-sm">{milestone.description}</p>
                    
                    {/* Skills with Tooltips */}
                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill, i) => (
                        <Tooltip key={i} delayDuration={300}>
                          <TooltipTrigger asChild>
                            <span 
                              className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300 cursor-help transition-colors hover:bg-gray-600 hover:text-white"
                            >
                              {skill}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top" 
                            className="bg-gray-800 text-gray-200 border-gray-700 max-w-[250px] text-xs"
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
            
            {/* Progress Indicator */}
            <div 
              className="absolute bottom-0 left-0 h-1 bg-amber-400 rounded-full"
              style={{ 
                width: `${scrollProgress * 100}%`,
                opacity: scrollProgress,
                transition: 'width 0.5s ease-out, opacity 0.5s ease-out'
              }}
            ></div>
          </div>
          
          {/* Future Direction */}
          <div 
            className="mt-16 text-center"
            style={{ 
              opacity: Math.min(scrollProgress * 2 - 0.8, 1),
              transform: `translateY(${Math.max(0, (1 - scrollProgress) * 30)}px)`,
              transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
            }}
          >
            <div className="inline-flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-amber-400 mr-2" />
              <h3 className="text-2xl font-bold text-white font-mono">Continuous Growth</h3>
            </div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              My career journey represents a continuous evolution of skills and expertise, 
              from fraud analysis to contract management to data science. Each role has built upon 
              the previous, creating a unique skillset that combines analytical rigor, business acumen, 
              and technical expertise.
            </p>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default CareerRoadmap;
