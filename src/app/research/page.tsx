import React from 'react';
import { Metadata } from 'next';
import ResearchShowcase from '../../components/sections/ResearchShowcase';

export const metadata: Metadata = {
  title: 'Research - Gabriel Mancillas',
  description: 'Academic research, publications, and scholarly contributions in Data Science, Machine Learning, and Analytics',
  keywords: ['research', 'publications', 'data science', 'machine learning', 'analytics', 'academic'],
};

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <ResearchShowcase />
    </div>
  );
}
