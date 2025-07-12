
"use client";

import { useState, useEffect } from 'react';
import type { Experience } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'Contract Specialist - Engineering Department',
    company: 'Naval Information Warfare Center (NIWC) Pacific, San Diego, CA',
    dates: 'October 2023 - October 2024',
    description: [
      'Led weekly discussions with a multidisciplinary team of over 35 professionals (Contracting Specialists, BFM, Technical experts, Project managers, Engineers) to drive policy implementation, ensure regulatory alignment, and promote interdepartmental collaboration.',
      'Managed the full life-cycle of contract-based solutions (20 per month), including pre-award cost analysis, post-award financial review, and alignment with client/sponsor objectives.',
      'Collaborated with financial analysts and departmental leads to produce financial reports, track expenditures, and proactively identify funding variances, improving budget forecasting.',
      'Provided Contract Specialist/Officer support for 7 Government clients, overseeing >$500M in contracts and developing up to $17.5M in total contract value (29 Task Orders, 60 Modifications in FY24-FY25).'
    ],
    skills: ['Contract Management', 'Financial Analysis', 'Regulatory Compliance', 'Budget Forecasting', 'Stakeholder Collaboration']
  },
  {
    id: 'exp2',
    role: 'Chargeback Fraud Analyst - Financial/Prevention Department',
    company: 'BlueSnap, Boston, MA',
    dates: 'March 2021 - August 2023',
    description: [
      'Led audit and investigation of >40k monthly high-risk transactions (>$10M value), using advanced analytics to uncover fraud patterns and support fund recovery.',
      'Developed and presented tailored risk mitigation portfolios for >50 merchants (each >$1M monthly revenue), achieving a 25% reduction in chargeback incidents.',
      'Strengthened internal controls by implementing advanced analytical methodologies, improving fraud-related financial exposure forecasting.',
      'Managed complex international payment ecosystems (100+ currencies), ensuring adherence to PCI, GDPR, and CCPA standards.',
    ],
    skills: ['Fraud Detection', 'Risk Mitigation', 'Advanced Analytics', 'Payment Systems', 'PCI/GDPR/CCPA Compliance', 'Data Analysis'],
  },
];

const ProfessionalSummary = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const professionalSection = document.getElementById('experience');
      if (professionalSection) {
        const rect = professionalSection.getBoundingClientRect();
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
    <section id="experience" className="w-full py-28 md:py-40 relative z-10 section-fade-in bg-background">
      <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
        <h2
          className="text-5xl font-bold sm:text-6xl md:text-7xl text-center mb-8 text-foreground font-mono"
          style={{
            opacity: scrollProgress,
            transform: `translateY(${(1 - scrollProgress) * 50}px)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
          }}
        >
          Strategic Leadership in Action
        </h2>
        {/* Simple divider - increased sizing */}
        <div
          className="h-2 w-48 bg-primary mx-auto mb-20 rounded-full"
          style={{
            opacity: scrollProgress,
            transform: `scaleX(${scrollProgress})`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
          }}
        ></div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              className="shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border-gray-200"
              style={{
                opacity: Math.min(scrollProgress * 2 - (index * 0.2), 1),
                transform: `translateY(${Math.max(0, (1 - scrollProgress) * 50)}px)`,
                transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
              }}
            >
              <CardHeader className="p-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                  <CardTitle className="text-3xl flex items-center text-primary font-mono">
                    <Briefcase className="mr-4 h-8 w-8 text-primary" />
                    {exp.role}
                  </CardTitle>
                  <div className="text-slate-500 mt-3 sm:mt-0 font-mono text-lg">
                    {exp.dates}
                  </div>
                </div>
                <div className="text-slate-700 font-mono text-xl">
                  {exp.company}
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <ul className="space-y-5">
                  {exp.description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-4 mt-1 font-mono text-lg">•</span>
                      <span className="text-slate-800 font-mono text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="mt-8">
                    <div className="text-lg text-slate-600 mb-4 font-mono">Key Skills:</div>
                    <div className="flex flex-wrap gap-3">
                      {exp.skills.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary/20 text-primary font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalSummary;
