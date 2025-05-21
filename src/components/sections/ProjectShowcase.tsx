
'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, Play, Pause } from 'lucide-react';
import type { Project, MediaType } from '@/types'; 

const projects: Project[] = [
  {
    id: 'proj1',
    title: 'Financial Analysis of Transportation Trends (Capstone)',
    description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
    technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
    imageUrl: '/AdobeStock_980574083.jpeg', 
    imageHint: 'financial charts transportation',
    repoUrl: 'https://github.com',
    demoUrl: '#',
    mediaType: 'image',
  },
  {
    id: 'proj2',
    title: 'Stock Price Forecasting (NVIDIA) & Lemon Quality Testing',
    description: 'Designed and deployed a stock price forecasting model using Amazon SageMaker’s DeepAR. Leveraged historical market data and technical indicators for improved prediction accuracy. Additionally, developed an image classification model on SageMaker for assessing lemon quality via visual inspection, demonstrating versatility in applying ML to diverse problem domains. Achieved 94% F-1 Score for stock forecasting.',
    technologies: ['Python', 'AWS SageMaker', 'DeepAR', 'TensorFlow', 'Scikit-learn', 'Time Series Analysis', 'Image Classification', 'Computer Vision'],
    imageUrl: 'https://placehold.co/600x400.png', 
    imageHint: 'lemon testing ai',
    repoUrl: 'https://github.com',
    mediaType: 'rotating-images',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'], 
  },
  {
    id: 'proj3',
    title: 'ETL Schema and Pipeline (AWS RDS)',
    description: 'Built a robust ETL data pipeline using Python and AWS RDS/MySQL, featuring schema design, database optimization, and automated reporting. Implemented AWS security (IAM, RDS Proxy, Secrets Manager) for secure, scalable data handling.',
    technologies: ['Python', 'AWS RDS', 'MySQL', 'ETL', 'IAM', 'AWS Secrets Manager', 'Database Optimization'],
    imageUrl: '/AdobeStock_1080340122_Editorial_Use_Only.jpeg', 
    imageHint: 'database schema diagram',
    repoUrl: 'https://github.com/Neo-and-Company/ETL-Schema-Project',
    mediaType: 'image',
  },
  {
    id: 'proj4',
    title: 'EM3 Wedding Services: Data-Driven Insights Platform',
    description: "Engineered a sophisticated ETL pipeline and data analytics framework for EM3 Wedding Services, a premier provider in the wedding industry. This platform ingests, transforms, and models heterogeneous data sources encompassing client engagement, service utilization, and market dynamics. Leveraged advanced data science techniques for predictive analytics, customer segmentation, and operational optimization. The robust data engineering backbone ensures data quality, scalability, and facilitates comprehensive business intelligence, empowering EM3 to enhance service personalization and strategic decision-making.",
    technologies: ['Python', 'SQL', 'ETL Pipelines', 'Data Modeling', 'Data Warehousing', 'Business Intelligence', 'Predictive Analytics', 'Cloud Data Platforms'],
    imageUrl: '/AdobeStock_589427987.jpeg', 
    imageHint: 'data analytics wedding',
    repoUrl: 'https://github.com/Neo-and-Company/Dove',
    demoUrl: '#', 
    mediaType: 'image',
  },
  {
    id: 'proj5',
    title: 'Portfolio Optimization & Algorithmic Trading Engine',
    description: "Developed a comprehensive financial engineering system that combines portfolio optimization with algorithmic trading capabilities. The system employs modern portfolio theory, factor models, and machine learning to construct optimal portfolios and execute trades based on quantitative signals.",
    technologies: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'PyTorch', 'Financial APIs', 'Quantitative Finance', 'Machine Learning', 'Time Series Analysis'],
    imageUrl: 'https://placehold.co/600x400.png', // Changed from video to placeholder image
    imageHint: 'algorithmic trading finance',
    repoUrl: 'https://github.com/Gabeleo24/Portfolio-Optimization-Algorithmic-Trading-Engine',
    demoUrl: '#',
    mediaType: 'image', // Temporarily changed from 'video' to 'image'
  },
  {
    id: 'proj6',
    title: 'Automated Knowledge Discovery & Insight Platform',
    description: "Architected and implemented an end-to-end platform for automated knowledge discovery from unstructured and semi-structured data sources. This system employs advanced NLP techniques for entity recognition, relation extraction, and sentiment analysis. It features a data augmentation pipeline to enrich datasets and a machine learning core to identify hidden patterns, anomalies, and predictive insights. The extracted knowledge is structured into a dynamic knowledge graph, enabling complex queries and visualizations for strategic decision support. Focus on scalability and real-time processing of diverse data streams.",
    technologies: ['Python', 'spaCy', 'NLTK', 'Transformers (Hugging Face)', 'Elasticsearch', 'Neo4j', 'Airflow', 'LLM APIs', 'Knowledge Graphs', 'Information Retrieval'],
    imageUrl: 'https://placehold.co/600x400.png', 
    imageHint: 'knowledge graph data',
    repoUrl: 'https://github.com/Gabeleo24/Automated-Knowledge-Discovery-Insight-Platform',
    mediaType: 'image',
  },
];

