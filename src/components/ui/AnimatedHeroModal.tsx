"use client";

import React, { useState, useEffect } from 'react';
import { FaTimes, FaRocket, FaChartLine, FaCogs } from 'react-icons/fa';

interface AnimatedHeroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnimatedHeroModal: React.FC<AnimatedHeroModalProps> = ({ isOpen, onClose }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const phases = [
    {
      title: "Pioneering the Future",
      subtitle: "of Data Intelligence",
      icon: <FaRocket className="w-16 h-16 text-blue-500" />,
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Advanced Analytics",
      subtitle: "meets Strategic Innovation",
      icon: <FaChartLine className="w-16 h-16 text-green-500" />,
      color: "from-green-600 to-blue-600"
    },
    {
      title: "Transforming Challenges",
      subtitle: "into Competitive Advantages",
      icon: <FaCogs className="w-16 h-16 text-purple-500" />,
      color: "from-purple-600 to-pink-600"
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentPhase(0);
      setShowContent(false);
      return;
    }

    setShowContent(true);
    
    const phaseInterval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % phases.length);
    }, 3000);

    return () => clearInterval(phaseInterval);
  }, [isOpen, phases.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)'
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: showContent ? 'scale(1)' : 'scale(0.8)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        >
          <FaTimes className="w-6 h-6 text-gray-600" />
        </button>

        {/* Animated Background Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${phases[currentPhase].color} opacity-10 transition-all duration-1000`}
        />

        {/* Content Container */}
        <div className="relative p-12 text-center">
          {/* Animated Icon */}
          <div 
            className="flex justify-center mb-8"
            style={{
              transform: showContent ? 'translateY(0)' : 'translateY(-50px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}
          >
            <div className="animate-bounce">
              {phases[currentPhase].icon}
            </div>
          </div>

          {/* Main Title with Typewriter Effect */}
          <h1 
            className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
            style={{
              transform: showContent ? 'translateY(0)' : 'translateY(30px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
            }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {phases[currentPhase].title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 
            className="text-3xl md:text-4xl font-semibold text-gray-600 mb-8"
            style={{
              transform: showContent ? 'translateY(0)' : 'translateY(30px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s'
            }}
          >
            {phases[currentPhase].subtitle}
          </h2>

          {/* Animated Divider */}
          <div 
            className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"
            style={{
              transform: showContent ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s'
            }}
          />

          {/* Description Text */}
          <p 
            className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8"
            style={{
              transform: showContent ? 'translateY(0)' : 'translateY(30px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1s'
            }}
          >
            Where advanced analytics meets strategic innovation. Transforming enterprise challenges into competitive advantages through cutting-edge machine learning, financial engineering, and scalable data architectures that drive quantifiable business outcomes.
          </p>

          {/* Key Points with Staggered Animation */}
          <div 
            className="grid md:grid-cols-3 gap-6 mt-12"
            style={{
              transform: showContent ? 'translateY(0)' : 'translateY(30px)',
              opacity: showContent ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.2s'
            }}
          >
            {[
              { title: "Machine Learning", desc: "Advanced AI algorithms" },
              { title: "Financial Engineering", desc: "Strategic optimization" },
              { title: "Scalable Architecture", desc: "Enterprise solutions" }
            ].map((item, index) => (
              <div 
                key={item.title}
                className="p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                style={{
                  transform: showContent ? 'translateY(0)' : 'translateY(30px)',
                  opacity: showContent ? 1 : 0,
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${1.4 + index * 0.2}s`
                }}
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Phase Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {phases.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index === currentPhase 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentPhase(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedHeroModal;
