
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
    title: 'Financial Analysis of Transportation Trends (Capstone)',
    description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
    technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'financial charts transportation',
    repoUrl: 'https://github.com', // Placeholder
    demoUrl: '#', // Placeholder
  },
  {
    id: 'proj2',
    title: 'Stock Price Forecasting (NVIDIA)',
    description: 'Designed and deployed a stock price forecasting model using Amazon SageMaker’s DeepAR. Leveraged historical market data and technical indicators for improved prediction accuracy, enabling real-time predictions for investment strategies. Achieved 94% F-1 Score with AWS Sagemaker.',
    technologies: ['Python', 'AWS SageMaker', 'DeepAR', 'TensorFlow', 'Scikit-learn', 'Time Series Analysis'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'stock market graph',
    repoUrl: 'https://github.com', // Placeholder
  },
  {
    id: 'proj3',
    title: 'ETL Schema and Pipeline (AWS RDS)',
    description: 'Built a robust ETL data pipeline using Python and AWS RDS/MySQL, featuring schema design, database optimization, and automated reporting. Implemented AWS security (IAM, RDS Proxy, Secrets Manager) for secure, scalable data handling.',
    technologies: ['Python', 'AWS RDS', 'MySQL', 'ETL', 'IAM', 'AWS Secrets Manager', 'Database Optimization'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'database schema diagram',
    repoUrl: 'https://github.com/Neo-and-Company/ETL-Schema-Project',
  },
  {
    id: 'proj4',
    title: 'EM3 Wedding Services: Data-Driven Insights Platform',
    description: "Engineered a sophisticated ETL pipeline and data analytics framework for EM3 Wedding Services, a premier provider in the wedding industry. This platform ingests, transforms, and models heterogeneous data sources encompassing client engagement, service utilization, and market dynamics. Leveraged advanced data science techniques for predictive analytics, customer segmentation, and operational optimization. The robust data engineering backbone ensures data quality, scalability, and facilitates comprehensive business intelligence, empowering EM3 to enhance service personalization and strategic decision-making.",
    technologies: ['Python', 'SQL', 'ETL Pipelines', 'Data Modeling', 'Data Warehousing', 'Business Intelligence', 'Predictive Analytics', 'Cloud Data Platforms'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'data analytics wedding',
    repoUrl: 'https://github.com/Neo-and-Company/Dove',
    demoUrl: '#', // Placeholder, can be removed if no demo link
  },
  {
    id: 'proj5',
    title: 'Portfolio Optimization & Algorithmic Trading Engine',
    description: "Developed a comprehensive financial modeling system focused on portfolio optimization using Modern Portfolio Theory and advanced quantitative techniques. Engineered an algorithmic trading engine capable of executing strategies based on real-time market data analysis and predictive modeling. Features include robust backtesting capabilities, risk management modules (VaR, CVaR), and performance attribution reporting. This project demonstrates deep understanding of financial markets, statistical modeling, and low-latency system design for automated trading.",
    technologies: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'SQL', 'FIX Protocol', 'Quantitative Finance'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'algorithmic trading finance',
    repoUrl: 'https://github.com/Gabeleo24/Portfolio-Optimization-Algorithmic-Trading-Engine',
    demoUrl: '#', // Placeholder
  },
  {
    id: 'proj6',
    title: 'Automated Knowledge Discovery & Insight Platform',
    description: "Architected and implemented an end-to-end platform for automated knowledge discovery from unstructured and semi-structured data sources. This system employs advanced NLP techniques for entity recognition, relation extraction, and sentiment analysis. It features a data augmentation pipeline to enrich datasets and a machine learning core to identify hidden patterns, anomalies, and predictive insights. The extracted knowledge is structured into a dynamic knowledge graph, enabling complex queries and visualizations for strategic decision support. Focus on scalability and real-time processing of diverse data streams.",
    technologies: ['Python', 'spaCy', 'NLTK', 'Transformers (Hugging Face)', 'Elasticsearch', 'Neo4j', 'Airflow', 'LLM APIs', 'Knowledge Graphs', 'Information Retrieval'],
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'knowledge graph data',
    repoUrl: 'https://github.com', // Placeholder
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
