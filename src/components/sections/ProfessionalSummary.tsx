
"use client";

import type { Experience } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import Image from 'next/image';

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
      {/* Background image with cream overlay */}
      <div className="w-full relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/AdobeStock_432194964.jpeg"
            alt="Professional background"
            fill
            className="object-cover"
            sizes="100vw"
            quality={85}
            data-ai-hint="abstract texture"
          />
          {/* Cream overlay with retro filter */}
          <div className="absolute inset-0 bg-[#F5F5DC]/90"></div>
          <div className="absolute inset-0 backdrop-sepia-[0.15] mix-blend-multiply"></div>
        </div>

        {/* Enhanced Rainbow divider with Apple Intelligence style */}
        <div className="w-full relative z-10">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
            <div className="rainbow-divider-apple"></div>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl text-center mb-12 text-slate-800">
              Professional Experience
            </h2>
          </div>
        </div>
      
        <section id="experience" className="w-full py-6 md:py-12 relative z-10 section-fade-in">
          <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
            <div className="space-y-8">
              {experiences.map((exp) => (
                <Card key={exp.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                      <CardTitle className="text-2xl flex items-center text-accent">
                        <Briefcase className="mr-2 h-6 w-6 text-accent" />
                        {exp.role}
                      </CardTitle>
                      <div className="text-slate-600 mt-2 sm:mt-0">
                        {exp.dates}
                      </div>
                    </div>
                    <div className="text-slate-700">
                      {exp.company}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {exp.description.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-secondary mr-2 mt-1">•</span>
                          <span className="text-slate-800">{item}</span>
                        </li>
                      ))}
                    </ul>
                
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="mt-6">
                        <div className="text-sm text-slate-600 mb-2">Key Skills:</div>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
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
      </div>
    </>
  );
};

export default ProfessionalSummary;
