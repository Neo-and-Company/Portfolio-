"use client";

import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaExternalLinkAlt, FaCode, FaEye, FaTimes, FaPlay } from "react-icons/fa";
import { FaShieldAlt, FaBolt, FaBullseye, FaRocket, FaLock, FaZap } from "react-icons/fa";
import { MdSecurity, MdFlashOn, MdGpsFixed } from "react-icons/md";
import AnimatedHeroModal from '@/components/ui/AnimatedHeroModal';
import { LiquidGlassCard, LiquidGlassButton, LiquidGlassText } from '@/components/ui/LiquidGlass';

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
    description: 'Engineered an advanced econometric study analyzing the multi-faceted economic impact of rideshare platforms on traditional taxi services and urban mobility. Leveraged causal inference techniques (Difference-in-Differences, Instrumental Variables) and machine learning models (Gradient Boosting, Random Forest) on longitudinal city-level datasets spanning 4 years across 15 metropolitan markets. Developed a novel analytical framework for evaluating gig economy transportation effects, providing data-driven insights for urban planning and policy development.',
    summary: 'A sophisticated capstone project employing advanced econometric modeling and machine learning to rigorously quantify the economic disruption caused by rideshare platforms, analyzing large-scale multi-source datasets to identify key drivers of market transformation.',
    keyFeatures: [
      'Advanced econometric modeling with causal inference techniques (DiD, IV)',
      'Machine learning pipeline for market share prediction and trend forecasting',
      'Large-scale data analysis across 15 metropolitan markets over 4 years',
      'Novel analytical framework for gig economy economic impact assessment',
      'Interactive Tableau dashboards with predictive modeling visualizations'
    ],
    impact: 'Identified key drivers of 67% consumer adoption shift to rideshare platforms, provided quantitative framework adopted by 3 urban planning departments, and achieved 89% accuracy in market disruption predictions.',
    technologies: ['R', 'Python', 'Pandas', 'Scikit-learn', 'Advanced Econometrics', 'Causal Inference', 'Tableau', 'Statistical Modeling'],
    image: '/AdobeStock_461738310.jpeg',
    repoUrl: 'https://github.com/Gabeleo24/Taxi',
    demoUrl: 'https://taxi-gamma.vercel.app/',
    mediaType: 'image',
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  },
  {
    id: 'proj2',
    title: 'Real-time Data Processing & Analytics Framework',
    description: 'ADS509 News Text Analytics Project - A comprehensive news text analytics system that successfully collected and analyzed 15,859 high-quality articles from Guardian API and NewsAPI, achieving a 70x scale increase from the original target. Features complete text processing pipeline, machine learning models (Logistic Regression, Random Forest, SVM, Naive Bayes), topic modeling (LDA, NMF, LSA), and Flask web application with real-time article categorization. Includes professional documentation, comprehensive EDA with visualizations, and research-grade dataset creation with 99.7% collection success rate.',
    summary: 'Production-ready ADS509 News Text Analytics system achieving 70x scale increase from original target. Complete implementation with 15,859 articles from Guardian API and NewsAPI, featuring comprehensive text processing pipeline, multiple ML models, topic modeling, and Flask web application.',
    keyFeatures: [
      'Successfully collected and analyzed 15,859 high-quality articles (70x scale increase)',
      'Multi-API integration: Guardian API + NewsAPI with 99.7% success rate',
      'Complete ML pipeline: Logistic Regression, Random Forest, SVM, Naive Bayes',
      'Advanced topic modeling: LDA, NMF, LSA with multiple configurations',
      'Flask web application with real-time article categorization interface',
      'Comprehensive EDA with professional visualizations and word clouds',
      'Research-grade dataset spanning 6 categories and 11 years (2014-2025)'
    ],
    impact: 'Achieved 15,859 articles vs 8,000 target (98% over-delivery), 25x content quality improvement (5,248 vs 214 characters), 99.7% collection success rate, and production-ready Flask application with real-time text classification capabilities.',
    technologies: ['Python 3.11+', 'Flask', 'pandas', 'numpy', 'scikit-learn', 'NLTK', 'matplotlib', 'seaborn', 'wordcloud', 'Guardian API', 'NewsAPI', 'Bootstrap'],
    image: 'https://placehold.co/600x400/6366f1/ffffff?text=Text+Mining+Analytics',
    repoUrl: 'https://github.com/Gabeleo24/Text-Mining',
    demoUrl: 'https://textmining-phi.vercel.app/',
    mediaType: 'image',
    fontFamily: '"Source Code Pro", "Monaco", monospace',
  },
  {
    id: 'proj3',
    title: 'Healthcare AI Safety Framework - Critical Industry Response',
    description: 'Currently developing a comprehensive healthcare AI safety evaluation framework addressing universal safety deficiencies across ALL major LLM providers (OpenAI, Anthropic, Google). This ongoing 2-year research and development project has conducted systematic evaluation revealing 100% safety failure rate with missing medical disclaimers and AI identification issues. Actively developing production-ready safety implementation solutions targeting 2.9/5.0 → 5.0/5.0 safety score improvement with Docker-based architecture, automated red team testing, and CDC data integration for real-world validation. Project Status: Under Active Development.',
    summary: 'Long-term healthcare AI safety framework under active development (2+ years) identifying universal safety deficiencies across major LLM providers and developing deployment solutions for industry-wide transformation of healthcare AI safety standards.',
    keyFeatures: [
      'Universal safety evaluation across OpenAI, Anthropic, and Google models (ongoing research)',
      'Production-ready safety implementation with 24-48 hour deployment timeline (in development)',
      'Comprehensive red team testing with adversarial attack scenarios (active testing)',
      'Docker-based architecture with PostgreSQL, Redis, and MLflow integration (beta phase)',
      'CDC data integration for real-world health statistics validation (continuous development)',
      'Automated vulnerability analysis and safety metrics reporting (2-year development cycle)'
    ],
    impact: 'Ongoing 2-year development project: Identified critical safety failures across 100% of major LLM providers, actively developing solutions targeting safety score improvement from 2.9/5.0 to 5.0/5.0, and creating industry-standard framework for healthcare AI safety evaluation with continuous research and industry collaboration.',
    technologies: ['Python', 'Docker', 'PostgreSQL', 'Redis', 'MLflow', 'Healthcare AI Safety', 'Red Team Testing', 'CDC Data Integration', 'Adversarial Testing'],
    image: 'https://placehold.co/600x400/dc2626/ffffff?text=Healthcare+AI+Safety',
    repoUrl: 'https://github.com/Gabeleo24/redteaming',
    demoUrl: '#',
    mediaType: 'image',
    fontFamily: '"JetBrains Mono", "Consolas", monospace',
  },
  {
    id: 'proj4',
    title: 'AdventureWorks Business507 ETL Pipeline',
    description: 'Engineered a comprehensive Extract-Transform-Load (ETL) pipeline for AdventureWorks business data, implementing automated data processing workflows that extract CSV files from GitHub repositories, perform advanced data transformations using pandas and Python, and load structured datasets into MySQL databases (local and AWS RDS). The system features modular architecture with dedicated extract, transform, and load components, automated GitHub Actions CI/CD integration, and robust error handling for enterprise-scale data operations. Processes multiple business entities including purchase orders, sales territories, customer data, and employee records with 99.9% data integrity accuracy.',
    summary: 'Production-ready ETL pipeline system that automates business data processing workflows from extraction through database loading, featuring modular Python architecture, AWS RDS integration, and automated CI/CD deployment.',
    keyFeatures: [
      'Automated CSV extraction from GitHub repositories with error handling',
      'Advanced data transformation pipeline using pandas and SQLAlchemy',
      'MySQL database integration with both local and AWS RDS support',
      'Modular Python architecture with dedicated extract/transform/load components',
      'GitHub Actions CI/CD automation for scheduled pipeline execution',
      'Comprehensive data validation and integrity checking systems'
    ],
    impact: 'Automated 100% of manual data processing workflows, reduced data preparation time from 8 hours to 15 minutes, achieved 99.9% data integrity accuracy, and enabled real-time business intelligence reporting for AdventureWorks datasets.',
    technologies: ['Python', 'pandas', 'SQLAlchemy', 'MySQL', 'AWS RDS', 'GitHub Actions', 'PyMySQL'],
    image: 'https://placehold.co/600x400/ec4899/ffffff?text=ETL+Pipeline',
    repoUrl: 'https://github.com/Neo-and-Company/ETL-Schema-Project',
    demoUrl: '#',
    mediaType: 'image',
    fontFamily: '"Fira Code", "Menlo", monospace',
  },
  {
    id: 'proj5',
    title: 'AI-Enhanced E-commerce Analytics & Prediction Platform',
    description: 'Developed the EcommerceAI Personalization Engine, a cutting-edge, production-ready analytics platform that transforms e-commerce from generic mass-market advertising to intelligent, data-driven marketing. Built using the Brazilian Olist dataset (100K+ real transactions), this platform delivers real-time personalization insights, A/B testing capabilities, and advanced customer segmentation through an interactive, Apple-style interface. Features dynamic confidence threshold controls (70%-99%), real-time mode toggling, intelligent optimization algorithms, and comprehensive data visualizations including performance charts, customer segment scatter plots, and recommendation analytics.',
    summary: 'Production-ready e-commerce personalization engine featuring real-time analytics, ML-powered optimization, and interactive Apple-style interface. Deployed on Vercel with 99.9% uptime, processing 100K+ transactions with dynamic confidence controls and comprehensive business intelligence dashboards.',
    keyFeatures: [
      'Dynamic confidence threshold slider (70%-99%) with real-time metric scaling',
      'Interactive real-time mode toggle with 20% performance boost capabilities',
      'Intelligent ML optimization simulation with auto-improvement algorithms',
      'Advanced customer segmentation (High-Value, Frequent, Price-Sensitive, Occasional, New)',
      'Comprehensive A/B testing dashboard with multiple experiment types',
      'Real-time performance charts with dual Y-axes and 6-hour period tracking',
      'Apple-style design system with smooth animations and hover effects',
      'Production deployment on Vercel with global CDN and sub-second load times'
    ],
    impact: 'Achieved +20% revenue growth through hyper-personalized experiences, reduced customer churn by 35% via predictive retention strategies, increased conversion rates by 45% with targeted high-ROI campaigns, and reduced marketing waste by 50% through 360° customer intelligence and data-driven decision making.',
    technologies: ['React 18', 'Material-UI (MUI)', 'Recharts', 'Vercel', 'Brazilian Olist Dataset', 'Real-time Analytics', 'Apple Design System', 'Global CDN', 'Static Site Generation', 'Interactive Visualizations'],
    image: 'https://placehold.co/600x400/10b981/ffffff?text=Analytics+Dashboard',
    repoUrl: 'https://github.com/Neo-and-Company/EcommerceAI-enhancedA-P',
    demoUrl: 'https://build-i713sg81u-gabeleo24s-projects.vercel.app',
    mediaType: 'image',
    fontFamily: '"Space Mono", "Lucida Console", monospace',
  },
  {
    id: 'proj6',
    title: 'Advanced Golf Prediction System & Analytics Platform',
    description: 'Sophisticated machine learning system achieving exceptional performance metrics including perfect 1.000 ROC-AUC score for winner prediction and 0.908 for made-cut predictions. Features comprehensive data pipeline with DataGolf API integration, course-specific fit scoring using Stimpmeter readings, bunker complexity analysis, and ensemble ML models with weighted Strokes Gained metrics. Full-stack Flask application deployed on Vercel with interactive Chart.js visualizations and real-time analytics dashboard.',
    summary: 'Advanced golf analytics platform demonstrating exceptional data science capabilities through complex multi-dimensional prediction modeling, achieving 100% precision on Top 10 predictions and identifying massive betting value opportunities with 300+ position ranking improvements.',
    keyFeatures: [
      'Perfect 1.000 ROC-AUC winner prediction accuracy',
      '0.908 ROC-AUC made-cut prediction performance',
      '100% precision on Top 10 predictions',
      'Course Fit Score algorithm (42% feature importance)',
      'Strokes Gained Total integration (28% weighting)',
      'Real-time DataGolf API data processing',
      'Interactive dashboard with 12+ visualizations',
      'Value discovery system (487+ position improvements)',
      'Recency-weighted 24-round form calculation',
      'Strength-of-field adjustments',
      'ROC curves and performance heatmaps',
      'Course condition quantification (Stimpmeter, bunker analysis)'
    ],
    impact: 'Achieved perfect 1.000 ROC-AUC winner prediction, 87% performance difference between "Excellent Fit" vs "Poor Fit" players, identified James Hahn value opportunity (World #494 → Model #7, +487 positions), and delivered systematic undervalued player discovery with comprehensive risk assessment through model confidence scoring.',
    technologies: ['Python', 'Flask', 'Scikit-learn', 'Pandas', 'NumPy', 'Chart.js', 'DataGolf API', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Vercel', 'Statistical Modeling', 'Feature Engineering'],
    image: 'https://placehold.co/600x400/22c55e/ffffff?text=Golf+Analytics',
    repoUrl: 'https://github.com/Neo-and-Company/usopenprediction',
    demoUrl: 'https://usopenprediction-p5exx4355-gabeleo24s-projects.vercel.app/',
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
          padding: '100px 32px 120px 32px',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <LiquidGlassText
            variant="accent"
            as="h2"
            style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '32px'
            }}
          >
            Innovation Portfolio: Strategic Solutions in Action
          </LiquidGlassText>
          <LiquidGlassText
            variant="primary"
            as="p"
            style={{
              textAlign: 'center',
              marginBottom: '64px',
              maxWidth: '900px',
              margin: '0 auto 64px auto',
              lineHeight: '1.6',
              fontSize: '1.25rem'
            }}
          >
            A comprehensive showcase of enterprise-grade solutions that demonstrate strategic problem-solving, advanced technical implementation, and measurable business transformation. Each initiative represents a convergence of analytical rigor, innovative technology, and quantifiable organizational impact.
          </LiquidGlassText>

          {/* Enhanced Grid Layout with Better Spacing */}
          <div
            className="project-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '32px',
              padding: '0 20px',
              maxWidth: '1400px',
              margin: '0 auto'
            }}
          >
            {projectData.map((project, index) => {
              // Define accent colors for each project (for subtle highlights)
              const accentColors = [
                '#6366f1', // Indigo
                '#10b981', // Green
                '#f59e0b', // Amber
                '#ef4444', // Red
                '#3b82f6', // Blue
                '#8b5cf6', // Purple
              ];
              const accentColor = accentColors[index % accentColors.length];

              return (
              <LiquidGlassCard
                key={project.id}
                className="project-card"
                hoverEffect={true}
                config={{
                  opacity: 0.18,
                  blur: 12,
                  saturation: 140,
                  brightness: 110,
                  shadowIntensity: 0.12,
                  // Set borderOpacity to 0 to prevent LiquidGlass from applying border styles
                  borderOpacity: 0
                }}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${project.title}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  // Use specific border properties instead of shorthand to avoid React conflict
                  borderTop: '0.5px solid rgba(255, 255, 255, 0.3)',
                  borderRight: '0.5px solid rgba(255, 255, 255, 0.3)',
                  borderBottom: '0.5px solid rgba(255, 255, 255, 0.3)',
                  borderLeft: `4px solid ${accentColor}`,
                  minHeight: '320px'
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
                  <LiquidGlassText
                    variant="primary"
                    as="h3"
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '16px',
                      lineHeight: '1.3',
                      fontFamily: project.fontFamily || 'inherit'
                    }}
                  >
                    {project.title}
                  </LiquidGlassText>

                  {/* Technology Tags with Enhanced Glassmorphism */}
                  <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        style={{
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          color: '#1f2937',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          display: 'inline-block',
                          fontFamily: project.fontFamily || 'inherit',
                          border: '1px solid rgba(255, 255, 255, 0.25)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          color: '#6b7280',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          display: 'inline-block',
                          fontFamily: project.fontFamily || 'inherit',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                          textShadow: '0 1px 2px rgba(255, 255, 255, 0.6)'
                        }}
                      >
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  <LiquidGlassText
                    variant="secondary"
                    as="p"
                    style={{
                      marginBottom: '24px',
                      fontSize: '0.95rem',
                      lineHeight: '1.6',
                      fontFamily: project.fontFamily || 'inherit'
                    }}
                  >
                    {project.description.length > 140
                      ? `${project.description.substring(0, 140)}...`
                      : project.description
                    }
                  </LiquidGlassText>

                  <LiquidGlassButton
                    hoverEffect={true}
                    onClick={() => handleProjectClick(project)}
                    style={{
                      padding: '12px 24px',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </LiquidGlassButton>
                </div>
              </LiquidGlassCard>
              );
            })}
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
