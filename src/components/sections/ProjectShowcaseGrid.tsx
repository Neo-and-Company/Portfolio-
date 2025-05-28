"use client";

import React, { useState, useTransition } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt, FaCode, FaEye, FaTimes, FaPlay } from "react-icons/fa";
import AnimatedHeroModal from '@/components/ui/AnimatedHeroModal';
import { submitContactForm, type ContactFormState } from '@/lib/actions';
import { useActionState } from 'react';

// --- Type Definitions ---
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  repoUrl?: string;
  demoUrl?: string;
  mediaType?: string;
  summary?: string;
  keyFeatures?: string[];
  impact?: string;
  fontFamily?: string;
}

// --- Project Data ---
const projectData: Project[] = [
  {
    id: 'proj1',
    title: 'Financial Analysis of Transportation Trends (Capstone)',
    description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
    summary: 'A comprehensive capstone project analyzing the economic disruption caused by rideshare platforms in the traditional taxi industry, using advanced statistical methods and data visualization.',
    keyFeatures: [
      'Statistical analysis of transportation market data',
      'Interactive Tableau dashboards for data visualization',
      'Economic impact assessment and trend analysis',
      'Comparative study between traditional and modern transport'
    ],
    impact: 'Provided actionable insights for transportation policy makers and demonstrated measurable economic shifts in urban mobility patterns.',
    technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
    image: '/AdobeStock_461738310.jpeg',
    repoUrl: 'https://github.com/Gabeleo24/financial-analysis-capstone',
    demoUrl: 'https://financial-analysis-demo.vercel.app',
    mediaType: 'image',
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  },
  {
    id: 'proj2',
    title: 'Real-time Data Processing & Analytics Framework',
    description: 'Designed and implemented a high-throughput, fault-tolerant data processing framework capable of ingesting and analyzing streaming data at scale.',
    summary: 'Enterprise-grade data processing system built for handling massive streaming data volumes with real-time analytics capabilities and fault tolerance.',
    keyFeatures: [
      'High-throughput streaming data ingestion',
      'Real-time analytics and processing',
      'Fault-tolerant distributed architecture',
      'Scalable microservices deployment'
    ],
    impact: 'Enabled processing of 1M+ events per second with 99.9% uptime, reducing data processing latency by 75%.',
    technologies: ['Apache Kafka', 'Apache Spark', 'Kubernetes', 'Python'],
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=Data+Framework',
    repoUrl: 'https://github.com/Gabeleo24/data-processing-framework',
    demoUrl: 'https://data-framework-demo.netlify.app',
    mediaType: 'image',
    fontFamily: '"Source Code Pro", "Monaco", monospace',
  },
  {
    id: 'proj3',
    title: 'Portfolio Optimization & Algorithmic Trading Engine',
    description: 'Developed a comprehensive financial engineering system that combines portfolio optimization with algorithmic trading capabilities.',
    summary: 'Advanced quantitative finance platform that automates portfolio optimization and executes algorithmic trading strategies using machine learning.',
    keyFeatures: [
      'Modern Portfolio Theory implementation',
      'Machine learning-based trading algorithms',
      'Risk management and backtesting tools',
      'Real-time market data integration'
    ],
    impact: 'Achieved 15% better returns than benchmark indices with 20% lower volatility through optimized risk-adjusted strategies.',
    technologies: ['Python', 'NumPy', 'pandas', 'Machine Learning'],
    image: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Trading+Engine',
    repoUrl: 'https://github.com/Gabeleo24/trading-engine',
    demoUrl: 'https://trading-engine-demo.herokuapp.com',
    mediaType: 'image',
    fontFamily: '"JetBrains Mono", "Consolas", monospace',
  },
  {
    id: 'proj4',
    title: 'Automated Knowledge Discovery Platform',
    description: 'Architected an end-to-end platform for automated knowledge discovery from unstructured data sources using advanced NLP techniques.',
    summary: 'AI-powered knowledge extraction system that automatically discovers insights from unstructured documents using natural language processing.',
    keyFeatures: [
      'Advanced NLP and entity recognition',
      'Knowledge graph construction',
      'Semantic search capabilities',
      'Automated insight generation'
    ],
    impact: 'Reduced manual document analysis time by 80% and improved knowledge discovery accuracy to 92%.',
    technologies: ['Python', 'spaCy', 'Elasticsearch', 'Neo4j'],
    image: 'https://placehold.co/600x400/ec4899/ffffff?text=Knowledge+Platform',
    repoUrl: 'https://github.com/Gabeleo24/knowledge-platform',
    demoUrl: 'https://knowledge-platform-demo.vercel.app',
    mediaType: 'image',
    fontFamily: '"Fira Code", "Menlo", monospace',
  },
  {
    id: 'proj5',
    title: 'E-commerce Analytics Dashboard',
    description: 'Built a comprehensive analytics dashboard for e-commerce platforms with real-time metrics and predictive insights.',
    summary: 'Comprehensive business intelligence platform for e-commerce that provides real-time analytics, sales forecasting, and customer behavior insights.',
    keyFeatures: [
      'Real-time sales and revenue tracking',
      'Customer behavior analytics',
      'Predictive sales forecasting',
      'Interactive data visualizations'
    ],
    impact: 'Increased client revenue by 25% through data-driven insights and improved conversion rates by 18%.',
    technologies: ['React', 'Node.js', 'MongoDB', 'D3.js'],
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Analytics+Dashboard',
    repoUrl: 'https://github.com/Gabeleo24/ecommerce-analytics',
    demoUrl: 'https://ecommerce-analytics-demo.netlify.app',
    mediaType: 'image',
    fontFamily: '"Space Mono", "Lucida Console", monospace',
  },
  {
    id: 'proj6',
    title: 'AI-Powered Content Management System',
    description: 'Developed an intelligent CMS with AI-powered content recommendations and automated SEO optimization.',
    summary: 'Next-generation content management system that leverages artificial intelligence for content optimization, SEO automation, and personalized user experiences.',
    keyFeatures: [
      'AI-powered content recommendations',
      'Automated SEO optimization',
      'Smart content categorization',
      'Personalized user experiences'
    ],
    impact: 'Improved content engagement by 40% and reduced content creation time by 60% through AI automation.',
    technologies: ['Next.js', 'TensorFlow', 'PostgreSQL', 'AWS'],
    image: 'https://placehold.co/600x400/f59e0b/ffffff?text=AI+CMS',
    repoUrl: 'https://github.com/Gabeleo24/ai-cms',
    demoUrl: 'https://ai-cms-demo.vercel.app',
    mediaType: 'image',
    fontFamily: '"IBM Plex Mono", "Courier", monospace',
  },
];

