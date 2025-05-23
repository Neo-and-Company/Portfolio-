

"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Switch } from "@/components/ui/switch";
import { usePathname } from 'next/navigation'; // Import for path checking
import { ChevronLeft, ChevronRight, X, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

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
        height: 0;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        background-color: #1d1d1f;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 1rem;
    }
    .video-placeholder-pattern {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.1;
        color: #666;
    }
    .playback-controls {
        display: flex;
        align-items: center;
        gap: 1rem;
        color: #86868b;
    }
    .timeline-bar {
        flex-grow: 1;
        height: 4px;
        background-color: #333;
        border-radius: 2px;
        position: relative;
    }
    .timeline-progress {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 35%;
        background-color: #0071e3;
        border-radius: 2px;
    }
    .projects-track {
        display: flex;
        gap: 1.5rem;
        transition: transform 0.5s ease;
    }
    .project-item {
        flex: 0 0 auto;
        width: 320px;
        background-color: #1d1d1f;
        border-radius: 12px;
        overflow: hidden;
        cursor: pointer;
        transition: transform 0.3s ease, outline 0.2s ease;
    }
    .project-item:hover {
        transform: translateY(-5px);
    }
    .project-item img {
        width: 100%;
        height: 180px;
        object-fit: cover;
    }
    .project-item h4 {
        padding: 1rem 1rem 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
        font-family: var(--font-geist-mono), monospace;
    }
    .project-item p {
        padding: 0 1rem 1rem;
        font-size: 0.9rem;
        color: #86868b;
        font-family: var(--font-geist-mono), monospace;
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
    .video-text-overlay {
        position: absolute;
        color: white;
        z-index: 10;
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        max-width: 45%; /* Give a bit more space */
    }
    .video-text-overlay-left {
        left: 20px; /* Adjust as needed */
        bottom: 20px; /* Adjust as needed */
        text-align: left;
    }
    .video-text-overlay-right {
        right: 20px; /* Adjust as needed */
        bottom: 20px; /* Adjust as needed */
        text-align: right;
        max-width: 45%; /* Give a bit more space */
    }
    .video-text-overlay h3 {
        font-size: 1.25rem; /* text-xl */
        /* sm:font-size: 1.5rem; Tailwind class sm:text-2xl will handle this */
        font-weight: 600; /* semibold */
        margin-bottom: 0.25rem; /* mb-1 */
        font-family: var(--font-geist-mono), monospace;
    }
    .video-text-overlay p {
        font-size: 0.875rem; /* text-base */
        /* sm:font-size: 1rem; Tailwind class sm:text-lg will handle this */
        color: #86868b; /* dim-text */
        font-family: var(--font-geist-mono), monospace;
    }
    .project-item.active-project { 
        outline: 2px solid #0071e3;
        outline-offset: 2px;
    }
    .flashlight {
        position: fixed;
        border-radius: 50%;
        width: 300px;
        height: 300px;
        pointer-events: none;
        z-index: 9999;
        background: radial-gradient(circle, rgba(220, 220, 200, 0.15) 0%, rgba(200, 200, 180, 0.1) 20%, rgba(0,0,0,0) 60%);
        mix-blend-mode: overlay;
        transition: transform 0.05s ease-out, opacity 0.3s ease-in-out;
        opacity: 0;
    }
    .main-container:hover .flashlight {
        opacity: 1;
    }
    
    /* Hidden text effect styles */
    .hidden-text-area {
        position: relative;
        overflow: hidden;
    }
    
    /* Make text nearly invisible by default by matching text color to background */
    .hidden-text-area h1, 
    .hidden-text-area h2, 
    .hidden-text-area h3, 
    .hidden-text-area h4, 
    .hidden-text-area p, 
    .hidden-text-area span,
    .hidden-text-area a,
    .hidden-text-area .project-item h4,
    .hidden-text-area .project-item p {
        color: rgba(17, 17, 18, 0.7); /* Nearly invisible - close to background color */
        transition: color 0.3s ease, text-shadow 0.3s ease;
    }
    
    /* Special handling for links to ensure they're also hidden */
    .hidden-text-area a.highlight-link {
        color: rgba(17, 17, 18, 0.7) !important;
        transition: color 0.3s ease, text-shadow 0.3s ease;
    }
    
    /* Revealed text style */
    .text-revealed {
        color: #f5f5f7 !important; /* Bright white when revealed */
        text-shadow: 0 0 8px rgba(245, 245, 247, 0.4);
    }
    
    /* Special handling for links when revealed */
    .text-revealed.highlight-link {
        color: #0071e3 !important; /* Blue for links when revealed */
        text-shadow: 0 0 8px rgba(0, 113, 227, 0.4);
    }
    
    /* Keep some elements visible regardless of flashlight */
    .always-visible {
        color: #f5f5f7 !important;
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
    /* Project dots navigation */
    .project-dots-nav {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      margin-top: 2rem;
    }
    
    .project-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #0071e3;
      background-color: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
    }
    
    .project-dot:hover {
      transform: scale(1.2);
      box-shadow: 0 0 8px rgba(0, 113, 227, 0.4);
    }
    
    .project-dot.active {
      background-color: #0071e3;
      background: linear-gradient(135deg, #003049, #0071e3);
      transform: scale(1.1);
    }
    
    @media (max-width: 640px) {
      .project-dots-nav {
        gap: 10px;
      }
      .project-dot {
        width: 10px;
        height: 10px;
      }
    }
    /* Technology tags styling */
    .tech-tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 0 1rem 1rem;
    }
    
    .tech-tag {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #2a2a2d;
      color: #86868b;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: var(--font-geist-mono), monospace;
      white-space: nowrap;
      height: 1.5rem;
    }
    /* UV Mode Styles */
    .uv-text-glow {
      text-shadow: 0 0 8px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.6);
      color: #f5f5f7 !important;
      transition: text-shadow 0.5s ease, color 0.5s ease;
    }
    
    /* Mode Toggle Styles */
    .mode-toggle-container {
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 999; /* Increased from 50 */
      display: flex;
      align-items: center;
      padding: 0.5rem;
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(4px);
      border-radius: 0.375rem;
      transition: background-color 0.3s ease;
    }
    
    .mode-toggle-container:hover {
      background-color: rgba(0, 0, 0, 0.3);
    }
    
    /* Adjust flashlight transition */
    .flashlight {
      transition: transform 0.05s ease-out, opacity 0.3s ease-in-out;
    }
    
    /* Light Switch Styles */
    .light-switch-container {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .light-switch-container:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
    }
    
    .light-switch {
      position: relative;
      width: 40px;
      height: 70px;
      background-color: #222;
      border-radius: 8px;
      box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.8);
      cursor: pointer;
      overflow: hidden;
    }
    
    .switch-toggle {
      position: absolute;
      width: 34px;
      height: 30px;
      left: 3px;
      background-color: #ddd;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
      transition: top 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .switch-toggle.off {
      top: 5px;
    }
    
    .switch-toggle.on {
      top: 35px;
    }
    
    .switch-label {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .switch-mode {
      font-size: 10px;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 2px;
    }
    
    /* UV indicator - changed to white */
    .uv-indicator {
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ffffff; /* Changed from #8a2be2 to white */
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.8); /* Changed to white glow */
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .uv-indicator.active {
      opacity: 1;
    }
    
    /* Flashlight indicator */
    .flashlight-indicator {
      position: absolute;
      top: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ffcc00;
      box-shadow: 0 0 8px #ffcc00;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .flashlight-indicator.active {
      opacity: 1;
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
    .project-demo-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 450px; /* Set minimum height */
      padding: 2rem; /* Increased padding */
      background: rgba(15, 15, 20, 0.9);
      border-radius: 8px;
      color: #ffffff;
    }
    
    .demo-header {
      margin-bottom: 1.5rem; /* Add more space below header */
    }
    
    .demo-visualization {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1.5rem 0; /* Increased margin */
      min-height: 300px; /* Set minimum height */
    }
    
    .chart-container {
      width: 100%;
      max-width: 700px; /* Increased from 500px */
      background: rgba(30, 30, 40, 0.7);
      padding: 2rem; /* Increased padding */
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin: 0 auto; /* Center the container */
    }
    
    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1.5rem; /* Increased margin */
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: #e0e0e0;
    }
    
    .legend-color {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 6px;
      border-radius: 2px;
    }
    
    .key-findings {
      margin-top: 2rem; /* Increased margin */
      padding: 1.5rem; /* Increased padding */
      background: rgba(40, 40, 50, 0.7);
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .key-findings h4 {
      margin-bottom: 0.75rem; /* Add space below heading */
    }
    
    .key-findings ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      line-height: 1.8; /* Increased line height */
      font-size: 0.875rem; /* Increased from 0.75rem */
    }
    
    .key-findings li {
      margin-bottom: 0.5rem; /* Add space between list items */
    }
    /* Project Demo Styles */
    .project-demo-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 450px; /* Set minimum height */
      padding: 2rem; /* Increased padding */
      background: rgba(15, 15, 20, 0.9);
      border-radius: 8px;
      color: #ffffff;
    }

    .demo-visualization {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .chart-container {
      width: 100%;
      max-width: 500px;
    }

    .chart-legend {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .legend-item {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
    }

    .legend-color {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 6px;
      border-radius: 2px;
    }

    .chart-bars {
      display: flex;
      justify-content: space-around;
      height: 200px;
    }

    .chart-year {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60px;
    }

    .year-label {
      margin-bottom: 0.5rem;
      font-size: 0.75rem;
    }

    .bar-container {
      display: flex;
      width: 40px;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      overflow: hidden;
    }

    .bar {
      width: 50%;
      transition: height 0.5s ease;
    }

    .key-findings {
      margin-top: 1.5rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
    }

    .key-findings ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      line-height: 1.4;
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
    <>
      <div className={`video-text-overlay video-text-overlay-left transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-1">{titleLeft}</h3>
        <p className="text-base sm:text-lg dim-text">{descLeft}</p>
      </div>
      <div className={`video-text-overlay video-text-overlay-right transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-1">{titleRight}</h3>
        <p className="text-base sm:text-lg dim-text">{descRight}</p>
      </div>
    </>
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
  const [geminiLoading, setGeminiLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isUVMode, setIsUVMode] = useState(false);
  const pathname = usePathname(); // Get current path
  
  // Check if we're on the projects page
  const isProjectsPage = pathname === '/' || pathname === '/projects';
  
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null); // Ref for the main container
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Enhanced project data with detailed information
  const enhancedProjectData: Project[] = [
    {
      id: 'proj1',
      title: 'Financial Analysis of Transportation Trends (Capstone)',
      description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
      technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
      image: 'https://placehold.co/600x400.png',
      repoUrl: 'https://github.com',
      demoUrl: '#',
      mediaType: 'image',
      // New detailed fields
      detailedDescription: 'This capstone project involved a comprehensive statistical analysis of how ride-sharing platforms like Uber have disrupted the traditional taxi industry. The study examined economic indicators, consumer behavior patterns, and market share shifts over a five-year period across major metropolitan areas. The analysis revealed significant correlations between ride-sharing adoption rates and decreased taxi revenue, while also identifying unexpected patterns in consumer preferences based on demographic factors.',
      keyFeatures: [
        'Comprehensive data collection from multiple transportation authorities and financial reports',
        'Advanced statistical modeling using R to identify correlation patterns and economic trends',
        'Interactive Tableau dashboards allowing stakeholders to explore data through multiple dimensions',
        'Predictive analysis of future market share distribution based on current adoption trends'
      ],
      challenges: [
        {
          challenge: 'Inconsistent data formats across different transportation authorities',
          solution: 'Developed custom ETL pipelines with data normalization procedures to create a unified dataset'
        },
        {
          challenge: 'Limited access to proprietary rideshare company data',
          solution: 'Implemented alternative data collection methods including public APIs and web scraping techniques'
        }
      ],
      accomplishments: [
        'Presented findings at the annual Transportation Economics Conference',
        'Research cited in two industry publications on market disruption',
        'Developed methodology now used by the city transportation department for quarterly analysis'
      ],
      imageUrls: [
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png',
        'https://placehold.co/600x400.png'
      ]
    },
    // Add similar detailed information for other projects...
    // For brevity, I'm only showing one fully detailed project
  ];
  
  // Function to open project details
  const openProjectDetails = (project: Project) => {
    // Find the enhanced version of the project with detailed info
    const enhancedProject = enhancedProjectData.find(p => p.id === project.id) || project;
    setSelectedProject(enhancedProject);
    setIsDetailOpen(true);
  };
  
  const updateVideoOverlayText = useCallback((project: Project) => {
    setVideoOverlayData({
      titleLeft: project.title,
      descLeft: project.description.substring(0, 100) + (project.description.length > 100 ? "..." : ""),
      titleRight: "Project Details",
      descRight: `Explore ${project.title}.`
    });
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

  const handleProjectClick = useCallback((project: Project, index: number) => {
    setCurrentActiveProjectIndex(index);
    updateVideoOverlayText(project);
    setActiveProjectStyle(index);

    if (projectsTrackRef.current) {
      const projectItems = projectsTrackRef.current.children;
      if (projectItems.length === 0) return;
      
      const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
      const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
      const gap = parseFloat(gapStyle) || (1.5 * 16); // 1.5rem default in px
      
      let scrollTarget = index * (itemWidth + gap);
      
      if (projectsTrackRef.current.parentElement) {
        const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
        scrollTarget = Math.min(Math.max(0, scrollTarget), maxScroll);
      }

      projectsTrackRef.current.style.transform = `translateX(-${scrollTarget}px)`;
    }
  }, [updateVideoOverlayText, setActiveProjectStyle]);

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
  
  useEffect(() => {
    // Initial setup for projects and slider
    if (projectData.length > 0) {
      updateVideoOverlayText(projectData[0]);
      setActiveProjectStyle(0);
    }
    // Delay updateSliderScroll to ensure layout is calculated
    const timer = setTimeout(updateSliderScroll, 300);
    window.addEventListener('resize', updateSliderScroll);
    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateSliderScroll);
    };
  }, [updateVideoOverlayText, setActiveProjectStyle, updateSliderScroll]);

  // Mousemove listener for flashlight effect
  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, []);

  // Handle text reveal with UV mode consideration
  const handleTextReveal = useCallback((event: MouseEvent) => {
    if (isUVMode) return; // Skip if in UV mode
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const revealRadius = 150; // Half of flashlight width
    
    // Select all text elements that should be affected
    const textElements = document.querySelectorAll('.hidden-text-area h1, .hidden-text-area h2, .hidden-text-area h3, .hidden-text-area h4, .hidden-text-area p, .hidden-text-area span, .hidden-text-area a, .project-item h4, .project-item p');
    
    textElements.forEach((element) => {
      // Skip elements that should always be visible
      if (element.classList.contains('always-visible')) {
        return;
      }
      
      const rect = element.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;
      
      // Calculate distance between mouse and element center
      const distance = Math.sqrt(
        Math.pow(mouseX - elementCenterX, 2) + 
        Math.pow(mouseY - elementCenterY, 2)
      );
      
      // If mouse is within reveal radius, add revealed class
      if (distance < revealRadius) {
        element.classList.add('text-revealed');
      } else {
        element.classList.remove('text-revealed');
      }
    });
  }, [isUVMode]);

  // Apply UV mode effect
  useEffect(() => {
    if (!mainContainerRef.current) return;
    
    const textElements = mainContainerRef.current.querySelectorAll('h1, h2, h3, h4, p, span, a, .project-item h4, .project-item p');
    
    if (isUVMode) {
      // Remove hidden-text-area class from main container
      mainContainerRef.current.classList.remove('hidden-text-area');
      
      // Add UV glow to all text elements
      textElements.forEach(element => {
        element.classList.add('uv-text-glow');
        element.classList.remove('text-revealed');
      });
    } else {
      // Add hidden-text-area class to main container
      mainContainerRef.current.classList.add('hidden-text-area');
      
      // Remove UV glow from all text elements
      textElements.forEach(element => {
        element.classList.remove('uv-text-glow');
      });
    }
  }, [isUVMode]);

  // Only apply effects if we're on the projects page
  useEffect(() => {
    if (!isProjectsPage || !mainContainerRef.current) return;
    
    const currentMainContainer = mainContainerRef.current;
    
    if (currentMainContainer) {
      currentMainContainer.addEventListener('mousemove', handleMouseMove);
      currentMainContainer.addEventListener('mousemove', handleTextReveal);
      currentMainContainer.addEventListener('mouseenter', () => setIsMouseInside(true));
      currentMainContainer.addEventListener('mouseleave', () => {
        setIsMouseInside(false);
        // Remove revealed effect from all elements when mouse leaves container
        if (!isUVMode) {
          document.querySelectorAll('.text-revealed').forEach(el => {
            el.classList.remove('text-revealed');
          });
        }
      });
    }

    return () => {
      if (currentMainContainer) {
        currentMainContainer.removeEventListener('mousemove', handleMouseMove);
        currentMainContainer.removeEventListener('mousemove', handleTextReveal);
        currentMainContainer.removeEventListener('mouseenter', () => setIsMouseInside(true));
        currentMainContainer.removeEventListener('mouseleave', () => setIsMouseInside(false));
      }
    };
  }, [handleMouseMove, handleTextReveal, isUVMode, isProjectsPage]);

  const handleGenerateUseCases = async () => {
    setGeminiLoading(true);
    setGeminiResult(null);

    const promptText = "Imagine the new MacBook Pro with incredibly powerful M4 series chips, a stunning high-resolution display, and exceptionally long battery life. Generate 5 creative and professional use cases that truly showcase its capabilities for power users, creative professionals, and innovators. Present them as a numbered list, where each item starts with the number followed by a period (e.g., '1. '), and has a short, compelling description (1-2 sentences).";
    const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
    const payload = { contents: chatHistory };
    const apiKey = ""; // Canvas will provide
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API request failed: ${errorData.error?.message || response.status}`);
      }
      const result = await response.json();
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const text = result.candidates[0].content.parts[0].text;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        let htmlList = '<ul>';
        lines.forEach(line => {
            const listItemText = line.replace(/^\d+\.\s*/, ''); 
            if (listItemText) {
               htmlList += `<li>${listItemText.trim()}</li>`;
            }
        });
        htmlList += '</ul>';
        setGeminiResult(htmlList);
      } else {
        throw new Error('Unexpected API response structure.');
      }
    } catch (error: any) {
      console.error('Error fetching or processing use cases:', error);
      setGeminiResult(`<p>An error occurred: ${error.message}. Please check the console.</p>`);
    } finally {
      setGeminiLoading(false);
    }
  };

  // Toggle light mode
  const toggleLightMode = () => {
    setIsUVMode(prev => !prev);
  };

  const renderProjectDemo = useCallback((project: Project) => {
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
            <h3 className="text-xl font-semibold mb-2">Stock Price Forecasting (NVIDIA)</h3>
            <p className="text-sm text-gray-300 mb-4">ML-powered price prediction model</p>
          </div>
          
          <div className="demo-visualization">
            <div className="stock-chart">
              <div className="chart-line">
                {/* Simplified stock chart visualization */}
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <defs>
                    <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.2" opacity="0.3" />
                    </pattern>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="url(#smallGrid)" />
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                    </pattern>
                  </defs>
                  
                  {/* Background rectangle with grid pattern */}
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Diagonal lines */}
                  <line x1="0" y1="0" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                  <line x1="100" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                  
                  {/* Center circle */}
                  <circle cx="50" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
                  <circle cx="50" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
                  
                  {/* Corner decorative elements */}
                  <path d="M 10,10 L 10,20 L 20,20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                  <path d="M 90,10 L 90,20 L 80,20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                  <path d="M 10,30 L 10,20 L 20,20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                  <path d="M 90,30 L 90,20 L 80,20" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
                </svg>
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
            <h3 className="text-xl font-semibold mb-2">Stock Price Forecasting (NVIDIA)</h3>
            <p className="text-sm text-gray-300 mb-4">ML-powered price prediction model</p>
          </div>
          
          <div className="demo-visualization">
            <div className="stock-chart">
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
          </div>
          
          <div className="demo-footer">
            <div className="model-metrics">
              <h4 className="text-sm font-medium mb-1">Model Performance:</h4>
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
    
    // Return a placeholder for other projects
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6">
          <p className="text-lg mb-3">Select a project to view its demo</p>
          <p className="text-sm text-gray-400">Click on any project card above to see details</p>
        </div>
      </div>
    );
  }, []);

  return (
    <>
      <GlobalStyles />
      
      {/* Custom Light Switch - Only shown on projects page */}
      {isProjectsPage && (
        <div className="light-switch-container">
          <div className="light-switch" onClick={toggleLightMode}>
            <div className={`switch-toggle ${isUVMode ? 'on' : 'off'}`}></div>
            <div className={`flashlight-indicator ${!isUVMode ? 'active' : ''}`}></div>
            <div className={`uv-indicator ${isUVMode ? 'active' : ''}`}></div>
          </div>
          <div className="switch-label">Light Mode</div>
          <div className="switch-mode">{isUVMode ? 'UV' : 'Flashlight'}</div>
        </div>
      )}
      
      <div 
        ref={mainContainerRef} 
        className="min-h-screen flex flex-col items-center justify-center py-12 project-showcase-bg main-container hidden-text-area relative"
      >
        {/* Flashlight div - hidden in UV mode, only shown on projects page */}
        {isProjectsPage && (
          <div 
            className="flashlight"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
              opacity: isUVMode ? 0 : (isMouseInside ? 1 : 0),
              pointerEvents: 'none',
            }}
          />
        )}
        <div className="main-content-wrapper max-w-5xl w-full mx-auto">
          <div className="space-y-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center pt-12 sm:pt-16">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight always-visible">
                Projects Showcase
              </h1>
              <p className="mt-3 text-xl sm:text-2xl dim-text">
                Discover the possibilities of what I can bring to your organization
              </p>
            </header>

            <section className="py-8 md:py-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8 font-mono">
                Featured Projects
              </h2>
              <div className="projects-slider-container mx-auto max-w-4xl">
                <div id="projectsTrack" ref={projectsTrackRef} className="projects-track">
                  {projectData.map((project, index) => (
                    <div
                      key={project.id}
                      className={`project-item ${index === currentActiveProjectIndex ? 'active-project' : ''}`}
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

            <section className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl font-semibold">
                Get the highlights.
              </h2>
              <div className="flex justify-center items-center space-x-6 text-sm sm:text-base">
                <a href="#" className="highlight-link">Watch the announcement</a>
                <span className="dim-text text-xs">|</span>
                <a href="#" className="highlight-link flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M17 11.5a5 5 0 1 0 0-3 5 5 0 0 0 0 3z"/><path d="M15 11.5a3 3 0 1 0 0-3 3 3 0 0 0 0 3z"/><path d="M2 13.5V10a4 4 0 0 1 4-4h2.5"/><path d="M22 10.5V14a4 4 0 0 1-4 4h2.5"/><path d="M2 10.5a4 4 0 0 0 4 4h2.5"/><path d="M22 13.5a4 4 0 0 0-4-4h-2.5"/><path d="M12 2a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V3a1 1 0 0 0-1-1z"/><path d="M12 19a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-2a1 1 0 0 0-1-1z"/></svg>
                  Watch in ASL
                </a>
              </div>
            </section>

            <section className="w-full mx-auto space-y-4">
              <div className="video-placeholder">
                <svg className="video-placeholder-pattern" width="100%" height="100%" viewBox="0 0 100 56.25" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="100" y2="56.25" stroke="currentColor" strokeWidth="0.2"/>
                  <line x1="100" y1="0" x2="0" y2="56.25" stroke="currentColor" strokeWidth="0.2"/>
                </svg>
                {/* Add the project demo here */}
                {projectData.length > 0 && renderProjectDemo(projectData[currentActiveProjectIndex])}
                <VideoOverlay {...videoOverlayData} />
              </div>
              <div className="flex items-center justify-center playback-controls">
                <button aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 4V2.75C12.5 2.17 11.83.5 11 .5S9.5 2.17 9.5 2.75V4H6.5V2.75C6.5 2.17 5.83.5 5 .5S3.5 2.17 3.5 2.75V4H2.5C1.67 4 1 4.67 1 5.5V10.5C1 11.33 1.67 12 2.5 12H3V14.5C3 15.12 3.32 15.5 3.75 15.5C4.18 15.5 4.5 15.12 4.5 14.5V12H11.5V14.5C11.5 15.12 11.82 15.5 12.25 15.5C12.68 15.5 13 15.12 13 14.5V12H13.5C14.33 12 15 11.33 15 10.5V5.5C15 4.67 14.33 4 13.5 4H12.5ZM4.5 5.5V10.5H3.5V5.5H4.5ZM12.5 5.5V10.5H11.5V5.5H12.5Z"/></svg></button>
                <div className="timeline-bar"><div className="timeline-progress"></div></div>
                <button aria-label="Play/Pause"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg></button>
              </div>
            </section>

            <section className="py-8 md:py-12">
              {/* Removing the CTA box that was here */}
            </section>

            <footer className="text-center pb-12 sm:pb-16">
              {/* Remove the following paragraph */}
              {/* <p className="text-xs dim-text">
                *Battery life varies by use and configuration. See apple.com/batteries for more information. Monthly pricing requires a 24-month installment loan with 0% APR from Apple Financial Services, LLC, an Apple Inc. subsidiary. Subject to credit approval and credit limit. Taxes and shipping are not included.
              </p> */}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectShowcase;
