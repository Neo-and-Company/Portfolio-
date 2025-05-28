

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';

// --- Type Definitions ---
interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  image: string; // Mapped from imageUrl
  repoUrl?: string;
  demoUrl?: string;
  mediaType?: string;
  imageUrls?: string[];
  // New fields for detailed view
  detailedDescription?: string;
  keyFeatures?: string[];
  challenges?: {
    challenge: string;
    solution: string;
  }[];
  accomplishments?: string[];
}

interface VideoOverlayProps {
  titleLeft: string;
  descLeft: string;
  titleRight: string;
  descRight: string;
}

// --- Project Data (Updated with user's provided data) ---
const projectData: Project[] = [
  {
    id: 'proj1',
    title: 'Financial Analysis of Transportation Trends (Capstone)',
    description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
    technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
    image: '/AdobeStock_461738310.jpeg', // Was imageUrl
    repoUrl: 'https://github.com',
    demoUrl: '#',
    mediaType: 'image', // Added based on user data structure
  },
  {
    id: 'proj2',
    title: 'Stock Price Forecasting (NVIDIA) & Lemon Quality Testing',
    description: 'Designed and deployed a stock price forecasting model using Amazon SageMaker’s DeepAR. Leveraged historical market data and technical indicators for improved prediction accuracy. Additionally, developed an image classification model on SageMaker for assessing lemon quality via visual inspection, demonstrating versatility in applying ML to diverse problem domains. Achieved 94% F-1 Score for stock forecasting.',
    technologies: ['Python', 'AWS SageMaker', 'DeepAR', 'TensorFlow', 'Scikit-learn', 'Time Series Analysis', 'Image Classification', 'Computer Vision'],
    image: 'public/AdobeStock_552748421.jpeg', // Was imageUrl
    repoUrl: 'https://github.com',
    mediaType: 'rotating-images',
    imageUrls: ['public/AdobeStock_589427987.jpeg', 'public/AdobeStock_589427987.jpeg'],
  },
  {
    id: 'proj3',
    title: 'ETL Schema and Pipeline (AWS RDS)',
    description: 'Built a robust ETL data pipeline using Python and AWS RDS/MySQL, featuring schema design, database optimization, and automated reporting. Implemented AWS security (IAM, RDS Proxy, Secrets Manager) for secure, scalable data handling.',
    technologies: ['Python', 'AWS RDS', 'MySQL', 'ETL', 'IAM', 'AWS Secrets Manager', 'Database Optimization'],
    image: '/AdobeStock_1476792681.jpeg', // Was imageUrl
    repoUrl: 'https://github.com/Neo-and-Company/ETL-Schema-Project',
    mediaType: 'image',
  },
  {
    id: 'proj4',
    title: 'EM3 Wedding Services: Data-Driven Insights Platform',
    description: "Engineered a sophisticated ETL pipeline and data analytics framework for EM3 Wedding Services, a premier provider in the wedding industry. This platform ingests, transforms, and models heterogeneous data sources encompassing client engagement, service utilization, and market dynamics. Leveraged advanced data science techniques for predictive analytics, customer segmentation, and operational optimization. The robust data engineering backbone ensures data quality, scalability, and facilitates comprehensive business intelligence, empowering EM3 to enhance service personalization and strategic decision-making.",
    technologies: ['Python', 'SQL', 'ETL Pipelines', 'Data Modeling', 'Data Warehousing', 'Business Intelligence', 'Predictive Analytics', 'Cloud Data Platforms'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
    repoUrl: 'https://github.com/Neo-and-Company/Dove',
    demoUrl: '#',
    mediaType: 'image',
  },
  {
    id: 'proj5',
    title: 'Portfolio Optimization & Algorithmic Trading Engine',
    description: "Developed a comprehensive financial engineering system that combines portfolio optimization with algorithmic trading capabilities. The system employs modern portfolio theory, factor models, and machine learning to construct optimal portfolios and execute trades based on quantitative signals.",
    technologies: ['Python', 'NumPy', 'pandas', 'scikit-learn', 'PyTorch', 'Financial APIs', 'Quantitative Finance', 'Machine Learning', 'Time Series Analysis'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
    repoUrl: 'https://github.com/Gabeleo24/Portfolio-Optimization-Algorithmic-Trading-Engine',
    demoUrl: '#',
    mediaType: 'image',
  },
  {
    id: 'proj6',
    title: 'Automated Knowledge Discovery & Insight Platform',
    description: "Architected and implemented an end-to-end platform for automated knowledge discovery from unstructured and semi-structured data sources. This system employs advanced NLP techniques for entity recognition, relation extraction, and sentiment analysis. It features a data augmentation pipeline to enrich datasets and a machine learning core to identify hidden patterns, anomalies, and predictive insights. The extracted knowledge is structured into a dynamic knowledge graph, enabling complex queries and visualizations for strategic decision support. Focus on scalability and real-time processing of diverse data streams.",
    technologies: ['Python', 'spaCy', 'NLTK', 'Transformers (Hugging Face)', 'Elasticsearch', 'Neo4j', 'Airflow', 'LLM APIs', 'Knowledge Graphs', 'Information Retrieval'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
    repoUrl: 'https://github.com/Gabeleo24/Automated-Knowledge-Discovery-Insight-Platform',
    mediaType: 'image',
  },
  {
    id: 'proj7',
    title: 'Real-time Data Processing & Analytics Framework',
    description: "Designed and implemented a high-throughput, fault-tolerant data processing framework capable of ingesting and analyzing streaming data at scale. The system incorporates a lambda architecture with both batch and stream processing capabilities, enabling real-time analytics alongside historical data analysis. Features include automated data quality monitoring, schema evolution handling, and a flexible transformation layer that supports both SQL and programmatic interfaces. Implemented comprehensive observability with metrics, logging, and tracing to ensure system reliability and performance optimization.",
    technologies: ['Apache Kafka', 'Apache Spark', 'Apache Flink', 'Kubernetes', 'Prometheus', 'Grafana', 'Delta Lake', 'dbt', 'Python', 'Scala', 'Terraform', 'AWS/GCP'],
    image: 'https://placehold.co/600x400.png',
    repoUrl: 'https://github.com/Gabeleo24/Real-time-Data-Processing-Framework',
    demoUrl: 'https://data-framework-demo.example.com',
    mediaType: 'image',
  },
  {
    id: 'proj8',
    title: 'Multimodal Healthcare Analytics Platform',
    description: "Developed a comprehensive analytics platform for healthcare data that integrates and analyzes diverse data modalities including structured EHR records, medical imaging, genomic sequences, and unstructured clinical notes. The platform implements privacy-preserving federated learning techniques to enable collaborative model training across multiple healthcare institutions without compromising patient data privacy. Key features include automated medical image analysis, clinical text mining, predictive modeling for patient outcomes, and interactive dashboards for clinical decision support. The system adheres to HIPAA compliance requirements and implements robust data governance protocols.",
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'DICOM Processing', 'NLP', 'Federated Learning', 'Differential Privacy', 'Bioinformatics Tools', 'SQL/NoSQL Databases', 'React', 'FastAPI', 'Docker'],
    image: 'https://placehold.co/600x400.png',
    repoUrl: 'https://github.com/Gabeleo24/Healthcare-Analytics-Platform',
    demoUrl: 'https://healthcare-analytics-demo.example.com',
    mediaType: 'rotating-images',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
  },
];

// --- Global Styles (for elements hard to style with Tailwind alone) ---
const GlobalStyles = () => (
  <style>{`
    body {
        font-family: var(--font-geist-mono), monospace;
        background-color: #111112;
        color: #f5f5f7;
    }
    .projects-range-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        max-width: 400px;
        height: 6px;
        background: #333;
        border-radius: 8px;
        outline: none;
        opacity: 0.8;
        transition: all 0.3s ease;
        margin-top: 1.5rem;
    }
    .projects-range-slider:hover {
        opacity: 1;
        height: 8px;
    }
    .projects-range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 22px;
        height: 22px;
        background: linear-gradient(135deg, #0071e3, #42a5f5);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid #111112;
        box-shadow: 0 0 8px rgba(0, 113, 227, 0.5);
        transition: all 0.2s ease;
    }
    .projects-range-slider::-webkit-slider-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 0 12px rgba(0, 113, 227, 0.7);
    }
    .projects-range-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #0071e3, #42a5f5);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid #111112;
        box-shadow: 0 0 8px rgba(0, 113, 227, 0.5);
        transition: all 0.2s ease;
    }
    .projects-range-slider::-moz-range-thumb:hover {
        transform: scale(1.1);
        box-shadow: 0 0 12px rgba(0, 113, 227, 0.7);
    }

    /* Add a track progress indicator */
    .slider-container {
        position: relative;
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }
    .slider-progress {
        position: absolute;
        height: 6px;
        background: linear-gradient(to right, #0071e3, #42a5f5);
        border-radius: 8px;
        top: calc(50% - 3px);
        left: 0;
        pointer-events: none;
        transition: width 0.1s ease;
    }
    .video-placeholder {
        position: relative;
        width: 100%;
        height: auto;
        min-height: 600px; /* Increased minimum height for more space */
        background-color: transparent;
        border-radius: 12px;
        overflow: visible;
        margin-bottom: 2rem; /* Increased margin for better separation */
        padding: 0;
        display: flex;
        flex-direction: column;
    }

    /* Override for financial analysis container specifically */
    .financial-analysis-container.video-placeholder {
        height: auto;
        min-height: 700px; /* Even larger minimum height for demo content */
        padding: 2rem 0; /* Add vertical padding for better spacing */
        overflow: visible;
        background-color: transparent;
        gap: 2rem; /* Add gap between demo content and overlay */
    }

    /* Fallback styling for projects without demo content */
    .video-placeholder:not(.financial-analysis-container) {
        min-height: 400px; /* Smaller height for projects without demo content */
        background: linear-gradient(135deg, rgba(15, 15, 20, 0.8), rgba(30, 30, 35, 0.6));
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Ensure overlay is always visible */
    .video-placeholder .video-overlay-container {
        margin-top: auto;
        flex-shrink: 0; /* Prevent shrinking */
    }

    /* Apple-Style Projects Slider Container */
    .projects-slider-container {
        position: relative;
        width: 100%;
        max-width: 100vw;
        margin: 0 auto;
        overflow: hidden;
        padding: 0 3rem; /* Increased padding for better spacing */
        background: transparent;
    }

    /* Responsive container sizing with Apple-like proportions */
    @media (min-width: 640px) {
        .projects-slider-container {
            max-width: calc(100vw - 6rem);
            padding: 0 4rem;
        }
    }

    @media (min-width: 1024px) {
        .projects-slider-container {
            max-width: 1400px; /* Increased max width */
            padding: 0 6rem;
        }
    }

    @media (min-width: 1400px) {
        .projects-slider-container {
            max-width: 1600px; /* Even larger for big screens */
            padding: 0 8rem;
        }
    }

    /* Apple-Style Projects Track with Smooth Physics */
    .projects-track {
        display: flex;
        gap: 2rem; /* Increased gap for Apple-like spacing */
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); /* Apple's signature easing */
        padding: 2rem 0; /* Increased vertical padding */
        will-change: transform;
        cursor: grab;
        user-select: none; /* Prevent text selection during drag */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }

    .projects-track:active {
        cursor: grabbing;
    }

    /* Apple-style momentum and physics during auto-scroll */
    .projects-track.auto-scrolling {
        transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Smoother auto-scroll */
    }

    /* Enhanced dragging state */
    .projects-track.dragging {
        transition: none !important; /* Immediate response during drag */
        cursor: grabbing;
    }

    .projects-track.dragging .project-item {
        pointer-events: none; /* Prevent clicks during drag */
    }

    /* Manual mode visual feedback */
    .projects-track.manual-mode {
        cursor: grab;
        position: relative;
    }

    .projects-track.manual-mode::before {
        content: 'Manual Mode - Double-tap to exit';
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 113, 227, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        z-index: 20;
        pointer-events: none;
        opacity: 0.8;
        animation: fadeInManualMode 0.3s ease-out;
    }

    @keyframes fadeInManualMode {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
        }
        to {
            opacity: 0.8;
            transform: translateX(-50%) translateY(0);
        }
    }

    /* Subtle Apple-Style Left Fade Gradient */
    .projects-slider-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100px; /* Reduced for more subtle effect */
        height: 100%;
        background: linear-gradient(
            to right,
            rgba(17, 17, 18, 0.95) 0%,
            rgba(17, 17, 18, 0.6) 40%,
            rgba(17, 17, 18, 0) 100%
        );
        z-index: 10;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    /* Subtle Apple-Style Right Fade Gradient */
    .projects-slider-container::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 100px; /* Reduced for more subtle effect */
        height: 100%;
        background: linear-gradient(
            to left,
            rgba(17, 17, 18, 0.95) 0%,
            rgba(17, 17, 18, 0.6) 40%,
            rgba(17, 17, 18, 0) 100%
        );
        z-index: 10;
        pointer-events: none;
        transition: opacity 0.3s ease;
    }

    /* Responsive fade widths - more subtle */
    @media (max-width: 640px) {
        .projects-slider-container::before,
        .projects-slider-container::after {
            width: 60px;
        }
    }

    @media (min-width: 1024px) {
        .projects-slider-container::before,
        .projects-slider-container::after {
            width: 120px;
        }
    }
    /* Apple-Style Project Items with Enhanced Dimensions */
    .project-item {
        flex: 0 0 auto;
        width: 380px; /* Increased width for Apple-like proportions */
        background-color: #1d1d1f;
        border-radius: 24px; /* Larger border radius like Apple */
        overflow: hidden;
        cursor: pointer;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); /* Apple's signature easing */
        box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.08);
        position: relative;
        backdrop-filter: blur(20px);
        transform: scale(1);
    }

    .project-item:hover {
        transform: translateY(-6px) scale(1.015); /* Subtle Apple-like hover */
        box-shadow:
            0 16px 48px rgba(0, 0, 0, 0.18),
            0 6px 20px rgba(0, 0, 0, 0.12),
            0 2px 8px rgba(0, 0, 0, 0.06);
        border-color: rgba(255, 255, 255, 0.12);
    }

    /* Apple-Style Responsive Project Item Sizing */
    @media (max-width: 640px) {
        .project-item {
            width: 300px; /* Larger on mobile for better touch targets */
            border-radius: 20px;
        }
    }

    @media (min-width: 768px) {
        .project-item {
            width: 360px;
            border-radius: 22px;
        }
    }

    @media (min-width: 1024px) {
        .project-item {
            width: 400px; /* Even larger for desktop */
            border-radius: 24px;
        }
    }

    @media (min-width: 1400px) {
        .project-item {
            width: 420px; /* Maximum size for large screens */
            border-radius: 26px;
        }
    }
    /* Apple-Style Project Item Content */
    .project-item img {
        width: 100%;
        height: 240px; /* Increased height for better proportions */
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    .project-item:hover img {
        transform: scale(1.03); /* More subtle image scaling */
    }

    .project-item h4 {
        padding: 1.5rem 1.5rem 0.75rem; /* Increased padding for spaciousness */
        font-size: 1.25rem; /* Slightly larger font */
        font-weight: 700; /* Increased font weight for better readability */
        font-family: var(--font-geist-mono), monospace;
        color: #1a1a1a; /* Dark text for better contrast against bright background */
        line-height: 1.25; /* Tighter line height for Apple-like typography */
        letter-spacing: -0.01em; /* Subtle letter spacing */
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8); /* White text shadow for readability */
    }

    .project-item p {
        padding: 0 1.5rem 1.5rem; /* Increased padding */
        font-size: 1rem; /* Slightly larger description text */
        color: #374151; /* Dark gray for better readability */
        font-family: var(--font-geist-mono), monospace;
        line-height: 1.4;
        letter-spacing: -0.005em;
        font-weight: 500; /* Slightly bolder for better visibility */
        text-shadow: 0 1px 2px rgba(255, 255, 255, 0.6); /* Subtle text shadow */
    }

    /* Apple-Style Responsive Content Sizing */
    @media (max-width: 640px) {
        .project-item img {
            height: 200px; /* Larger on mobile */
        }

        .project-item h4 {
            padding: 1.25rem 1.25rem 0.5rem;
            font-size: 1.15rem; /* Larger mobile text */
            line-height: 1.2;
        }

        .project-item p {
            padding: 0 1.25rem 1.25rem;
            font-size: 0.95rem;
        }
    }

    @media (min-width: 768px) {
        .project-item img {
            height: 260px; /* Increased for tablet */
        }

        .project-item h4 {
            font-size: 1.3rem;
            padding: 1.75rem 1.75rem 0.75rem;
        }

        .project-item p {
            font-size: 1.05rem;
            padding: 0 1.75rem 1.75rem;
        }
    }

    @media (min-width: 1024px) {
        .project-item img {
            height: 280px; /* Even larger for desktop */
        }

        .project-item h4 {
            font-size: 1.4rem; /* Larger desktop text */
            padding: 2rem 2rem 0.75rem;
        }

        .project-item p {
            font-size: 1.1rem;
            padding: 0 2rem 2rem;
        }
    }
    .highlight-link {
        color: #0071e3;
        text-decoration: none;
        font-weight: 500;
        transition: color 0.2s;
        font-family: var(--font-geist-mono), monospace;
    }
    .highlight-link:hover {
        color: #0077ed;
        text-decoration: underline;
    }
    .dim-text {
        color: #86868b;
    }
    .gemini-feature-btn {
        background: linear-gradient(135deg, #0071e3, #42a5f5);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 30px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3);
    }
    .gemini-feature-btn:hover {
        background: linear-gradient(135deg, #0077ed, #64b5f6);
        box-shadow: 0 6px 16px rgba(0, 113, 227, 0.4);
        transform: translateY(-2px);
    }
    /* Video overlay container - positioned at bottom of container */
    .video-overlay-container {
        position: relative;
        width: 100%;
        min-height: 140px; /* Increased for better spacing */
        margin-top: auto; /* Push to bottom of flex container */
        padding: 2.5rem; /* Increased padding for more spacious feel */
        background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.5), rgba(0,0,0,0.1));
        border-radius: 0 0 12px 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 3rem; /* Increased gap for better separation */
        backdrop-filter: blur(8px); /* Add subtle blur effect */
        border-top: 1px solid rgba(255,255,255,0.1); /* Subtle separator */
    }

    .video-text-overlay {
        position: relative; /* Changed from absolute to relative */
        color: white;
        z-index: 10;
        text-shadow: 0 3px 6px rgba(0,0,0,0.8); /* Enhanced text shadow for better readability */
        flex: 1; /* Allow flexible sizing */
        max-width: 45%;
        padding: 1.5rem 0; /* Increased vertical padding for better spacing */
        min-height: 120px; /* Increased minimum height to accommodate longer content */
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Changed to flex-start to allow content to flow naturally */
        overflow-y: auto; /* Allow scrolling if content is too long */
        max-height: 400px; /* Set maximum height to prevent overlay from becoming too large */
    }
    .video-text-overlay-left {
        text-align: left;
        padding-right: 1.5rem; /* Increased padding for better separation */
    }
    .video-text-overlay-right {
        text-align: right;
        padding-left: 1.5rem; /* Increased padding for better separation */
    }

    /* Responsive adjustments for overlay text */
    @media (max-width: 768px) {
        .video-text-overlay {
            max-width: 100%; /* Full width on mobile */
            padding: 1rem 0;
            min-height: 100px;
            max-height: 300px; /* Reduced max height on mobile */
        }
        .video-text-overlay-left,
        .video-text-overlay-right {
            padding-left: 1rem;
            padding-right: 1rem;
            text-align: left; /* Left align both on mobile for better readability */
        }
        .video-text-overlay p {
            font-size: 1rem; /* Slightly smaller on mobile */
            line-height: 1.5;
        }
        .video-text-overlay h3 {
            font-size: 1.4rem; /* Smaller title on mobile */
        }
    }

    @media (max-width: 480px) {
        .video-text-overlay p {
            font-size: 0.9rem; /* Even smaller on very small screens */
        }
        .video-text-overlay h3 {
            font-size: 1.2rem;
        }
    }
    .video-text-overlay h3 {
        font-size: 1.6rem; /* Further increased for better visibility */
        font-weight: 700; /* Bolder font weight for better contrast */
        margin-bottom: 1rem; /* Increased margin for better separation */
        font-family: var(--font-geist-mono), monospace;
        line-height: 1.2; /* Tighter line height for titles */
        letter-spacing: -0.02em; /* Slight negative letter spacing for modern look */
    }
    .video-text-overlay p {
        font-size: 1.1rem; /* Further increased for better readability */
        color: #c0c0c0; /* Even lighter color for better contrast */
        font-family: var(--font-geist-mono), monospace;
        line-height: 1.6; /* Increased line height for better readability of longer text */
        margin: 0; /* Remove default margins */
        opacity: 0.9; /* Slight transparency for hierarchy */
        white-space: pre-line; /* Preserve line breaks from \n characters */
        word-wrap: break-word; /* Ensure long words break properly */
        overflow-wrap: break-word; /* Additional word breaking support */
    }
    /* Apple-Style Active Project Styling */
    .project-item.active-project {
        transform: translateY(-4px) scale(1.02); /* Subtle active scaling */
        box-shadow:
            0 12px 40px rgba(255, 255, 255, 0.08),
            0 6px 20px rgba(0, 0, 0, 0.15),
            0 2px 8px rgba(0, 0, 0, 0.1);
        border-color: rgba(255, 255, 255, 0.15); /* Subtle white border */
        background-color: #1f1f21; /* Slightly lighter background */
    }

    /* Apple-style depth effect during auto-scroll */
    .projects-track.auto-scrolling .project-item {
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .projects-track.auto-scrolling .project-item.active-project {
        transform: translateY(-8px) scale(1.05); /* More pronounced during auto-scroll */
        z-index: 10;
    }

    /* Smooth transitions during drag */
    .projects-track.dragging .project-item {
        transition: transform 0.1s ease-out;
    }

    /* Apple-style parallax effect for non-active items during movement */
    .projects-track.auto-scrolling .project-item:not(.active-project) {
        transform: scale(0.95);
        opacity: 0.8;
    }

    /* User-selected project styling - more prominent */
    .project-item.user-selected {
        transform: translateY(-6px) scale(1.03) !important;
        box-shadow:
            0 16px 48px rgba(255, 255, 255, 0.12),
            0 8px 24px rgba(0, 0, 0, 0.18),
            0 4px 12px rgba(0, 0, 0, 0.12);
        border-color: rgba(255, 255, 255, 0.2);
        background-color: #212123;
        z-index: 15;
    }

    .project-item.user-selected::before {
        opacity: 1;
        transform: scale(1.01);
        background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.15) 100%);
    }

    .project-item.active-project::before {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 100%);
        border-radius: 26px; /* Match the increased border radius */
        z-index: -1;
        opacity: 0.8;
        animation: subtleGlow 3s ease-in-out infinite alternate;
    }

    @keyframes subtleGlow {
        0% {
            opacity: 0.6;
            transform: scale(1);
        }
        100% {
            opacity: 0.9;
            transform: scale(1.005);
        }
    }

    /* Call-to-action box styles */
    .cta-box {
      background: linear-gradient(135deg, #003049, #0071e3);
      border-radius: 12px;
      padding: 2rem;
      margin: 2rem auto;
      max-width: 600px;
      box-shadow: 0 8px 30px rgba(0, 113, 227, 0.3);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .cta-box:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 113, 227, 0.4);
    }

    .cta-box h3 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: white;
    }

    .cta-box p {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 1.5rem;
    }
    /* Apple-Style Project Dots Navigation */
    .project-dots-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px; /* Reduced gap for Apple-like spacing */
      margin-top: 4rem; /* Increased margin for better separation */
      padding: 2rem 0; /* Increased padding */
      position: relative;
    }

    .project-dots-nav::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 3rem); /* Slightly wider */
      height: 50px; /* Reduced height for subtlety */
      background: rgba(0, 0, 0, 0.05); /* More subtle background */
      border-radius: 25px;
      backdrop-filter: blur(20px); /* Increased blur */
      border: 1px solid rgba(255, 255, 255, 0.03); /* More subtle border */
      z-index: -1;
    }

    .project-dot {
      width: 8px; /* Smaller, more Apple-like */
      height: 8px;
      border-radius: 50%;
      border: none; /* Remove border for cleaner look */
      background-color: rgba(255, 255, 255, 0.3); /* Subtle inactive state */
      cursor: pointer;
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); /* Apple's signature easing */
      padding: 0;
      position: relative;
      z-index: 1;
    }

    .project-dot::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: -1;
    }

    .project-dot:hover {
      transform: scale(1.5); /* Subtle hover scaling */
      background-color: rgba(255, 255, 255, 0.6);
    }

    .project-dot:hover::before {
      width: 20px;
      height: 20px;
      background: rgba(255, 255, 255, 0.1);
    }

    .project-dot.active {
      background: #ffffff; /* Clean white active state */
      transform: scale(1.25); /* Subtle active scaling */
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.4); /* Subtle glow */
    }

    .project-dot.active::before {
      width: 16px;
      height: 16px;
      background: rgba(255, 255, 255, 0.15);
    }

    /* Apple-Style Responsive Dots Navigation */
    @media (max-width: 640px) {
      .project-dots-nav {
        gap: 10px;
        margin-top: 3rem;
        padding: 1.5rem 0;
      }

      .project-dots-nav::before {
        height: 40px;
        border-radius: 20px;
        width: calc(100% + 2rem);
      }

      .project-dot {
        width: 6px;
        height: 6px;
      }

      .project-dot:hover::before,
      .project-dot.active::before {
        width: 14px;
        height: 14px;
      }
    }

    @media (min-width: 768px) {
      .project-dots-nav {
        gap: 14px;
        margin-top: 4rem;
      }

      .project-dot {
        width: 10px;
        height: 10px;
      }

      .project-dot:hover::before {
        width: 24px;
        height: 24px;
      }

      .project-dot.active::before {
        width: 20px;
        height: 20px;
      }
    }

    @media (min-width: 1024px) {
      .project-dots-nav {
        gap: 16px;
        margin-top: 5rem;
      }

      .project-dot {
        width: 10px;
        height: 10px;
      }

      .project-dot:hover::before {
        width: 28px;
        height: 28px;
      }

      .project-dot.active::before {
        width: 24px;
        height: 24px;
      }
    }
    /* Apple-Style Technology Tags */
    .tech-tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem; /* Increased gap for better spacing */
      padding: 0 1.5rem 1.5rem; /* Increased padding to match content */
    }

    .tech-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, 0.08); /* Dark background for better contrast */
      color: #1f2937; /* Dark text for readability */
      font-size: 0.8rem; /* Slightly larger text */
      padding: 0.4rem 0.75rem; /* Increased padding for Apple-like proportions */
      border-radius: 12px; /* Larger border radius */
      font-family: var(--font-geist-mono), monospace;
      white-space: nowrap;
      height: auto; /* Remove fixed height */
      border: 1px solid rgba(0, 0, 0, 0.1); /* Dark border for definition */
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); /* Apple easing */
      font-weight: 600; /* Bolder for better visibility */
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5); /* Light text shadow */
    }

    .tech-tag:hover {
      background-color: rgba(0, 0, 0, 0.15);
      color: #111827;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Project Detail Panel Styles */
    .project-detail-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 1000;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .project-detail-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .project-detail-container {
      position: relative;
      width: 90%;
      max-width: 1200px;
      height: 85vh;
      background-color: #1d1d1f;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      transform: translateY(20px);
      opacity: 0;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }

    .project-detail-overlay.active .project-detail-container {
      transform: translateY(0);
      opacity: 1;
    }

    .project-detail-header {
      position: relative;
      height: 40%;
      overflow: hidden;
      background-color: #000;
    }

    .project-detail-header-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
    }

    .project-detail-header-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 2rem;
      background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0));
    }

    .project-detail-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
    }

    .project-detail-nav {
      position: absolute;
      bottom: 1.5rem;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }

    .project-detail-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.2s ease;
    }

    .project-detail-dot.active {
      background-color: #0071e3;
      transform: scale(1.5);
    }

    .project-detail-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 10;
      transition: background-color 0.2s ease;
    }

    .project-detail-close:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    .project-detail-gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .gallery-image {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .gallery-image:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .tech-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      margin: 0.25rem;
      border-radius: 999px;
      background-color: rgba(0, 113, 227, 0.15);
      color: #0071e3;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .feature-item, .challenge-item {
      margin-bottom: 1rem;
      padding-left: 1.5rem;
      position: relative;
    }

    .feature-item:before, .challenge-item:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.5rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #0071e3;
    }

    .challenge-solution {
      margin-top: 0.5rem;
      padding-left: 1.5rem;
      color: #86868b;
    }

    .project-links {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .project-link-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 0.9rem;
      transition: background-color 0.2s ease;
    }

    .project-link-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    /* Enhanced Financial Analysis Container Styles */
    .financial-analysis-container {
      max-width: 100% !important; /* Use full available width within container */
      width: 100% !important;
      margin: 0 auto;
      overflow: visible; /* Ensure content is not clipped */
    }

    /* Responsive design for Financial Analysis section */
    @media (max-width: 1600px) {
      .chart-container {
        max-width: 1200px;
        padding: 3.5rem;
      }

      .project-demo-container {
        padding: 3.5rem;
        margin: 2.5rem 0;
        min-height: 600px;
      }

      .chart-bars {
        height: 350px;
      }

      .chart-year {
        width: 100px;
      }

      .bar-container {
        width: 70px;
      }
    }

    @media (max-width: 1024px) {
      .chart-container {
        max-width: 900px;
        padding: 3rem;
      }

      .project-demo-container {
        padding: 2.5rem;
        margin: 0;
        min-height: 400px;
      }

      .video-overlay-container {
        padding: 1.75rem;
        min-height: 110px;
      }

      .video-text-overlay h3 {
        font-size: 1.4rem;
      }

      .video-text-overlay p {
        font-size: 0.95rem;
      }

      .financial-analysis-container.video-placeholder {
        min-height: 650px;
      }

      .demo-header h3 {
        font-size: 2rem;
      }

      .demo-header p {
        font-size: 1.1rem;
      }

      .chart-bars {
        height: 300px;
      }

      .chart-year {
        width: 90px;
      }

      .bar-container {
        width: 60px;
      }

      .legend-item {
        font-size: 1.25rem;
      }

      .legend-color {
        width: 20px;
        height: 20px;
      }
    }

    @media (max-width: 768px) {
      .chart-container {
        max-width: 100%;
        padding: 2.5rem;
        margin: 0 1rem;
      }

      .project-demo-container {
        padding: 2rem;
        margin: 0;
        min-height: 350px;
      }

      .video-overlay-container {
        padding: 1.5rem;
        min-height: 100px;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .video-text-overlay {
        max-width: 100%;
        padding: 0.5rem 0;
      }

      .video-text-overlay h3 {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }

      .video-text-overlay p {
        font-size: 0.9rem;
      }

      .financial-analysis-container.video-placeholder {
        min-height: 550px;
        padding: 1rem 0;
      }

      .demo-header h3 {
        font-size: 1.75rem;
      }

      .demo-header p {
        font-size: 1rem;
      }

      .chart-legend {
        gap: 2rem;
        margin-bottom: 3rem;
        flex-wrap: wrap;
      }

      .legend-item {
        font-size: 1.1rem;
      }

      .legend-color {
        width: 18px;
        height: 18px;
      }

      .chart-bars {
        height: 250px;
      }

      .chart-year {
        width: 80px;
        margin: 0 0.5rem;
      }

      .bar-container {
        width: 50px;
      }

      .year-label {
        font-size: 1rem;
        margin-bottom: 1.5rem;
      }

      .key-findings {
        padding: 3rem;
        margin-top: 3rem;
      }

      .key-findings h4 {
        font-size: 1.5rem;
        margin-bottom: 2rem;
      }

      .key-findings ul {
        font-size: 1rem;
        padding-left: 2rem;
      }
    }

    @media (max-width: 480px) {
      .chart-container {
        padding: 1.5rem;
        margin: 0 0.5rem;
      }

      .project-demo-container {
        padding: 1.5rem;
        min-height: 350px;
      }

      .demo-header h3 {
        font-size: 1.25rem;
      }

      .demo-header p {
        font-size: 0.875rem;
      }

      .chart-legend {
        gap: 1rem;
        margin-bottom: 1.5rem;
      }

      .legend-color {
        width: 14px;
        height: 14px;
        margin-right: 8px;
      }

      .key-findings {
        padding: 1.5rem;
        margin-top: 1.5rem;
      }

      .key-findings h4 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }

      .key-findings ul {
        font-size: 0.875rem;
        line-height: 1.8;
        padding-left: 1.5rem;
      }

      .key-findings li {
        margin-bottom: 0.75rem;
      }
    }

    .project-demo-container {
      display: flex;
      flex-direction: column;
      height: auto;
      min-height: 400px; /* Adequate minimum height for content */
      padding: 3rem;
      background: rgba(15, 15, 20, 0.9);
      border-radius: 16px 16px 0 0; /* Only round top corners to connect with overlay */
      color: #ffffff;
      margin: 0; /* Remove margin to connect with overlay */
      width: 100%;
      flex: 1; /* Take available space in flex container */
    }

    .demo-header {
      margin-bottom: 2rem; /* Reduced space below header for better utilization */
      text-align: center; /* Center align header text */
    }

    .demo-header h3 {
      margin-bottom: 1.5rem; /* More space between title and description */
      font-size: 2.5rem; /* Much larger title */
      font-weight: 700; /* Bolder font weight */
    }

    .demo-header p {
      font-size: 1.25rem; /* Much larger description text */
      line-height: 1.8; /* Better line height for readability */
      max-width: 800px; /* Limit width for better readability */
      margin: 0 auto; /* Center the description */
    }

    .demo-visualization {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 2rem 0; /* Reduced margin for better space utilization */
      min-height: auto; /* Let content determine height */
    }

    .chart-container {
      width: 100%;
      max-width: min(1400px, 90vw); /* Responsive max-width that doesn't exceed viewport */
      background: rgba(30, 30, 40, 0.8); /* Slightly more opaque background */
      padding: 4rem; /* Much larger padding for internal space */
      border-radius: 16px; /* Larger border radius */
      border: 1px solid rgba(255, 255, 255, 0.15); /* Slightly more visible border */
      margin: 0 auto; /* Center the container */
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4); /* Enhanced shadow for depth */
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 2rem; /* Reduced gap for better space utilization */
      margin-bottom: 2rem; /* Reduced margin for better space utilization */
      padding: 1rem 0; /* Reduced vertical padding */
    }

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 1.5rem; /* Much larger font size */
      color: #e0e0e0;
      font-weight: 600; /* Bolder font weight */
    }

    .legend-color {
      display: inline-block;
      width: 24px; /* Much larger size */
      height: 24px; /* Much larger size */
      margin-right: 15px; /* Increased margin */
      border-radius: 4px; /* Larger border radius */
    }



    .key-findings {
      margin-top: 2rem; /* Reduced margin for better space utilization */
      padding: 2.5rem; /* Reduced padding for better space utilization */
      background: rgba(40, 40, 50, 0.9); /* More opaque */
      border-radius: 16px; /* Larger border radius to match container */
      border: 1px solid rgba(255, 255, 255, 0.2); /* More visible border */
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3); /* Enhanced shadow */
    }

    .key-findings h4 {
      margin-bottom: 2.5rem; /* Much more space below heading */
      font-size: 2rem; /* Much larger heading */
      color: #ffffff; /* Pure white for better contrast */
      font-weight: 700; /* Bolder font weight */
      text-align: center; /* Center the heading */
    }

    .key-findings ul {
      list-style-type: disc;
      padding-left: 3rem; /* Increased padding */
      line-height: 2.2; /* Increased line height for better readability */
      font-size: 1.125rem; /* Much larger font size */
      max-width: 1000px; /* Limit width for better readability */
      margin: 0 auto; /* Center the list */
    }

    .key-findings li {
      margin-bottom: 1.5rem; /* More space between list items */
      color: #e0e0e0; /* Better color for list items */
    }


    .chart-bars {
      display: flex;
      justify-content: space-around;
      height: 350px; /* Optimized height for better space utilization */
      margin: 2rem 0; /* Reduced margin for better space utilization */
      padding: 1rem 0; /* Reduced padding for better space utilization */
    }

    .chart-year {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 120px; /* Much wider for better spacing */
      margin: 0 1rem; /* Increased horizontal margin between year columns */
    }

    .year-label {
      margin-bottom: 2rem; /* Much more space below year labels */
      font-size: 1.25rem; /* Much larger font */
      font-weight: 600; /* Bolder font weight */
      color: #ffffff; /* Pure white for better contrast */
    }

    .bar-container {
      display: flex;
      width: 80px; /* Much wider for better visibility */
      height: 100%;
      background: rgba(255, 255, 255, 0.2); /* More visible background */
      border-radius: 8px; /* Larger border radius */
      overflow: hidden;
      box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.3); /* Enhanced inner shadow for depth */
    }

    .bar {
      width: 50%;
      transition: height 0.5s ease;
      border-radius: 0 0 6px 6px; /* Larger rounding to bar tops */
    }



    /* Stock chart styles */
    .stock-chart {
      position: relative;
      width: 100%;
      max-width: 600px;
      height: 200px;
    }

    .chart-line {
      width: 100%;
      height: 100%;
    }

    .prediction-overlay {
      position: absolute;
      top: 0;
      right: 0;
      width: 30%;
      height: 100%;
      border-left: 1px dashed rgba(255, 255, 255, 0.3);
    }

    .prediction-line {
      position: absolute;
      top: 2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(118, 185, 0, 0.5);
      border-top: 1px dashed #76b900;
    }

    .prediction-label {
      position: absolute;
      top: 10px;
      left: 10px;
      padding: 4px 8px;
      background: rgba(118, 185, 0, 0.2);
      border: 1px solid #76b900;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #76b900;
    }

    .model-metrics {
      margin-top: 1.5rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin-top: 0.5rem;
    }

    .metric {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .metric-label {
      font-size: 0.7rem;
      color: #999;
    }

    .metric-value {
      font-size: 1rem;
      font-weight: 600;
      color: #76b900;
    }

    /* ETL Pipeline Diagram Styles */
    .etl-pipeline-diagram {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      padding: 2rem;
    }

    .pipeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .step-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .step-icon::after {
      content: '';
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 4px;
    }

    .step-label {
      font-size: 0.875rem;
      font-weight: 600;
      text-align: center;
    }

    .pipeline-arrow {
      font-size: 2rem;
      color: #86868b;
      font-weight: bold;
    }

    /* Analytics Dashboard Styles */
    .analytics-dashboard {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      padding: 2rem;
      max-width: 600px;
      margin: 0 auto;
    }

    .dashboard-metric {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .metric-title {
      font-size: 0.75rem;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }

    .metric-number {
      font-size: 1.5rem;
      font-weight: 700;
    }

    /* Tech Showcase Styles */
    .tech-showcase {
      margin-top: 1.5rem;
    }

    /* Responsive adjustments for new components */
    @media (max-width: 768px) {
      .etl-pipeline-diagram {
        flex-direction: column;
        gap: 1rem;
      }

      .pipeline-arrow {
        transform: rotate(90deg);
        font-size: 1.5rem;
      }

      .analytics-dashboard {
        grid-template-columns: 1fr;
        gap: 1rem;
        padding: 1rem;
      }

      .step-icon {
        width: 50px;
        height: 50px;
      }

      .step-icon::after {
        width: 20px;
        height: 20px;
      }
    }
  `}</style>
);

// --- Reusable Components ---

const VideoOverlay: React.FC<VideoOverlayProps> = ({ titleLeft, descLeft, titleRight, descRight }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 150); // Trigger reflow for transition
        return () => clearTimeout(timer);
    }, [titleLeft, descLeft, titleRight, descRight]);

  return (
    <div className="video-overlay-container">
      <div className={`video-text-overlay video-text-overlay-left transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3>{titleLeft}</h3>
        <p>{descLeft}</p>
      </div>
      <div className={`video-text-overlay video-text-overlay-right transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3>{titleRight}</h3>
        <p>{descRight}</p>
      </div>
    </div>
  );
};