// Component for displaying a single image with fallback
const ProjectImage = ({ src, alt, imageHint }: { src: string; alt: string; imageHint?: string }) => {
  const [error, setError] = useState(false);
  const fallbackSrc = '/placeholder-image.jpg'; 
  
  return (
    <div className="relative w-full h-full">
      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover rounded-t-lg"
        data-ai-hint={imageHint || 'project image'}
        onError={() => {
          console.error(`Failed to load image: ${src}`);
          setError(true);
        }}
      />
    </div>
  );
};

// Component for video playback
const VideoPlayer = ({ src, poster }: { src: string; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error('Video playback error:', err);
          setError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-700 rounded-t-lg">
        <span className="text-slate-400">Video not available</span>
         <ProjectImage src={poster || '/placeholder-image.jpg'} alt="Video poster fallback" imageHint="video error" />
      </div>
    );
  }
  
  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover rounded-t-lg"
        playsInline
        muted
        loop
        onError={(e) => {
          console.error('Video load error:', e);
          setError(true);
        }}
      />
      <button
        onClick={togglePlay}
        className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10 transition-colors"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </div>
  );
};

// Component for displaying rotating images (carousel)
const RotatingImages = ({
  images,
  alt,
  autoplay = true,
  imageHint
}: {
  images: string[];
  alt: string;
  autoplay?: boolean;
  imageHint?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(!autoplay);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fallbackSrc = '/placeholder-image.jpg'; 
  
  useEffect(() => {
    setIsPaused(!autoplay); 
  }, [autoplay]);
  
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [images, isPaused]);
  
  const validImages = images.filter(img => !imageErrors[img]);
  if (validImages.length === 0 && images.length > 0) { 
    return (
      <div className="relative w-full h-full">
        <Image
          src={fallbackSrc}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-lg"
          data-ai-hint={imageHint || 'placeholder image'}
        />
      </div>
    );
  }
   if (images.length === 0) { 
    return <ProjectImage src={fallbackSrc} alt={alt} imageHint={imageHint || 'no image provided'} />;
  }

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === currentIndex ? 1 : 0 }}
        >
          <Image
            src={imageErrors[src] ? fallbackSrc : src}
            alt={`${alt} - Image ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            data-ai-hint={imageHint || `carousel image ${index + 1}`}
            priority={index === 0}
            onError={() => {
              console.error(`Failed to load image in rotator: ${src}`);
              setImageErrors(prev => ({ ...prev, [src]: true }));
            }}
          />
        </div>
      ))}
      
      {images.length > 1 && ( 
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full z-10 transition-colors"
          aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
        >
          {isPaused ? <Play size={20} /> : <Pause size={20} />}
        </button>
      )}
    </div>
  );
};

const ProjectShowcase = () => {
  
  return (
    <section id="projects" className="w-full py-12 md:py-16 bg-slate-900 section-fade-in">
      <div className="container mx-auto px-4 md:px-6 max-w-screen-xl">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl text-center mb-12 header-divider">
          Project Showcase
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col bg-slate-800/50 text-white shadow-lg hover:shadow-primary/30 transition-shadow duration-300 h-full rounded-lg overflow-hidden"
            >
              <div className="w-full h-60 md:h-72 relative"> 
                {project.mediaType === 'video' && project.imageUrl ? (
                  <VideoPlayer
                    src={project.imageUrl} 
                    poster={project.imageUrl.replace(/\.(mov|mp4|webm)$/, '.jpg')} 
                  />
                ) : project.mediaType === 'rotating-images' && project.imageUrls && project.imageUrls.length > 0 ? (
                  <RotatingImages
                    images={project.imageUrls}
                    alt={project.title}
                    imageHint={project.imageHint}
                  />
                ) : project.imageUrl ? ( 
                  <ProjectImage
                    src={project.imageUrl}
                    alt={project.title}
                    imageHint={project.imageHint}
                  />
                ) : ( 
                   <ProjectImage
                    src="/placeholder-image.jpg" 
                    alt="Placeholder image"
                    imageHint="placeholder project"
                  />
                )}
              </div>
              
              <CardHeader className="p-4">
                <CardTitle className="text-xl font-semibold text-accent">
                  {project.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-grow p-4 pt-0">
                <p className="text-slate-300 text-sm mb-4 h-24 overflow-y-auto">{project.description}</p>
                <div className="text-sm text-foreground/80 mb-2">Technologies Used:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech) => ( 
                    <Badge key={tech} variant="secondary" className="text-xs bg-slate-700 text-slate-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 flex justify-start gap-3">
                {project.repoUrl && (
                  <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
                    <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                )}
                {project.demoUrl && project.demoUrl !== '#' && (
                  <Button variant="outline" size="sm" asChild className="border-primary/50 text-primary-foreground hover:bg-primary/20 hover:text-primary-foreground">
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
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
