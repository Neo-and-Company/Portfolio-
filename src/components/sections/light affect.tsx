import React, { useState, useEffect, useRef, useCallback } from 'react';

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
}

type Theme = 'dark' | 'light';

// --- Project Data (Updated with user's provided data) ---
const projectData: Project[] = [
  {
    id: 'proj1',
    title: 'Financial Analysis of Transportation Trends (Capstone)',
    description: 'Conducted a statistical analysis on the economic impact of Uber and rideshare platforms versus traditional taxis. Utilized R and Tableau to extract, clean, and visualize data, presenting findings on transportation disruption trends.',
    technologies: ['R', 'Tableau', 'Statistical Analysis', 'Data Visualization'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
    repoUrl: 'https://github.com',
    demoUrl: '#',
    mediaType: 'image', // Added based on user data structure
  },
  {
    id: 'proj2',
    title: 'Stock Price Forecasting (NVIDIA) & Lemon Quality Testing',
    description: 'Designed and deployed a stock price forecasting model using Amazon SageMaker’s DeepAR. Leveraged historical market data and technical indicators for improved prediction accuracy. Additionally, developed an image classification model on SageMaker for assessing lemon quality via visual inspection, demonstrating versatility in applying ML to diverse problem domains. Achieved 94% F-1 Score for stock forecasting.',
    technologies: ['Python', 'AWS SageMaker', 'DeepAR', 'TensorFlow', 'Scikit-learn', 'Time Series Analysis', 'Image Classification', 'Computer Vision'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
    repoUrl: 'https://github.com',
    mediaType: 'rotating-images',
    imageUrls: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
  },
  {
    id: 'proj3',
    title: 'ETL Schema and Pipeline (AWS RDS)',
    description: 'Built a robust ETL data pipeline using Python and AWS RDS/MySQL, featuring schema design, database optimization, and automated reporting. Implemented AWS security (IAM, RDS Proxy, Secrets Manager) for secure, scalable data handling.',
    technologies: ['Python', 'AWS RDS', 'MySQL', 'ETL', 'IAM', 'AWS Secrets Manager', 'Database Optimization'],
    image: 'https://placehold.co/600x400.png', // Was imageUrl
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
];

// --- Global Styles (for elements hard to style with Tailwind alone) ---
const GlobalStyles: React.FC<{ theme: Theme }> = ({ theme }) => (
  <style>{`
    :root {
      --bg-color: ${theme === 'dark' ? '#111112' : '#f5f5f7'};
      --text-color: ${theme === 'dark' ? '#f5f5f7' : '#1d1d1f'};
      --dim-text-color: ${theme === 'dark' ? '#86868b' : '#55555c'};
      --card-bg-color: ${theme === 'dark' ? '#1d1d1f' : '#ffffff'};
      --border-color: ${theme === 'dark' ? '#333' : '#e5e5e5'};
      --highlight-link-color: ${theme === 'dark' ? '#2997ff' : '#0066cc'};
      --slider-track-color: ${theme === 'dark' ? '#333' : '#ccc'};
      --slider-thumb-bg-color: ${theme === 'dark' ? '#111112' : '#f5f5f7'};
      --button-primary-bg: ${theme === 'dark' ? '#0071e3' : '#007aff'};
      --button-primary-text: #ffffff;
      --video-placeholder-bg: ${theme === 'dark' ? '#000000' : '#e0e0e0'};
      --flashlight-gradient-start: ${theme === 'dark' ? 'rgba(220, 220, 200, 0.15)' : 'rgba(50, 50, 80, 0.15)'};
      --flashlight-gradient-mid: ${theme === 'dark' ? 'rgba(200, 200, 180, 0.1)' : 'rgba(30, 30, 60, 0.1)'};
      --flashlight-gradient-end: ${theme === 'dark' ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)'};
      --flashlight-blend-mode: ${theme === 'dark' ? 'overlay' : 'multiply'};
    }
    body {
        font-family: 'Inter', sans-serif;
        background-color: var(--bg-color);
        color: var(--text-color);
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    .projects-range-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        max-width: 400px;
        height: 8px;
        background: var(--slider-track-color);
        border-radius: 4px;
        outline: none;
        opacity: 0.7;
        transition: opacity .2s, background-color 0.3s ease;
        margin-top: 1.5rem;
    }
    .projects-range-slider:hover {
        opacity: 1;
    }
    .projects-range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background: var(--button-primary-bg);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid var(--slider-thumb-bg-color);
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    .projects-range-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        background: var(--button-primary-bg);
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid var(--slider-thumb-bg-color);
        transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    .dim-text { color: var(--dim-text-color); transition: color 0.3s ease; }
    .highlight-link { color: var(--highlight-link-color); text-decoration: none; transition: color 0.3s ease;}
    .highlight-link:hover { text-decoration: underline; }
    
    .video-text-overlay {
        position: absolute;
        padding: 1rem; 
        text-align: left;
        color: var(--text-color); /* Use text-color for overlays */
        transition: opacity 0.3s ease-in-out, color 0.3s ease; 
    }
    .video-text-overlay-left {
        left: 20px; 
        bottom: 20px; 
        max-width: 45%; 
    }
    .video-text-overlay-right {
        right: 20px; 
        bottom: 20px; 
        text-align: right;
        max-width: 45%; 
    }
    .video-text-overlay h3 {
        font-size: 1.25rem; 
        font-weight: 600; 
        margin-bottom: 0.25rem; 
    }
    .video-text-overlay p {
        font-size: 0.875rem; 
        color: var(--dim-text-color); /* Use dim-text-color for overlay paragraphs */
        transition: color 0.3s ease;
    }
    .project-item {
        background-color: var(--card-bg-color);
        transition: background-color 0.3s ease, transform 0.2s ease-out, box-shadow 0.2s ease-out;
    }
    .project-item.active-project { 
        outline: 2px solid var(--button-primary-bg);
        outline-offset: 2px;
        transition: outline-color 0.3s ease;
    }
    .video-placeholder {
        background-color: var(--video-placeholder-bg);
        transition: background-color 0.3s ease;
    }
    .gemini-feature-btn {
        background-color: var(--button-primary-bg);
        color: var(--button-primary-text);
        transition: background-color 0.2s ease-in-out;
    }
    .gemini-feature-btn:hover {
        background-color: ${theme === 'dark' ? '#0077ed' : '#0056b3'};
    }
    #useCasesResult {
        background-color: var(--card-bg-color);
        border: 1px solid var(--border-color);
        color: var(--text-color);
        transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    }
    .flashlight {
        position: fixed; 
        border-radius: 50%;
        width: 300px; 
        height: 300px; 
        pointer-events: none; 
        z-index: 9999; 
        background: radial-gradient(circle, var(--flashlight-gradient-start) 0%, var(--flashlight-gradient-mid) 20%, var(--flashlight-gradient-end) 60%);
        mix-blend-mode: var(--flashlight-blend-mode); 
        transition: transform 0.05s ease-out, opacity 0.2s ease-in-out, background 0.3s ease; 
        opacity: 0; 
    }
    .main-container:hover .flashlight { 
        opacity: 1;
    }

  `}</style>
);


// --- Reusable Components ---

interface VideoOverlayProps {
  titleLeft: string;
  descLeft: string;
  titleRight: string;
  descRight: string;
}

const VideoOverlay: React.FC<VideoOverlayProps> = ({ titleLeft, descLeft, titleRight, descRight }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => setVisible(true), 150); 
        return () => clearTimeout(timer);
    }, [titleLeft, descLeft, titleRight, descRight]);


  return (
    <>
      <div className={`video-text-overlay video-text-overlay-left transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-1">{titleLeft}</h3>
        <p className="text-base sm:text-lg">{descLeft}</p> {/* Removed dim-text class, will inherit from CSS var */}
      </div>
      <div className={`video-text-overlay video-text-overlay-right transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-1">{titleRight}</h3>
        <p className="text-base sm:text-lg">{descRight}</p> {/* Removed dim-text class */}
      </div>
    </>
  );
};


// --- Main Application Component ---
const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
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


  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const projectRangeSliderRef = useRef<HTMLInputElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null); 

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
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

    if (projectsTrackRef.current && projectsTrackRef.current.children[index]) {
      const projectDiv = projectsTrackRef.current.children[index] as HTMLElement;
      const itemWidth = projectDiv.offsetWidth;
      const gapStyle = getComputedStyle(projectsTrackRef.current).gap;
      const gap = parseFloat(gapStyle) || (1.5 * 16); 
      
      let scrollTarget = index * (itemWidth + gap);
      
      if (projectsTrackRef.current.parentElement) {
        const maxScroll = projectsTrackRef.current.scrollWidth - projectsTrackRef.current.parentElement.offsetWidth;
        scrollTarget = Math.min(Math.max(0, scrollTarget), maxScroll);
      }

      projectsTrackRef.current.style.transform = `translateX(-${scrollTarget}px)`;
      if (projectRangeSliderRef.current) {
        projectRangeSliderRef.current.value = String(scrollTarget);
      }
    }
  }, [updateVideoOverlayText, setActiveProjectStyle]);

  const updateSliderScroll = useCallback(() => {
    if (!projectsTrackRef.current || !projectRangeSliderRef.current || !projectsTrackRef.current.parentElement) return;

    const projectItems = projectsTrackRef.current.children;
    if (projectItems.length === 0) {
      projectRangeSliderRef.current.style.display = 'none';
      return;
    }

    const trackContainerWidth = projectsTrackRef.current.parentElement.offsetWidth;
    const scrollWidth = projectsTrackRef.current.scrollWidth;
    const maxScroll = Math.max(0, scrollWidth - trackContainerWidth);

    if (maxScroll <= 0) {
      projectRangeSliderRef.current.style.display = 'none';
      projectsTrackRef.current.style.transform = `translateX(0px)`;
      if (projectData.length > 0) {
        updateVideoOverlayText(projectData[0]);
        setActiveProjectStyle(0);
        setCurrentActiveProjectIndex(0);
      }
      return;
    } else {
      projectRangeSliderRef.current.style.display = 'block';
    }

    projectRangeSliderRef.current.max = String(maxScroll);
    
    let currentSliderValue = parseFloat(projectRangeSliderRef.current.value || "0");
    if (currentSliderValue > maxScroll) projectRangeSliderRef.current.value = String(maxScroll);
    if (currentSliderValue < 0) projectRangeSliderRef.current.value = "0";

    const scrollAmount = parseFloat(projectRangeSliderRef.current.value || "0");
    projectsTrackRef.current.style.transform = `translateX(-${scrollAmount}px)`;

    let activeIndex = 0;
    if (projectItems.length > 0) {
        let minDistanceToStart = Infinity;
        const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
        const gap = parseFloat(getComputedStyle(projectsTrackRef.current).gap) || (1.5 * 16);
        const viewportStart = scrollAmount;

        for (let i = 0; i < projectItems.length; i++) {
            const itemLeftEdgeInTrack = i * (itemWidth + gap);
            const distance = Math.abs(itemLeftEdgeInTrack - viewportStart);
            if (distance < minDistanceToStart) {
                minDistanceToStart = distance;
                activeIndex = i;
            }
        }
    }
    setCurrentActiveProjectIndex(activeIndex);
    if(projectData[activeIndex]) {
        updateVideoOverlayText(projectData[activeIndex]);
        setActiveProjectStyle(activeIndex);
    }

  }, [updateVideoOverlayText, setActiveProjectStyle]);
  
  useEffect(() => {
    if (projectData.length > 0) {
      updateVideoOverlayText(projectData[0]);
      setActiveProjectStyle(0);
    }
    const timer = setTimeout(updateSliderScroll, 300);
    window.addEventListener('resize', updateSliderScroll);
    
    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    const currentMainContainer = mainContainerRef.current;
    if (currentMainContainer) {
        currentMainContainer.addEventListener('mousemove', handleMouseMove);
        currentMainContainer.addEventListener('mouseenter', () => setIsMouseInside(true));
        currentMainContainer.addEventListener('mouseleave', () => setIsMouseInside(false));
    }

    return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateSliderScroll);
        if (currentMainContainer) {
            currentMainContainer.removeEventListener('mousemove', handleMouseMove);
            currentMainContainer.removeEventListener('mouseenter', () => setIsMouseInside(true));
            currentMainContainer.removeEventListener('mouseleave', () => setIsMouseInside(false));
        }
    };
  }, [updateVideoOverlayText, setActiveProjectStyle, updateSliderScroll]);


  const handleSliderInput = () => {
    if (!projectsTrackRef.current || !projectRangeSliderRef.current || !projectsTrackRef.current.parentElement) return;
    
    const scrollAmount = parseFloat(projectRangeSliderRef.current.value);
    projectsTrackRef.current.style.transform = `translateX(-${scrollAmount}px)`;

    const projectItems = projectsTrackRef.current.children;
    let activeIndex = 0;
    if (projectItems.length > 0) {
        let minDistanceToStart = Infinity;
        const itemWidth = (projectItems[0] as HTMLElement).offsetWidth;
        const gap = parseFloat(getComputedStyle(projectsTrackRef.current).gap) || (1.5 * 16);
        const viewportStart = scrollAmount;

        for (let i = 0; i < projectItems.length; i++) {
            const itemLeftEdgeInTrack = i * (itemWidth + gap);
            const distance = Math.abs(itemLeftEdgeInTrack - viewportStart);
            if (distance < minDistanceToStart) {
                minDistanceToStart = distance;
                activeIndex = i;
            }
        }
    }
    setCurrentActiveProjectIndex(activeIndex);
    if(projectData[activeIndex]){
        updateVideoOverlayText(projectData[activeIndex]);
        setActiveProjectStyle(activeIndex);
    }
  };

  const handleGenerateUseCases = async () => {
    setGeminiLoading(true);
    setGeminiResult(null);

    const promptText = "Imagine the new MacBook Pro with incredibly powerful M4 series chips, a stunning high-resolution display, and exceptionally long battery life. Generate 5 creative and professional use cases that truly showcase its capabilities for power users, creative professionals, and innovators. Present them as a numbered list, where each item starts with the number followed by a period (e.g., '1. '), and has a short, compelling description (1-2 sentences).";
    const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
    const payload = { contents: chatHistory };
    const apiKey = ""; 
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


  return (
    <>
      <GlobalStyles theme={theme} />
      <div 
        ref={mainContainerRef} 
        className="min-h-screen flex flex-col items-center justify-center py-12 main-container relative"
      >
        <div 
            className="flashlight"
            style={{
                left: `${mousePosition.x}px`,
                top: `${mousePosition.y}px`,
                transform: 'translate(-50%, -50%)', 
                opacity: isMouseInside ? 1 : 0, 
            }}
        />

        <div className="main-content-wrapper max-w-5xl w-full mx-auto">
          <div className="space-y-12 px-4 sm:px-6 lg:px-8">
            <header className="text-center pt-12 sm:pt-16 relative"> {/* Added relative for button positioning */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight">
                MacBook Pro
              </h1>
              <p className="mt-3 text-xl sm:text-2xl dim-text">
                From $1599 or $133.25/mo. for 12 mo.*
              </p>
              <button
                onClick={toggleTheme}
                className="absolute top-4 right-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--bg-color)] focus:ring-[var(--button-primary-bg)]"
                style={{ 
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                    color: 'var(--text-color)'
                }}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'} Mode
              </button>
            </header>

            <section className="py-8 md:py-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">
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
                      <img src={project.image} alt={project.title} onError={(e) => ((e.target as HTMLImageElement).src = 'https://placehold.co/320x200/2a2a2d/555555?text=Image+Error')} />
                      <h4>{project.title}</h4>
                      <p>{project.description.substring(0, 50)}...</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <input 
                    type="range" 
                    id="projectRangeSlider" 
                    ref={projectRangeSliderRef} 
                    className="projects-range-slider" 
                    min="0" 
                    defaultValue="0"
                    onInput={handleSliderInput}
                />
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
                <VideoOverlay {...videoOverlayData} />
              </div>
              <div className="flex items-center justify-center playback-controls">
                <button aria-label="Previous"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M12.5 4V2.75C12.5 2.17 11.83.5 11 .5S9.5 2.17 9.5 2.75V4H6.5V2.75C6.5 2.17 5.83.5 5 .5S3.5 2.17 3.5 2.75V4H2.5C1.67 4 1 4.67 1 5.5V10.5C1 11.33 1.67 12 2.5 12H3V14.5C3 15.12 3.32 15.5 3.75 15.5C4.18 15.5 4.5 15.12 4.5 14.5V12H11.5V14.5C11.5 15.12 11.82 15.5 12.25 15.5C12.68 15.5 13 15.12 13 14.5V12H13.5C14.33 12 15 11.33 15 10.5V5.5C15 4.67 14.33 4 13.5 4H12.5ZM4.5 5.5V10.5H3.5V5.5H4.5ZM12.5 5.5V10.5H11.5V5.5H12.5Z"/></svg></button>
                <div className="timeline-bar"><div className="timeline-progress"></div></div>
                <button aria-label="Play/Pause"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg></button>
              </div>
            </section>

            <section className="text-center py-8 md:py-12">
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6">Discover What's Possible</h2>
              <button onClick={handleGenerateUseCases} className="gemini-feature-btn text-lg">✨ Generate Pro Use Cases</button>
              {geminiLoading && <div className="mt-4 text-lg dim-text">Loading...</div>}
              {geminiResult && (
                <div 
                    className="mt-6 p-6 rounded-xl text-left max-w-2xl mx-auto" 
                    style={{backgroundColor: 'var(--card-bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', lineHeight: 1.6}}
                    dangerouslySetInnerHTML={{ __html: geminiResult }} />
              )}
            </section>

            <footer className="text-center pb-12 sm:pb-16">
              <p className="text-xs dim-text">
                *Battery life varies by use and configuration. See apple.com/batteries for more information. Monthly pricing requires a 24-month installment loan with 0% APR from Apple Financial Services, LLC, an Apple Inc. subsidiary. Subject to credit approval and credit limit. Taxes and shipping are not included.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