// Add this component for the detailed project view
const ProjectDetailView = ({
  project,
  isOpen,
  onClose
}: {
  project: Project | null,
  isOpen: boolean,
  onClose: () => void
}) => {
  const [activePage, setActivePage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  // Ensure we have content for both pages
  const detailedDescription = project.detailedDescription || project.description;
  const keyFeatures = project.keyFeatures || ['Detailed information not available'];
  const challenges = project.challenges || [];
  const technologies = project.technologies || [];
  const accomplishments = project.accomplishments || [];
  const imageUrls = project.imageUrls || [project.image];

  return (
    <div className={`project-detail-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="project-detail-container" ref={containerRef} onClick={e => e.stopPropagation()}>
        <div className="project-detail-close" onClick={onClose}>
          <X size={20} color="white" />
        </div>

        <div className="project-detail-header">
          <img
            src={project.image}
            alt={project.title}
            className="project-detail-header-image"
            onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/1200x600/2a2a2d/555555?text=Image+Error')}
          />
          <div className="project-detail-header-overlay">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{project.title}</h2>
            <div className="project-links">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <Github size={16} />
                  <span>Repository</span>
                </a>
              )}
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link-button">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="project-detail-content">
          {activePage === 0 ? (
            // Page 1: Overview and Features
            <>
              <h3 className="text-xl font-semibold mb-4 text-white">Project Overview</h3>
              <p className="text-gray-300 mb-6">{detailedDescription}</p>

              <h3 className="text-xl font-semibold mb-4 text-white">Technologies Used</h3>
              <div className="mb-6">
                {technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white">Key Features</h3>
              <div className="mb-6">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="feature-item text-gray-300">{feature}</div>
                ))}
              </div>
            </>
          ) : (
            // Page 2: Challenges and Gallery
            <>
              <h3 className="text-xl font-semibold mb-4 text-white">Challenges & Solutions</h3>
              {challenges.length > 0 ? (
                <div className="mb-6">
                  {challenges.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="challenge-item text-white">{item.challenge}</div>
                      <div className="challenge-solution">Solution: {item.solution}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mb-6">Challenge information not available.</p>
              )}

              <h3 className="text-xl font-semibold mb-4 text-white">Accomplishments</h3>
              {accomplishments.length > 0 ? (
                <div className="mb-6">
                  {accomplishments.map((item, index) => (
                    <div key={index} className="feature-item text-gray-300">{item}</div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 mb-6">Accomplishment information not available.</p>
              )}

              <h3 className="text-xl font-semibold mb-4 text-white">Gallery</h3>
              <div className="project-detail-gallery">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="gallery-image"
                    onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/400x300/2a2a2d/555555?text=Image+Error')}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="project-detail-nav">
          <div
            className={`project-detail-dot ${activePage === 0 ? 'active' : ''}`}
            onClick={() => setActivePage(0)}
          ></div>
          <div
            className={`project-detail-dot ${activePage === 1 ? 'active' : ''}`}
            onClick={() => setActivePage(1)}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Add this component for the highlights section with sliding panels
const ProjectHighlights = ({
  project
}: {
  project: Project
}) => {
  const [activePanel, setActivePanel] = useState(0);

  // Basic info for first panel
  const basicInfo = {
    title: project.title,
    type: project.technologies?.[0] || "Project",
    image: project.image
  };

  // Detailed info for second panel
  const detailedInfo = {
    description: project.description,
    technologies: project.technologies || [],
    keyPoints: project.keyFeatures || []
  };

  return (
    <div className="highlights-container">
      <div className="highlights-panels-wrapper">
        <div
          className="highlights-panels"
          style={{ transform: `translateX(-${activePanel * 50}%)` }}
        >
          {/* Panel 1: Basic Info */}
          <div className="highlights-panel">
            <div className="highlights-image-container">
              <img
                src={basicInfo.image}
                alt={basicInfo.title}
                className="highlights-image"
                onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/600x400/2a2a2d/555555?text=Image+Error')}
              />
            </div>
            <div className="highlights-content">
              <span className="highlights-project-type">{basicInfo.type}</span>
              <h3 className="highlights-title">{basicInfo.title}</h3>
            </div>
          </div>

          {/* Panel 2: Detailed Info */}
          <div className="highlights-panel">
            <div className="highlights-detail-content">
              <p className="highlights-description">{detailedInfo.description}</p>
              <div className="highlights-technologies">
                {detailedInfo.technologies.slice(0, 5).map((tech, index) => (
                  <span key={index} className="highlights-tech-tag">{tech}</span>
                ))}
                {detailedInfo.technologies.length > 5 && (
                  <span className="highlights-tech-tag">+{detailedInfo.technologies.length - 5}</span>
                )}
              </div>
              {detailedInfo.keyPoints.length > 0 && (
                <div className="highlights-key-points">
                  <h4>Key Features</h4>
                  <ul>
                    {detailedInfo.keyPoints.slice(0, 3).map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Navigation */}
      <div className="highlights-nav">
        <button
          className={`highlights-nav-dot ${activePanel === 0 ? 'active' : ''}`}
          onClick={() => setActivePanel(0)}
          aria-label="View basic information"
        />
        <button
          className={`highlights-nav-dot ${activePanel === 1 ? 'active' : ''}`}
          onClick={() => setActivePanel(1)}
          aria-label="View detailed information"
        />
      </div>
    </div>
  );
};

// Update the ProjectShowcase component
const ProjectShowcase: React.FC = () => {
  const [videoOverlayData, setVideoOverlayData] = useState<VideoOverlayProps>({
    titleLeft: "M4, M4 Pro, and M4 Max.",
    descLeft: "Ready for whatever's impossible.",
    titleRight: "Longest battery life ever in a Mac.",
    descRight: "Up to 24 hours.*"
  });
  const [currentActiveProjectIndex, setCurrentActiveProjectIndex] = useState(0);

  // Apple-style slider state
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(false); // Track if user manually selected a project
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollX, setDragStartScrollX] = useState(0);
  const [momentum, setMomentum] = useState(0);
  const [lastDragTime, setLastDragTime] = useState(0);
  const [lastDragX, setLastDragX] = useState(0);

  // Manual positioning control
  const [isManualMode, setIsManualMode] = useState(false); // Track if user wants manual control
  const [dragStartTime, setDragStartTime] = useState(0); // Track when drag started
  const [dragHoldThreshold] = useState(500); // Milliseconds to hold before entering manual mode
  const [lastTapTime, setLastTapTime] = useState(0); // For double-tap detection to exit manual mode

  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null); // Ref for the main container
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const momentumAnimationRef = useRef<number | null>(null);





  const updateVideoOverlayText = useCallback((project: Project) => {
    // Special handling for Financial Analysis project
    if (project.id === 'proj1') {
      setVideoOverlayData({
        titleLeft: project.title,
        descLeft: "When rideshare platforms disrupted a $2.3 billion market overnight, the transportation industry needed answers. This comprehensive capstone analysis decoded the seismic shift—revealing how Uber and competitors achieved 67% consumer dominance while traditional taxis lost ground across every major metropolitan market. Through sophisticated R statistical modeling and dynamic Tableau storytelling, the research uncovers the precise economic levers, behavioral triggers, and strategic maneuvers that redefined urban mobility forever.",
        titleRight: "Executive Intelligence",
        descRight: "Transforms complex market dynamics into actionable strategic insights for C-suite executives, policy architects, and institutional investors steering the $180 billion mobility revolution."
      });
    } else {
      // Default behavior for other projects
      setVideoOverlayData({
        titleLeft: project.title,
        descLeft: project.description.substring(0, 100) + (project.description.length > 100 ? "..." : ""),
        titleRight: "Project Details",
        descRight: `Explore ${project.title}.`
      });
    }
  }, []);

  const setActiveProjectStyle = useCallback((activeIndex: number) => {
    if (projectsTrackRef.current) {
      const projectItems = projectsTrackRef.current.children;
      for (let i = 0; i < projectItems.length; i++) {
        if (i === activeIndex) {
          projectItems[i].classList.add('active-project');
        } else {
          projectItems[i].classList.remove('active-project');
        }
      }
    }
  }, []);



  const updateSliderScroll = useCallback(() => {
    if (!projectsTrackRef.current || !projectsTrackRef.current.parentElement) return;

    const projectItems = projectsTrackRef.current.children;
    if (projectItems.length === 0) return;

    // Set initial project
    if (projectData.length > 0) {
      updateVideoOverlayText(projectData[0]);
      setActiveProjectStyle(0);
      setCurrentActiveProjectIndex(0);
    }

    // Reset transform
    projectsTrackRef.current.style.transform = `translateX(0px)`;
  }, [updateVideoOverlayText, setActiveProjectStyle]);

  // Apple-style auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (!isAutoScrolling || isDragging || isUserSelected) return; // Don't auto-scroll if user has selected a project

      setCurrentActiveProjectIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % projectData.length;

        // Trigger the project click to handle scrolling
        if (projectData[nextIndex]) {
          updateVideoOverlayText(projectData[nextIndex]);
          setActiveProjectStyle(nextIndex);

          // Smooth scroll to next project
          if (projectsTrackRef.current) {
            const projectItems = projectsTrackRef.current.children;
            if (projectItems.length > 0) {
              const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
              const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
              const gap = parseFloat(gapStyle) || (2 * 16);

              // Account for container padding in auto-scroll centering
              const container = projectsTrackRef.current.parentElement;
              const containerWidth = container?.offsetWidth || 0;

              // Get container padding to calculate actual available space
              let availableWidth = containerWidth;
              if (container) {
                const containerStyles = getComputedStyle(container);
                const paddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
                const paddingRight = parseFloat(containerStyles.paddingRight) || 0;
                availableWidth = containerWidth - paddingLeft - paddingRight;
              }

              const itemCenter = nextIndex * (itemWidth + gap) + (itemWidth / 2);
              let scrollTarget = itemCenter - (availableWidth / 2);

              if (projectsTrackRef.current.parentElement) {
                const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
                scrollTarget = Math.min(Math.max(0, scrollTarget), maxScroll);
              }

              // Apply Apple-style smooth transform
              projectsTrackRef.current.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
              projectsTrackRef.current.style.transform = `translateX(-${scrollTarget}px)`;

              setTimeout(() => {
                if (projectsTrackRef.current) {
                  projectsTrackRef.current.style.transition = '';
                }
              }, 1200);
            }
          }
        }

        return nextIndex;
      });
    }, 4000); // Auto-scroll every 4 seconds like Apple
  }, [isAutoScrolling, isDragging, isUserSelected, projectData, updateVideoOverlayText, setActiveProjectStyle]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
      autoScrollIntervalRef.current = null;
    }
  }, []);

  // Function to exit manual mode and return to normal behavior
  const exitManualMode = useCallback(() => {
    setIsManualMode(false);
    setIsUserSelected(false);
    setIsAutoScrolling(true);
    console.log('Manual positioning mode deactivated - returning to normal behavior');

    // Optionally snap to nearest project when exiting manual mode
    if (projectsTrackRef.current && projectsTrackRef.current.parentElement) {
      const projectItems = projectsTrackRef.current.children;
      if (projectItems.length > 0) {
        const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
        const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
        const gap = parseFloat(gapStyle) || (2 * 16);

        const transform = projectsTrackRef.current.style.transform;
        const translateX = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
        const currentScrollX = translateX ? parseFloat(translateX[1]) : 0;

        const container = projectsTrackRef.current.parentElement;
        const containerWidth = container.offsetWidth;
        let availableWidth = containerWidth;
        const containerStyles = getComputedStyle(container);
        const paddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
        const paddingRight = parseFloat(containerStyles.paddingRight) || 0;
        availableWidth = containerWidth - paddingLeft - paddingRight;

        let nearestIndex = Math.round((currentScrollX + availableWidth / 2) / (itemWidth + gap));
        nearestIndex = Math.max(0, Math.min(projectData.length - 1, nearestIndex));

        setCurrentActiveProjectIndex(nearestIndex);
        if (projectData[nearestIndex]) {
          updateVideoOverlayText(projectData[nearestIndex]);
          setActiveProjectStyle(nearestIndex);
        }
      }
    }

    // Restart auto-scroll after a delay
    setTimeout(() => {
      startAutoScroll();
    }, 1000);
  }, [projectData, updateVideoOverlayText, setActiveProjectStyle, startAutoScroll]);

  const handleProjectClick = useCallback((project: Project, index: number) => {
    // Mark as user selected - this will keep the project selected and stop auto-scroll
    setIsUserSelected(true);
    setIsAutoScrolling(false);
    stopAutoScroll();

    setCurrentActiveProjectIndex(index);
    updateVideoOverlayText(project);
    setActiveProjectStyle(index);

    if (projectsTrackRef.current) {
      const projectItems = projectsTrackRef.current.children;
      if (projectItems.length === 0) return;

      const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
      const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
      const gap = parseFloat(gapStyle) || (2 * 16); // Updated to 2rem for Apple-like spacing

      // Apple-style centering calculation - account for container padding
      const container = projectsTrackRef.current.parentElement;
      const containerWidth = container?.offsetWidth || 0;

      // Get container padding to calculate actual available space
      let availableWidth = containerWidth;
      if (container) {
        const containerStyles = getComputedStyle(container);
        const paddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
        const paddingRight = parseFloat(containerStyles.paddingRight) || 0;
        availableWidth = containerWidth - paddingLeft - paddingRight;
      }

      const itemCenter = index * (itemWidth + gap) + (itemWidth / 2);
      let scrollTarget = itemCenter - (availableWidth / 2);

      if (projectsTrackRef.current.parentElement) {
        const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
        scrollTarget = Math.min(Math.max(0, scrollTarget), maxScroll);
      }

      // Apply Apple-style smooth transform with momentum
      projectsTrackRef.current.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      projectsTrackRef.current.style.transform = `translateX(-${scrollTarget}px)`;

      // Reset transition after animation completes
      setTimeout(() => {
        if (projectsTrackRef.current) {
          projectsTrackRef.current.style.transition = '';
        }
      }, 800);
    }

    // Project stays selected until user selects another one - no auto-resume
  }, [updateVideoOverlayText, setActiveProjectStyle, stopAutoScroll]);

  // Apple-style drag functionality
  const handleDragStart = useCallback((clientX: number) => {
    const currentTime = Date.now();
    setIsDragging(true);
    setIsAutoScrolling(false);
    stopAutoScroll();
    setDragStartX(clientX);
    setLastDragX(clientX);
    setLastDragTime(currentTime);
    setDragStartTime(currentTime); // Track when drag started for manual mode detection

    if (projectsTrackRef.current) {
      const transform = projectsTrackRef.current.style.transform;
      const translateX = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
      setDragStartScrollX(translateX ? parseFloat(translateX[1]) : 0);

      // Remove transition during drag for immediate response
      projectsTrackRef.current.style.transition = 'none';
    }
  }, [stopAutoScroll]);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging || !projectsTrackRef.current) return;

    const deltaX = clientX - dragStartX;
    const newScrollX = dragStartScrollX - deltaX; // Negative because we're moving content opposite to drag

    // Calculate momentum for later use
    const currentTime = Date.now();
    const timeDelta = currentTime - lastDragTime;
    if (timeDelta > 0) {
      const velocity = (clientX - lastDragX) / timeDelta;
      setMomentum(velocity * 100); // Scale for better feel
    }

    // Check if user has been dragging long enough to enter manual mode
    const dragDuration = currentTime - dragStartTime;
    if (dragDuration > dragHoldThreshold && !isManualMode) {
      setIsManualMode(true);
      // Optional: Add visual feedback that manual mode is active
      console.log('Manual positioning mode activated');
    }

    setLastDragX(clientX);
    setLastDragTime(currentTime);

    // Apply bounds checking
    if (projectsTrackRef.current.parentElement) {
      const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
      const boundedScrollX = Math.min(Math.max(-50, newScrollX), maxScroll + 50); // Allow slight overscroll

      projectsTrackRef.current.style.transform = `translateX(-${boundedScrollX}px)`;
    }
  }, [isDragging, dragStartX, dragStartScrollX, lastDragTime, lastDragX, dragStartTime, dragHoldThreshold, isManualMode]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging || !projectsTrackRef.current) return;

    setIsDragging(false);

    // If in manual mode, preserve the current position without snapping
    if (isManualMode) {
      // Just ensure the position stays within bounds without snapping to projects
      if (projectsTrackRef.current.parentElement) {
        const transform = projectsTrackRef.current.style.transform;
        const translateX = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
        const currentScrollX = translateX ? parseFloat(translateX[1]) : 0;

        const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
        const boundedScrollX = Math.min(Math.max(0, currentScrollX), maxScroll);

        // Apply gentle transition to final position without snapping
        projectsTrackRef.current.style.transition = 'transform 0.3s ease-out';
        projectsTrackRef.current.style.transform = `translateX(-${boundedScrollX}px)`;

        setTimeout(() => {
          if (projectsTrackRef.current) {
            projectsTrackRef.current.style.transition = '';
          }
        }, 300);
      }

      // Reset momentum but stay in manual mode
      setMomentum(0);
      setIsUserSelected(true); // Prevent auto-scroll from resuming
      return; // Exit early, skip the normal snapping behavior
    }

    // Normal behavior: Apply momentum and snap to nearest project (when not in manual mode)
    if (projectsTrackRef.current.parentElement) {
      const projectItems = projectsTrackRef.current.children;
      if (projectItems.length > 0) {
        const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
        const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
        const gap = parseFloat(gapStyle) || (2 * 16);

        const transform = projectsTrackRef.current.style.transform;
        const translateX = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);
        const currentScrollX = translateX ? parseFloat(translateX[1]) : 0;

        // Find nearest project index - account for container padding
        const container = projectsTrackRef.current.parentElement;
        const containerWidth = container.offsetWidth;

        // Get container padding to calculate actual available space
        let availableWidth = containerWidth;
        const containerStyles = getComputedStyle(container);
        const paddingLeft = parseFloat(containerStyles.paddingLeft) || 0;
        const paddingRight = parseFloat(containerStyles.paddingRight) || 0;
        availableWidth = containerWidth - paddingLeft - paddingRight;

        let nearestIndex = Math.round((currentScrollX + availableWidth / 2) / (itemWidth + gap));

        // Apply momentum to influence the target
        if (Math.abs(momentum) > 0.5) {
          if (momentum > 0) nearestIndex = Math.max(0, nearestIndex - 1);
          else nearestIndex = Math.min(projectData.length - 1, nearestIndex + 1);
        }

        nearestIndex = Math.max(0, Math.min(projectData.length - 1, nearestIndex));

        // Update active project and scroll to it
        setCurrentActiveProjectIndex(nearestIndex);
        setIsUserSelected(true); // Mark as user selected when dragged to a specific project
        if (projectData[nearestIndex]) {
          updateVideoOverlayText(projectData[nearestIndex]);
          setActiveProjectStyle(nearestIndex);

          // Calculate target position using available width
          const itemCenter = nearestIndex * (itemWidth + gap) + (itemWidth / 2);
          let scrollTarget = itemCenter - (availableWidth / 2);
          const maxScroll = projectsTrackRef.current.scrollWidth - containerWidth;
          scrollTarget = Math.min(Math.max(0, scrollTarget), maxScroll);

          // Smooth snap with Apple-style easing
          projectsTrackRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          projectsTrackRef.current.style.transform = `translateX(-${scrollTarget}px)`;

          setTimeout(() => {
            if (projectsTrackRef.current) {
              projectsTrackRef.current.style.transition = '';
            }
          }, 600);
        }
      }
    }

    // Reset momentum - don't restart auto-scroll since user made a selection
    setMomentum(0);
  }, [isDragging, momentum, projectData, updateVideoOverlayText, setActiveProjectStyle, startAutoScroll, isManualMode]);

  useEffect(() => {
    // Initial setup for projects and slider
    if (projectData.length > 0) {
      updateVideoOverlayText(projectData[0]);
      setActiveProjectStyle(0);
    }
    // Delay updateSliderScroll to ensure layout is calculated
    const timer = setTimeout(updateSliderScroll, 300);

    // Start auto-scroll after initial setup
    const autoScrollTimer = setTimeout(() => {
      startAutoScroll();
    }, 1000);

    window.addEventListener('resize', updateSliderScroll);

    return () => {
        clearTimeout(timer);
        clearTimeout(autoScrollTimer);
        stopAutoScroll();
        window.removeEventListener('resize', updateSliderScroll);
    };
  }, [updateVideoOverlayText, setActiveProjectStyle, updateSliderScroll, startAutoScroll, stopAutoScroll]);

  // Handle mouse and touch events for dragging
  useEffect(() => {
    const track = projectsTrackRef.current;
    if (!track) return;

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      // Check for double-click to exit manual mode
      const currentTime = Date.now();
      if (isManualMode && currentTime - lastTapTime < 300) {
        // Double-click detected while in manual mode - exit manual mode
        exitManualMode();
        setLastTapTime(0); // Reset to prevent triple-click issues
        return;
      }
      setLastTapTime(currentTime);

      handleDragStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        handleDragMove(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    // Touch events
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Check for double-tap to exit manual mode
        const currentTime = Date.now();
        if (isManualMode && currentTime - lastTapTime < 300) {
          // Double-tap detected while in manual mode - exit manual mode
          exitManualMode();
          setLastTapTime(0); // Reset to prevent triple-tap issues
          return;
        }
        setLastTapTime(currentTime);

        handleDragStart(e.touches[0].clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        handleDragMove(e.touches[0].clientX);
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        handleDragEnd();
      }
    };

    // No hover events - auto-scroll only stops when user actively selects a project

    // Add event listeners
    track.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    track.addEventListener('touchstart', handleTouchStart, { passive: false });
    track.addEventListener('touchmove', handleTouchMove, { passive: false });
    track.addEventListener('touchend', handleTouchEnd);

    return () => {
      track.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      track.removeEventListener('touchstart', handleTouchStart);
      track.removeEventListener('touchmove', handleTouchMove);
      track.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleDragStart, handleDragMove, handleDragEnd, isManualMode, lastTapTime, exitManualMode]);



  const renderProjectDemo = useCallback((project: Project): JSX.Element => {
    // For the Financial Analysis project
    if (project.id === 'proj1') {
      return (
        <div className="project-demo-container">
          <div className="demo-header">
            <h3 className="text-xl font-semibold mb-2 text-white">Financial Analysis of Transportation Trends</h3>
            <p className="text-sm text-gray-200 mb-4">Interactive visualization of rideshare vs. taxi market trends (2018-2021)</p>
          </div>

          <div className="demo-visualization">
            <div className="chart-container">
              <div className="chart-legend">
                <span className="legend-item"><span className="legend-color bg-blue-500"></span>Rideshare</span>
                <span className="legend-item"><span className="legend-color bg-yellow-400"></span>Traditional Taxi</span>
              </div>
              <div className="chart-bars">
                <div className="chart-year">
                  <span className="year-label">2018</span>
                  <div className="bar-container">
                    <div className="bar bg-blue-500" style={{height: '40%'}}></div>
                    <div className="bar bg-yellow-400" style={{height: '60%'}}></div>
                  </div>
                </div>
                <div className="chart-year">
                  <span className="year-label">2019</span>
                  <div className="bar-container">
                    <div className="bar bg-blue-500" style={{height: '55%'}}></div>
                    <div className="bar bg-yellow-400" style={{height: '45%'}}></div>
                  </div>
                </div>
                <div className="chart-year">
                  <span className="year-label">2020</span>
                  <div className="bar-container">
                    <div className="bar bg-blue-500" style={{height: '65%'}}></div>
                    <div className="bar bg-yellow-400" style={{height: '35%'}}></div>
                  </div>
                </div>
                <div className="chart-year">
                  <span className="year-label">2021</span>
                  <div className="bar-container">
                    <div className="bar bg-blue-500" style={{height: '75%'}}></div>
                    <div className="bar bg-yellow-400" style={{height: '25%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="demo-footer">
            <div className="key-findings">
              <h4 className="text-sm font-medium mb-2 text-white">Key Findings:</h4>
              <ul className="text-xs text-gray-200">
                <li>47% market shift from taxis to rideshare platforms over the study period</li>
                <li>32% average cost reduction for consumers using rideshare services</li>
                <li>2.3x increase in driver flexibility and income potential with gig-economy model</li>
                <li>Significant correlation between rideshare adoption and decreased urban congestion</li>
                <li>Data suggests continued market consolidation through 2023</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // For the Stock Price Forecasting project
    if (project.id === 'proj2') {
      return (
        <div className="project-demo-container">
          <div className="demo-header">
            <h3 className="text-xl font-semibold mb-2 text-white">Stock Price Forecasting (NVIDIA)</h3>
            <p className="text-sm text-gray-200 mb-4">ML-powered price prediction model</p>
          </div>

          <div className="demo-visualization">
            <div className="stock-chart">
              <svg width="100%" height="60" viewBox="0 0 100 30" preserveAspectRatio="none">
                <path d="M0,20 L10,18 L20,22 L30,15 L40,25 L50,20 L60,10 L70,15 L80,5 L90,8 L100,2"
                      fill="none" stroke="#76b900" strokeWidth="1.5" />
                <path d="M0,20 L10,18 L20,22 L30,15 L40,25 L50,20 L60,10 L70,15 L80,5 L90,8 L100,2"
                      fill="url(#nvGradient)" strokeWidth="0" opacity="0.3" />
                <defs>
                  <linearGradient id="nvGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#76b900" />
                    <stop offset="100%" stopColor="#76b900" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="prediction-overlay">
              <div className="prediction-line"></div>
              <div className="prediction-label">Predicted +12.4%</div>
            </div>
          </div>

          <div className="demo-footer">
            <div className="model-metrics">
              <h4 className="text-sm font-medium mb-1 text-white">Model Performance:</h4>
              <div className="metrics-grid">
                <div className="metric">
                  <span className="metric-label">Accuracy</span>
                  <span className="metric-value">94%</span>
                </div>
                <div className="metric">
                  <span className="metric-label">F1 Score</span>
                  <span className="metric-value">0.92</span>
                </div>
                <div className="metric">
                  <span className="metric-label">RMSE</span>
                  <span className="metric-value">2.3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // For the ETL Schema and Pipeline project
    if (project.id === 'proj3') {
      return (
        <div className="project-demo-container">
          <div className="demo-header">
            <h3 className="text-xl font-semibold mb-2 text-white">ETL Schema and Pipeline (AWS RDS)</h3>
            <p className="text-sm text-gray-200 mb-4">Robust data pipeline with automated reporting and security</p>
          </div>

          <div className="demo-visualization">
            <div className="etl-pipeline-diagram">
              <div className="pipeline-step">
                <div className="step-icon bg-blue-500"></div>
                <span className="step-label text-white">Extract</span>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step">
                <div className="step-icon bg-green-500"></div>
                <span className="step-label text-white">Transform</span>
              </div>
              <div className="pipeline-arrow">→</div>
              <div className="pipeline-step">
                <div className="step-icon bg-purple-500"></div>
                <span className="step-label text-white">Load</span>
              </div>
            </div>
          </div>

          <div className="demo-footer">
            <div className="key-features">
              <h4 className="text-sm font-medium mb-2 text-white">Key Features:</h4>
              <ul className="text-xs text-gray-200">
                <li>AWS RDS/MySQL database optimization</li>
                <li>Automated ETL pipeline with Python</li>
                <li>IAM and Secrets Manager integration</li>
                <li>Real-time data processing and reporting</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // For the EM3 Wedding Services project
    if (project.id === 'proj4') {
      return (
        <div className="project-demo-container">
          <div className="demo-header">
            <h3 className="text-xl font-semibold mb-2 text-white">EM3 Wedding Services: Data-Driven Insights Platform</h3>
            <p className="text-sm text-gray-200 mb-4">Sophisticated ETL pipeline and analytics framework for wedding industry</p>
          </div>

          <div className="demo-visualization">
            <div className="analytics-dashboard">
              <div className="dashboard-metric">
                <span className="metric-title text-white">Client Engagement</span>
                <span className="metric-number text-green-400">+47%</span>
              </div>
              <div className="dashboard-metric">
                <span className="metric-title text-white">Service Utilization</span>
                <span className="metric-number text-blue-400">89%</span>
              </div>
              <div className="dashboard-metric">
                <span className="metric-title text-white">Predictive Accuracy</span>
                <span className="metric-number text-purple-400">92%</span>
              </div>
            </div>
          </div>

          <div className="demo-footer">
            <div className="platform-features">
              <h4 className="text-sm font-medium mb-2 text-white">Platform Capabilities:</h4>
              <ul className="text-xs text-gray-200">
                <li>Customer segmentation and personalization</li>
                <li>Predictive analytics for service optimization</li>
                <li>Real-time business intelligence dashboards</li>
                <li>Data quality monitoring and validation</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    // Return a placeholder for remaining projects
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6">
          <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
          <p className="text-sm text-gray-200 mb-4">{project.description.substring(0, 150)}...</p>
          <div className="tech-showcase">
            <h4 className="text-sm font-medium mb-2 text-white">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2 justify-center">
              {project.technologies?.slice(0, 6).map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <GlobalStyles />

      <div
        ref={mainContainerRef}
        className="min-h-screen flex flex-col items-center justify-center py-12 project-showcase-bg main-container relative"
      >
        <div className="main-content-wrapper max-w-7xl w-full mx-auto">
          <div className="space-y-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center pt-12 sm:pt-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
                Projects Showcase
              </h1>
              <p className="mt-3 text-xl sm:text-2xl text-white">
                Discover the possibilities of what I can bring to your organization
              </p>
            </header>

            <section className="py-8 md:py-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8 font-mono text-white">
                Featured Projects
              </h2>
              <div className="projects-slider-container">
                <div
                  id="projectsTrack"
                  ref={projectsTrackRef}
                  className={`projects-track ${isDragging ? 'dragging' : ''} ${isAutoScrolling ? 'auto-scrolling' : ''} ${isManualMode ? 'manual-mode' : ''}`}
                >
                  {projectData.map((project, index) => (
                    <div
                      key={project.id}
                      className={`project-item ${index === currentActiveProjectIndex ? 'active-project' : ''} ${index === currentActiveProjectIndex && isUserSelected ? 'user-selected' : ''}`}
                      onClick={() => handleProjectClick(project, index)}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/320x200/2a2a2d/555555?text=Image+Error')}
                      />
                      <h4>{project.title}</h4>
                      <p>{project.description.substring(0, 50)}...</p>

                      {/* Technology tags with consistent alignment */}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="tech-tags-container">
                          {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span key={techIndex} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="tech-tag">+{project.technologies.length - 4}</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="project-dots-nav">
                {projectData.map((project, index) => (
                  <button
                    key={project.id}
                    className={`project-dot ${index === currentActiveProjectIndex ? 'active' : ''}`}
                    onClick={() => handleProjectClick(project, index)}
                    aria-label={`View project: ${project.title}`}
                  />
                ))}
              </div>
            </section>



            <section className="w-full mx-auto space-y-4">
              <div className="video-placeholder financial-analysis-container">
                {/* Add the project demo here */}
                {projectData.length > 0 && renderProjectDemo(projectData[currentActiveProjectIndex])}
                <VideoOverlay {...videoOverlayData} />
              </div>
            </section>

            {/* Email subscription section moved to bottom for better user flow */}
            <section className="text-center space-y-8 py-16 md:py-24 border-t border-gray-700 mt-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-8 text-white">
                  Stay Updated.
                </h2>
                <div className="flex flex-col items-center space-y-6">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl">
                    Get notified when I add new projects to my portfolio
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 max-w-full"
                    />
                    <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 whitespace-nowrap">
                      Notify Me
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">
                    No spam, just project updates. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </section>

            <footer className="text-center pb-12 sm:pb-16">
              {/* Clean footer section */}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;