// --- Project Details Modal Component ---
interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#6b7280',
            zIndex: 1001
          }}
        >
          <FaTimes />
        </button>



        {/* Project Content */}
        <div style={{ padding: '40px', fontFamily: project.fontFamily || 'inherit' }}>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '16px',
              lineHeight: '1.2',
              fontFamily: project.fontFamily || 'inherit'
            }}
          >
            {project.title}
          </h2>

          {/* Technologies */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#e0e7ff',
                    color: '#4338ca',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    fontFamily: project.fontFamily || 'inherit'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Summary */}
          {project.summary && (
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px',
                  fontFamily: project.fontFamily || 'inherit'
                }}
              >
                Project Overview
              </h3>
              <p
                style={{
                  color: '#4b5563',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #4f46e5',
                  fontFamily: project.fontFamily || 'inherit'
                }}
              >
                {project.summary}
              </p>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px',
                  fontFamily: project.fontFamily || 'inherit'
                }}
              >
                Key Features
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}
              >
                {project.keyFeatures.map((feature, index) => (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                      color: '#4b5563',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      fontFamily: project.fontFamily || 'inherit'
                    }}
                  >
                    <span
                      style={{
                        color: '#10b981',
                        marginRight: '8px',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                      }}
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div style={{ marginBottom: '24px' }}>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '12px',
                  fontFamily: project.fontFamily || 'inherit'
                }}
              >
                Impact & Results
              </h3>
              <p
                style={{
                  color: '#059669',
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  backgroundColor: '#ecfdf5',
                  padding: '16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #10b981',
                  fontWeight: '500',
                  fontFamily: project.fontFamily || 'inherit'
                }}
              >
                {project.impact}
              </p>
            </div>
          )}

          {/* Description */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '12px',
                fontFamily: project.fontFamily || 'inherit'
              }}
            >
              Technical Details
            </h3>
            <p
              style={{
                color: '#4b5563',
                fontSize: '1rem',
                lineHeight: '1.7',
                fontFamily: project.fontFamily || 'inherit'
              }}
            >
              {project.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1f2937',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#111827')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1f2937')}
              >
                <FaGithub />
                View Code
              </a>
            )}

            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4338ca')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
              >
                <FaExternalLinkAlt />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Initial state for contact form
