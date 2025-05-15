import type { Experience } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, CalendarDays, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const experiences: Experience[] = [
  {
    id: 'exp1',
    role: 'Senior Data Scientist',
    company: 'Innovatech Solutions',
    dates: 'Jan 2021 - Present',
    description: [
      'Led a team of 5 data scientists in developing and deploying machine learning models for predictive analytics, resulting in a 15% increase in customer retention.',
      'Architected and implemented a real-time data processing pipeline using Kafka and Spark, improving data availability for critical business decisions.',
      'Published 3 research papers in top-tier AI conferences on novel deep learning architectures.',
    ],
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'Kafka', 'AWS'],
  },
  {
    id: 'exp2',
    role: 'Software Engineer II',
    company: 'Tech Forward Inc.',
    dates: 'Jun 2018 - Dec 2020',
    description: [
      'Developed scalable microservices using Node.js and Docker, deployed on Kubernetes.',
      'Contributed to the design and development of a new flagship product, serving over 1 million users.',
      'Improved application performance by 25% through code optimization and database query tuning.',
    ],
    skills: ['Node.js', 'React', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB'],
  },
];

const ProfessionalSummary = () => {
  return (
    <section id="experience" className="w-full py-16 md:py-24 bg-background section-fade-in">
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
