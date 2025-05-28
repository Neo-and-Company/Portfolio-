"use client";

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt, FaCode, FaEye, FaTimes, FaPlay } from "react-icons/fa";
import { FaShieldAlt, FaBolt, FaBullseye, FaRocket, FaLock, FaZap } from "react-icons/fa";
import { MdSecurity, MdFlashOn, MdGpsFixed } from "react-icons/md";
import AnimatedHeroModal from '@/components/ui/AnimatedHeroModal';

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

const ProjectShowcaseGrid: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);

  // Email subscription state
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionPhone, setSubscriptionPhone] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [subscriptionMessage, setSubscriptionMessage] = useState('');

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
    if (!subscriptionEmail.trim() || !subscriptionPhone.trim()) return;

    setSubscriptionStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: subscriptionEmail,
          phone: subscriptionPhone
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubscriptionStatus('success');
        setSubscriptionMessage(data.message);
        setSubscriptionEmail('');
        setSubscriptionPhone('');

        // Log success for debugging
        console.log('✅ Email subscription successful:', {
          email: subscriptionEmail,
          phone: subscriptionPhone,
          subscriptionId: data.subscriptionId,
          alreadySubscribed: data.alreadySubscribed
        });
      } else {
        setSubscriptionStatus('error');
        setSubscriptionMessage(data.error || 'Something went wrong. Please try again.');

        // Log error for debugging
        console.error('❌ Email subscription failed:', data.error);
      }
    } catch (error) {
      setSubscriptionStatus('error');
      setSubscriptionMessage('Network error. Please check your connection and try again.');

      // Log network error for debugging
      console.error('❌ Network error during subscription:', error);
    }
  };


  return (
    <div
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        backgroundColor: '#f8fafc', /* gray-50 */
        minHeight: '100vh'
      }}
    >


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

      {/* Professional Network Section - Aligned with Portfolio Design System */}
      <section
        id="network"
        className="w-full py-28 md:py-40 relative z-10 section-fade-in bg-background"
        style={{
          backgroundImage: 'url("/AdobeStock_432194964.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container mx-auto px-6 md:px-8 max-w-screen-xl">
          <div className="text-center relative z-10">
            {/* Icon with Portfolio Design Consistency */}
            <div
              className="w-24 h-24 mx-auto mb-12 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                backgroundColor: 'hsl(var(--card))',
                border: '2px solid hsl(var(--primary))',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
              }}
            >
              <FaRocket
                style={{
                  fontSize: '2.5rem',
                  color: 'hsl(var(--primary))'
                }}
              />
            </div>

            {/* Typography aligned with portfolio standards */}
            <h2 className="text-5xl font-bold sm:text-6xl md:text-7xl text-center mb-8 text-foreground font-mono">
              Ready to Transform Data into{' '}
              <span style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Impact?
              </span>
            </h2>

            {/* Divider consistent with other sections */}
            <div className="h-2 w-48 bg-primary mx-auto mb-20 rounded-full"></div>

            {/* Description with Card styling consistent with portfolio */}
            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-sm border border-gray-100 max-w-4xl mx-auto mb-16">
              <p className="text-slate-800 font-mono text-xl leading-relaxed text-center">
                Join an exclusive network of forward-thinking leaders, innovative companies, and strategic partners.
                Get priority access to collaboration opportunities, cutting-edge insights, and transformative data science solutions.
              </p>
              <p className="text-slate-600 font-mono text-lg leading-relaxed text-center mt-4">
                📞 <strong>Phone number required</strong> - I may call directly for time-sensitive opportunities and high-value partnerships.
              </p>
            </div>

            {/* Form with Portfolio Design Consistency */}
            <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto mb-16">
              <form onSubmit={handleEmailSubscription} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your professional email"
                    value={subscriptionEmail}
                    onChange={(e) => setSubscriptionEmail(e.target.value)}
                    required
                    disabled={subscriptionStatus === 'loading'}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 text-lg font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
                    style={{
                      opacity: subscriptionStatus === 'loading' ? 0.7 : 1
                    }}
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter your phone number (e.g., +1 555 123 4567)"
                    value={subscriptionPhone}
                    onChange={(e) => setSubscriptionPhone(e.target.value)}
                    required
                    disabled={subscriptionStatus === 'loading'}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 text-lg font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 ease-in-out"
                    style={{
                      opacity: subscriptionStatus === 'loading' ? 0.7 : 1
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={subscriptionStatus === 'loading' || !subscriptionEmail.trim() || !subscriptionPhone.trim()}
                  className={`w-full px-10 py-5 rounded-xl font-semibold transition-all duration-300 ease-in-out text-lg font-mono flex items-center justify-center gap-3 ${
                    subscriptionStatus === 'loading'
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-slate-800 hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                  style={{
                    color: '#ffffff !important',
                    textShadow: 'none !important'
                  }}
                >
                  {subscriptionStatus === 'loading' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                        Joining Network...
                      </span>
                    </>
                  ) : (
                    <>
                      <MdGpsFixed
                        className="text-xl"
                        style={{ color: '#ffffff !important' }}
                      />
                      <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                        Join Professional Network
                      </span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Status Message with Portfolio Styling */}
            {subscriptionMessage && (
              <div className={`mt-6 p-4 rounded-xl font-mono text-center ${
                subscriptionStatus === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {subscriptionMessage}
              </div>
            )}

            {/* Trust Indicators with Portfolio Card Design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <MdSecurity className="text-3xl text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-mono mb-2">
                      Privacy Protected
                    </h3>
                    <p className="text-slate-600 font-mono">
                      Your data is completely secure
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                    <MdFlashOn className="text-3xl text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-mono mb-2">
                      Instant Access
                    </h3>
                    <p className="text-slate-600 font-mono">
                      Join the network immediately
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ease-in-out hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                    <MdGpsFixed className="text-3xl text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary font-mono mb-2">
                      Exclusive Opportunities
                    </h3>
                    <p className="text-slate-600 font-mono">
                      Premium access to partnerships
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Text with Portfolio Styling */}
            <div className="text-center mt-16">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 inline-block">
                <p className="font-mono text-lg">
                  <span className="font-bold text-primary">
                    Join 500+ industry leaders
                  </span>
                  <br />
                  <span className="text-slate-500 text-sm">
                    Unsubscribe anytime • No spam, ever • Premium insights only
                  </span>
                </p>
              </div>
            </div>

            {/* Email Validation Disclaimer - Small Print - Cross-Platform Responsive */}
            <div className="text-center mt-6 sm:mt-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-4 sm:px-6">
              <p
                className="font-mono text-xs sm:text-xs md:text-sm leading-relaxed sm:leading-relaxed md:leading-loose break-words hyphens-auto"
                style={{
                  color: '#ffffff !important',
                  textShadow: 'none !important',
                  fontWeight: 'normal !important',
                  textDecoration: 'none !important',
                  fontStyle: 'normal !important',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                  lineHeight: '1.6',
                  fontSize: 'clamp(10px, 2vw, 14px)'
                }}
              >
                Email Validation Notice: This portfolio uses a custom email API. Email addresses must be 100% accurate and correctly formatted for successful delivery. Please ensure: (1) Email addresses are spelled correctly with no typos, (2) Email format follows standard conventions (e.g., user@domain.com), (3) The domain exists and can receive emails, (4) There are no extra spaces or special characters. This custom-built system may be more sensitive to formatting errors than commercial email services. Please double-check email addresses before submitting forms to ensure successful delivery.
              </p>
            </div>
          </div>
        </div>

        {/* CSS Animation for loading spinner */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
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
