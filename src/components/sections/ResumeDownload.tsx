"use client";

import { useState } from 'react';
import { FaDownload, FaFileAlt, FaEye, FaCheck } from 'react-icons/fa';
import { MdDescription, MdPictureAsPdf } from 'react-icons/md';

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
    <section id="resume" className="w-full py-28 md:py-40 relative z-10 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl mb-6 font-mono">
            Download My Resume
          </h2>
          <div className="h-2 w-48 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-mono leading-relaxed">
            Get a comprehensive overview of my experience, skills, and achievements in data science and web development.
          </p>
        </div>

        {/* Resume Download Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-12">
            {/* Resume Preview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Resume Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
                    <MdPictureAsPdf className="h-8 w-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 font-mono">
                      Professional Resume
                    </h3>
                    <p className="text-gray-600 font-mono">
                      Gabriel Mancillas - Data Science Graduate Student
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MdDescription className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 font-mono">
                      Complete work experience and education history
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaFileAlt className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 font-mono">
                      Technical skills and project highlights
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FaCheck className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 font-mono">
                      Professional references and contact information
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 font-mono">
                    <strong>File Details:</strong> PDF format, optimized for ATS systems, 
                    includes contact information: gabrielmancillas1034@icloud.com | (619) 714-1285
                  </p>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-2xl text-center">
                  <h4 className="text-2xl font-bold text-gray-900 mb-4 font-mono">
                    Ready to Download?
                  </h4>
                  <p className="text-gray-600 font-mono mb-6">
                    Get instant access to my complete professional resume
                  </p>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`w-full mb-4 px-8 py-4 rounded-xl font-semibold transition-all duration-300 font-mono text-lg flex items-center justify-center gap-3 ${
                      downloadComplete
                        ? 'bg-green-600 hover:bg-green-700'
                        : isDownloading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-primary hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                    style={{
                      color: '#ffffff !important',
                      textShadow: 'none !important'
                    }}
                  >
                    {downloadComplete ? (
                      <>
                        <FaCheck className="text-xl" style={{ color: '#ffffff !important' }} />
                        <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                          Downloaded Successfully!
                        </span>
                      </>
                    ) : isDownloading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                          Downloading...
                        </span>
                      </>
                    ) : (
                      <>
                        <FaDownload className="text-xl" style={{ color: '#ffffff !important' }} />
                        <span style={{ color: '#ffffff !important', textShadow: 'none !important' }}>
                          Download Resume (PDF)
                        </span>
                      </>
                    )}
                  </button>

                  {/* Preview Button */}
                  <button
                    onClick={handlePreview}
                    className="w-full px-8 py-4 rounded-xl font-semibold transition-all duration-300 font-mono text-lg flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <FaEye className="text-xl" />
                    <span>Preview Resume</span>
                  </button>
                </div>

                {/* Additional Info */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 font-mono">
                    File size: ~250KB | Last updated: January 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Download Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <FaFileAlt className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-mono">
              ATS Optimized
            </h3>
            <p className="text-gray-600 font-mono">
              Formatted for Applicant Tracking Systems used by major companies and recruiters.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <FaDownload className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-mono">
              Instant Access
            </h3>
            <p className="text-gray-600 font-mono">
              Download immediately with no forms to fill out or email required.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <MdDescription className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 font-mono">
              Complete Profile
            </h3>
            <p className="text-gray-600 font-mono">
              Comprehensive overview of skills, experience, and achievements in one document.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeDownload;
