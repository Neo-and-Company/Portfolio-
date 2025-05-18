
import type { Experience } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, CalendarDays, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
      'Provided Contract Specialist/Officer support for 7 Government clients, overseeing >$500M in contracts and developing up to $17.5M in total contract value (29 Task Orders, 60 Modifications in FY24-FY25).',
    ],
    skills: ['Contract Management', 'Financial Analysis', 'Regulatory Compliance', 'Budget Forecasting', 'Stakeholder Collaboration'],
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
    <section id="experience" className="w-full py-12 md:py-16 bg-background section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-12 header-divider">
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <Card key={exp.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <CardTitle className="text-2xl text-primary flex items-center">
                    <Briefcase className="mr-2 h-6 w-6 text-accent" />
                    {exp.role}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground flex items-center mt-2 sm:mt-0">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {exp.dates}
                  </div>
                </div>
                <CardDescription className="text-lg text-foreground/80">{exp.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-2 mt-1 shrink-0" />
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                {exp.skills && exp.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
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