const initialContactState: ContactFormState = {
  message: "",
  success: false,
  errors: {},
  fieldValues: { name: "", email: "", message: "" }
};

const ProjectShowcaseGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  // Email subscription state
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

  // Contact form state
  const [contactState, contactFormAction] = useActionState(submitContactForm, initialContactState);
  const [isContactPending, startContactTransition] = useTransition();
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Email subscription handler
  const handleEmailSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriptionEmail.trim()) return;

    setSubscriptionStatus('loading');

    // Simulate API call - replace with actual email service integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      console.log('Email subscription:', subscriptionEmail);
      setSubscriptionStatus('success');
      setSubscriptionMessage('Thank you for subscribing! You\'ll hear from me soon about opportunities.');
      setSubscriptionEmail('');
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Something went wrong. Please try again.');
    }
  };

  // Contact form handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', contactFormData.name);
    formData.append('email', contactFormData.email);
    formData.append('message', contactFormData.message);

    startContactTransition(() => {
      contactFormAction(formData);
    });
  };

  // Reset contact form on success
  React.useEffect(() => {
    if (contactState.success) {
      setContactFormData({ name: '', email: '', message: '' });
    }
  }, [contactState.success]);
  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: '#f8fafc', /* gray-50 */
        minHeight: '100vh'
      }}
    >
      {/* Hero Section */}
      <header
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          color: '#ffffff',
          padding: '80px 24px 128px 24px',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '700',
              marginBottom: '16px',
              lineHeight: '1.1'
            }}
          >
            Pioneering the Future of Data Intelligence
          </h1>
          <p
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
              marginBottom: '32px',
              maxWidth: '700px',
              margin: '0 auto 32px auto',
              lineHeight: '1.6'
            }}
          >
            Available for full-time opportunities and strategic partnerships. Specializing in advanced analytics, machine learning, and financial engineering solutions that deliver measurable ROI and competitive advantage for forward-thinking organizations.
          </p>

          {/* Animated Hero Modal Trigger */}
          <button
            onClick={() => setIsHeroModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '16px 32px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
            }}
          >
            <FaPlay style={{ fontSize: '16px' }} />
            Experience the Vision
          </button>

        </div>
      </header>

      {/* Projects Section - increased sizing */}
      <section
        id="projects"
        style={{
          padding: '96px 32px',
          backgroundColor: '#f1f5f9' /* gray-100 */
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#1f2937', /* gray-800 */
              marginBottom: '32px'
            }}
          >
            Innovation Portfolio: Strategic Solutions in Action
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280', /* gray-500 */
              marginBottom: '64px',
              maxWidth: '900px',
              margin: '0 auto 64px auto',
              lineHeight: '1.6',
              fontSize: '1.25rem'
            }}
          >
            A comprehensive showcase of enterprise-grade solutions that demonstrate strategic problem-solving, advanced technical implementation, and measurable business transformation. Each initiative represents a convergence of analytical rigor, innovative technology, and quantifiable organizational impact.
          </p>

          {/* Grid Layout - increased sizing */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '48px'
            }}
          >
            {projectData.map((project, index) => {
              // Define color schemes for each project
              const colorSchemes = [
                { bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', text: '#ffffff' }, // Indigo to Purple
                { bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', text: '#ffffff' }, // Green
                { bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', text: '#ffffff' }, // Amber
                { bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', text: '#ffffff' }, // Red
                { bg: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', text: '#ffffff' }, // Blue
                { bg: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', text: '#ffffff' }, // Purple
              ];
              const colorScheme = colorSchemes[index % colorSchemes.length];

              return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                style={{
                  background: colorScheme.bg,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                }}
                onClick={() => handleProjectClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
              >

                <div style={{ padding: '32px', fontFamily: project.fontFamily || 'inherit' }}>
                  <h3
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: '600',
                      color: colorScheme.text,
                      marginBottom: '20px',
                      lineHeight: '1.3',
                      fontFamily: project.fontFamily || 'inherit'
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Technology Tags - increased sizing */}
                  <div style={{ marginBottom: '20px' }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: colorScheme.text,
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          marginRight: '12px',
                          marginBottom: '12px',
                          display: 'inline-block',
                          fontFamily: project.fontFamily || 'inherit',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: colorScheme.text,
                          padding: '6px 16px',
                          borderRadius: '9999px',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          display: 'inline-block',
                          fontFamily: project.fontFamily || 'inherit',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      marginBottom: '24px',
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      fontFamily: project.fontFamily || 'inherit'
                    }}
                  >
                    {project.description.substring(0, 120)}...
                  </p>

                  <button
                    onClick={() => handleProjectClick(project)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: colorScheme.text,
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '500',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(10px)'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Email Subscription Section */}
      <section
        style={{
          padding: '80px 24px',
          backgroundColor: '#f1f5f9',
          textAlign: 'center'
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px'
            }}
          >
            Join the Innovation Network
          </h2>
          <p
            style={{
              color: '#6b7280',
              marginBottom: '32px',
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}
          >
            Connect with me for employment opportunities, consulting projects, and strategic partnerships in data science and analytics
          </p>
          <form onSubmit={handleEmailSubscription}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={subscriptionEmail}
                onChange={(e) => setSubscriptionEmail(e.target.value)}
                required
                disabled={subscriptionStatus === 'loading'}
                style={{
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minWidth: '300px',
                  outline: 'none',
                  backgroundColor: subscriptionStatus === 'loading' ? '#f3f4f6' : '#ffffff',
                  opacity: subscriptionStatus === 'loading' ? 0.7 : 1
                }}
              />
              <button
                type="submit"
                disabled={subscriptionStatus === 'loading' || !subscriptionEmail.trim()}
                style={{
                  backgroundColor: subscriptionStatus === 'loading' ? '#9ca3af' : '#4f46e5',
                  color: '#ffffff',
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: subscriptionStatus === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (subscriptionStatus !== 'loading') {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#4338ca';
                  }
                }}
                onMouseLeave={(e) => {
                  if (subscriptionStatus !== 'loading') {
                    (e.target as HTMLButtonElement).style.backgroundColor = '#4f46e5';
                  }
                }}
              >
                {subscriptionStatus === 'loading' ? 'Subscribing...' : 'Notify Me'}
              </button>
            </div>
          </form>
          {subscriptionMessage && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: subscriptionStatus === 'success' ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${subscriptionStatus === 'success' ? '#10b981' : '#ef4444'}`,
                color: subscriptionStatus === 'success' ? '#065f46' : '#dc2626',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {subscriptionMessage}
            </div>
          )}
          <p
            style={{
              color: '#9ca3af',
              fontSize: '0.875rem',
              marginTop: '16px'
            }}
          >
            No spam, just project updates. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section
        id="contact"
        style={{
          padding: '64px 24px',
          backgroundColor: '#ffffff'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '2.25rem',
              fontWeight: '700',
              textAlign: 'center',
              color: '#1f2937',
              marginBottom: '24px'
            }}
          >
            Ready to Hire or Partner?
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: '#6b7280',
              marginBottom: '48px',
              maxWidth: '600px',
              margin: '0 auto 48px auto',
              fontSize: '1.125rem',
              lineHeight: '1.6'
            }}
          >
            Seeking full-time data science roles or consulting partnerships. Let's discuss how my expertise in advanced analytics and machine learning can accelerate your organization's growth and innovation.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '32px',
              alignItems: 'start'
            }}
          >
            {/* Contact Info Card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                padding: '32px',
                borderRadius: '12px',
                color: '#ffffff'
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '24px'
                }}
              >
                Contact Information
              </h3>
              <p
                style={{
                  marginBottom: '24px',
                  lineHeight: '1.6',
                  opacity: '0.9'
                }}
              >
                Available for immediate hire or project collaboration. Let's discuss opportunities to work together.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <strong>Phone</strong>
                <p style={{ margin: '4px 0' }}>
                  <a
                    href="tel:+15551234567"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaPhone style={{ fontSize: '16px' }} />
                    (555) 123-4567
                  </a>
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong>Email</strong>
                <p style={{ margin: '4px 0' }}>
                  <a
                    href="mailto:gabrielleolukotun@gmail.com"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaEnvelope style={{ fontSize: '16px' }} />
                    gabrielleolukotun@gmail.com
                  </a>
                </p>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <strong>LinkedIn Profile</strong>
                <p style={{ margin: '4px 0' }}>
                  <a
                    href="https://www.linkedin.com/in/gabriel-mancillas-gallardo-4a962320b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaLinkedin style={{ fontSize: '16px', color: '#0077B5' }} />
                    LinkedIn Profile
                  </a>
                </p>
              </div>

              <div>
                <strong>GitHub Profile</strong>
                <p style={{ margin: '4px 0' }}>
                  <a
                    href="https://github.com/Gabeleo24"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#ffffff',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FaGithub style={{ fontSize: '16px' }} />
                    GitHub Profile
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '24px'
                }}
              >
                📧 Contact Me
              </h3>
              <p
                style={{
                  color: '#6b7280',
                  marginBottom: '24px',
                  lineHeight: '1.6'
                }}
              >
                Interested in hiring me or discussing a partnership? Let's connect!
              </p>

              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    htmlFor="fullName"
                    style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    disabled={isContactPending}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${contactState.errors?.name ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      backgroundColor: isContactPending ? '#f3f4f6' : '#ffffff',
                      opacity: isContactPending ? 0.7 : 1
                    }}
                    onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#4f46e5'}
                    onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = contactState.errors?.name ? '#ef4444' : '#d1d5db'}
                  />
                  {contactState.errors?.name && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                      {contactState.errors.name[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="emailAddress"
                    style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="emailAddress"
                    name="email"
                    type="email"
                    placeholder="john.doe@email.com"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    disabled={isContactPending}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${contactState.errors?.email ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                      backgroundColor: isContactPending ? '#f3f4f6' : '#ffffff',
                      opacity: isContactPending ? 0.7 : 1
                    }}
                    onFocus={(e) => (e.target as HTMLInputElement).style.borderColor = '#4f46e5'}
                    onBlur={(e) => (e.target as HTMLInputElement).style.borderColor = contactState.errors?.email ? '#ef4444' : '#d1d5db'}
                  />
                  {contactState.errors?.email && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                      {contactState.errors.email[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      color: '#374151',
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Hi! I'm interested in hiring you for... / Let's discuss a partnership for..."
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                    disabled={isContactPending}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${contactState.errors?.message ? '#ef4444' : '#d1d5db'}`,
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical',
                      transition: 'border-color 0.3s ease',
                      backgroundColor: isContactPending ? '#f3f4f6' : '#ffffff',
                      opacity: isContactPending ? 0.7 : 1
                    }}
                    onFocus={(e) => (e.target as HTMLTextAreaElement).style.borderColor = '#4f46e5'}
                    onBlur={(e) => (e.target as HTMLTextAreaElement).style.borderColor = contactState.errors?.message ? '#ef4444' : '#d1d5db'}
                  />
                  {contactState.errors?.message && (
                    <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '4px' }}>
                      {contactState.errors.message[0]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isContactPending}
                  style={{
                    backgroundColor: isContactPending ? '#9ca3af' : '#10b981',
                    color: '#ffffff',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    cursor: isContactPending ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.3s ease',
                    marginTop: '8px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isContactPending) {
                      (e.target as HTMLButtonElement).style.backgroundColor = '#059669';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isContactPending) {
                      (e.target as HTMLButtonElement).style.backgroundColor = '#10b981';
                    }
                  }}
                >
                  {isContactPending ? '✉️ Sending...' : '✉️ Send Message'}
                </button>

                {/* Contact form status message */}
                {contactState.message && (
                  <div
                    style={{
                      marginTop: '16px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      backgroundColor: contactState.success ? '#ecfdf5' : '#fef2f2',
                      border: `1px solid ${contactState.success ? '#10b981' : '#ef4444'}`,
                      color: contactState.success ? '#065f46' : '#dc2626',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    {contactState.message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Animated Hero Modal */}
      <AnimatedHeroModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
      />
    </div>
  );
};

export default ProjectShowcaseGrid;
