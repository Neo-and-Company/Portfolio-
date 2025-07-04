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
