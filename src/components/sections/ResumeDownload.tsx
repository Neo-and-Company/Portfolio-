"use client";

import { useState } from 'react';
import { FaDownload, FaFileAlt, FaEye, FaCheck } from 'react-icons/fa';
import { MdDescription, MdPictureAsPdf } from 'react-icons/md';
import { LiquidGlassCard, LiquidGlassText, LiquidGlassButton } from '@/components/ui/LiquidGlass';

const ResumeDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = '/Resume_25.pdf';
      link.download = 'Gabriel_Mancillas_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show download complete state
      setTimeout(() => {
        setIsDownloading(false);
        setDownloadComplete(true);
        
        // Reset after 3 seconds
        setTimeout(() => {
          setDownloadComplete(false);
        }, 3000);
      }, 1000);
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
    }
  };

  const handlePreview = () => {
    window.open('/Resume_25.pdf', '_blank');
  };

  return (
    <section id="resume" className="w-full py-28 md:py-40 relative z-10 section-fade-in bg-background">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <LiquidGlassText
            variant="accent"
            as="h2"
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl mb-6 font-mono"
          >
            Download My Resume
          </LiquidGlassText>
          <div className="h-2 w-48 bg-primary mx-auto mb-8 rounded-full" />
          <LiquidGlassText
            variant="primary"
            as="p"
            className="text-xl md:text-2xl max-w-4xl mx-auto font-mono leading-relaxed"
          >
            Get a comprehensive overview of my experience, skills, and achievements in data science and web development.
          </LiquidGlassText>
        </div>

        {/* Resume Download Card */}
        <div className="max-w-4xl mx-auto">
          <LiquidGlassCard
            className="p-8 md:p-12"
            config={{
              opacity: 0.18,
              blur: 28,
              saturation: 125,
              brightness: 110,
              shadowIntensity: 0.06,
              borderOpacity: 0.3
            }}
          >
            {/* Resume Preview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Resume Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <MdPictureAsPdf className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <LiquidGlassText
                      variant="accent"
                      as="h3"
                      className="text-3xl font-bold font-mono"
                    >
                      Professional Resume
                    </LiquidGlassText>
                    <LiquidGlassText
                      variant="secondary"
                      as="p"
                      className="font-mono"
                    >
                      Gabriel Mancillas - Data Science Graduate Student
                    </LiquidGlassText>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MdDescription className="h-5 w-5 text-primary" />
                    <LiquidGlassText
                      variant="primary"
                      as="span"
                      className="font-mono"
                    >
                      Complete work experience and education history
                    </LiquidGlassText>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="h-5 w-5 text-primary" />
                    <LiquidGlassText
                      variant="primary"
                      as="span"
                      className="font-mono"
                    >
                      Technical skills and project highlights
                    </LiquidGlassText>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheck className="h-5 w-5 text-primary" />
                    <LiquidGlassText
                      variant="primary"
                      as="span"
                      className="font-mono"
                    >
                      Professional references and contact information
                    </LiquidGlassText>
                  </div>
                </div>

                <LiquidGlassCard
                  className="p-4"
                  config={{
                    opacity: 0.12,
                    blur: 20,
                    saturation: 120,
                    brightness: 105,
                    shadowIntensity: 0.03,
                    borderOpacity: 0.25
                  }}
                >
                  <LiquidGlassText
                    variant="secondary"
                    as="p"
                    className="text-sm font-mono"
                  >
                    <strong>File Details:</strong> PDF format, optimized for ATS systems,
                    includes contact information: gabrielmancillas1034@icloud.com | (619) 714-1285
                  </LiquidGlassText>
                </LiquidGlassCard>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="space-y-6">
                <LiquidGlassCard
                  className="p-8 text-center"
                  config={{
                    opacity: 0.15,
                    blur: 25,
                    saturation: 130,
                    brightness: 108,
                    shadowIntensity: 0.04,
                    borderOpacity: 0.3
                  }}
                >
                  <LiquidGlassText
                    variant="accent"
                    as="h4"
                    className="text-2xl font-bold mb-4 font-mono"
                  >
                    Ready to Download?
                  </LiquidGlassText>
                  <LiquidGlassText
                    variant="primary"
                    as="p"
                    className="font-mono mb-6"
                  >
                    Get instant access to my complete professional resume
                  </LiquidGlassText>

                  {/* Download Button */}
                  <LiquidGlassButton
                    onClick={handleDownload}
                    disabled={isDownloading || downloadComplete}
                    className={`w-full mb-4 px-8 py-4 font-semibold text-lg flex items-center justify-center gap-3 ${
                      downloadComplete
                        ? 'cursor-default'
                        : isDownloading
                        ? 'cursor-not-allowed'
                        : 'hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                    textVariant={downloadComplete ? "accent" : "primary"}
                    config={{
                      opacity: downloadComplete ? 0.25 : isDownloading ? 0.15 : 0.22,
                      blur: 24,
                      saturation: 135,
                      brightness: downloadComplete ? 115 : isDownloading ? 105 : 112,
                      shadowIntensity: 0.08
                    }}
                    style={{
                      backgroundColor: downloadComplete
                        ? 'rgba(34, 197, 94, 0.2)'
                        : isDownloading
                        ? 'rgba(107, 114, 128, 0.2)'
                        : 'rgba(79, 70, 229, 0.2)',
                      color: downloadComplete
                        ? '#16a34a'
                        : isDownloading
                        ? '#6b7280'
                        : '#4f46e5'
                    }}
                  >
                    {downloadComplete ? (
                      <>
                        <FaCheck className="text-xl" />
                        <span>Downloaded Successfully!</span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <FaDownload className="text-xl" />
                        <span>Download Resume PDF</span>
                      </>
                    )}
                  </LiquidGlassButton>

                  {/* Preview Button */}
                  <LiquidGlassButton
                    onClick={handlePreview}
                    className="w-full px-8 py-4 font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-md hover:-translate-y-0.5"
                    textVariant="secondary"
                    config={{
                      opacity: 0.18,
                      blur: 22,
                      saturation: 125,
                      brightness: 108,
                      shadowIntensity: 0.06
                    }}
                  >
                    <FaEye className="text-xl" />
                    <span>Preview Resume</span>
                  </LiquidGlassButton>
                </LiquidGlassCard>

                {/* Additional Info */}
                <div className="text-center">
                  <LiquidGlassText
                    variant="secondary"
                    as="p"
                    className="text-sm font-mono"
                  >
                    File size: ~250KB | Last updated: July 2025
                  </LiquidGlassText>
                </div>
              </div>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Why Download Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <LiquidGlassCard
            className="p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            config={{
              opacity: 0.16,
              blur: 30,
              saturation: 128,
              brightness: 109,
              shadowIntensity: 0.05,
              borderOpacity: 0.25
            }}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FaFileAlt className="h-6 w-6 text-blue-600" />
            </div>
            <LiquidGlassText
              variant="accent"
              as="h3"
              className="text-xl font-bold mb-3 font-mono"
            >
              ATS Optimized
            </LiquidGlassText>
            <LiquidGlassText
              variant="primary"
              as="p"
              className="font-mono"
            >
              Formatted for Applicant Tracking Systems used by major companies and recruiters.
            </LiquidGlassText>
          </LiquidGlassCard>

          <LiquidGlassCard
            className="p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            config={{
              opacity: 0.16,
              blur: 30,
              saturation: 128,
              brightness: 109,
              shadowIntensity: 0.05,
              borderOpacity: 0.25
            }}
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FaDownload className="h-6 w-6 text-green-600" />
            </div>
            <LiquidGlassText
              variant="accent"
              as="h3"
              className="text-xl font-bold mb-3 font-mono"
            >
              Instant Access
            </LiquidGlassText>
            <LiquidGlassText
              variant="primary"
              as="p"
              className="font-mono"
            >
              Download immediately with no forms to fill out or email required.
            </LiquidGlassText>
          </LiquidGlassCard>

          <LiquidGlassCard
            className="p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            config={{
              opacity: 0.16,
              blur: 30,
              saturation: 128,
              brightness: 109,
              shadowIntensity: 0.05,
              borderOpacity: 0.25
            }}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <MdDescription className="h-6 w-6 text-purple-600" />
            </div>
            <LiquidGlassText
              variant="accent"
              as="h3"
              className="text-xl font-bold mb-3 font-mono"
            >
              Complete Profile
            </LiquidGlassText>
            <LiquidGlassText
              variant="primary"
              as="p"
              className="font-mono"
            >
              Comprehensive overview of skills, experience, and achievements in one document.
            </LiquidGlassText>
          </LiquidGlassCard>
        </div>
      </div>
    </section>
  );
};

export default ResumeDownload;
