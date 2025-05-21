
"use client";

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
  return (
    <>
      {/* Enhanced Rainbow divider with Apple Intelligence style */}
      <div className="w-full">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
          <div className="rainbow-divider-apple"></div>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-center mb-12 apple-intelligence-heading">
            Professional Experience
          </h2>
        </div>
      </div>
      
      <section id="experience" className="w-full py-6 md:py-12 bg-background section-fade-in">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
          <div className="space-y-8">
            {experiences.map((exp) => (
              <Card key={exp.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <CardTitle className="text-2xl flex items-center text-accent">
                      <Briefcase className="mr-2 h-6 w-6 text-accent" />
                      {exp.role}
                    </CardTitle>
                    <div className="text-muted-foreground mt-2 sm:mt-0">
                      {exp.dates}
                    </div>
                  </div>
                  <div className="text-foreground/80">
                    {exp.company}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {exp.description.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-secondary mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="mt-6">
                      <div className="text-sm text-muted-foreground mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary-foreground">
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
    </>
  );
};

export default ProfessionalSummary;
