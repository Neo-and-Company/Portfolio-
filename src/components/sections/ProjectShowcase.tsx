import type { Project } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';

const projects: Project[] = [
  {
    id: 'proj1',
    title: 'AI-Powered Recommendation Engine',
    description: 'Developed a collaborative filtering based recommendation system for an e-commerce platform, improving user engagement by 20%.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Docker'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'abstract algorithm',
    repoUrl: 'https://github.com',
    demoUrl: '#',
  },
  {
    id: 'proj2',
    title: 'Real-time Anomaly Detection System',
    description: 'Built a system using time-series analysis and machine learning to detect anomalies in server logs, reducing downtime by 10%.',
    technologies: ['Go', 'Prometheus', 'Grafana', 'Kafka', 'Kubernetes'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'server logs graph',
    repoUrl: 'https://github.com',
  },
  {
    id: 'proj3',
    title: 'Portfolio Website Next.js',
    description: 'This very portfolio website, built with Next.js, Tailwind CSS, and Shadcn/UI for a modern, responsive, and professional showcase.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/UI', 'Vercel'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'modern website design',
    repoUrl: 'https://github.com',
    demoUrl: '/',
  },
];

const ProjectShowcase = () => {
  return (
    <section id="projects" className="w-full py-16 md:py-24 bg-card section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl md:text-5xl text-center mb-12 header-divider">
          Project Showcase
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="aspect-[3/2] relative mb-4 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={project.imageHint}
                  />
                </div>
                <CardTitle className="text-xl text-primary flex items-center">
                  <FolderGit2 className="mr-2 h-5 w-5 text-accent" />
                  {project.title}
                </CardTitle>
                <CardDescription className="text-foreground/80 h-20 overflow-hidden text-ellipsis">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-start gap-2">
                {project.repoUrl && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </Link>
                  </Button>
                )}
                {project.demoUrl && (
                  <Button asChild variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link href={project.demoUrl} target={project.demoUrl.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
