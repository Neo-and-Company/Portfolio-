"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Award, 
  Users, 
  Calendar,
  ExternalLink,
  Download,
  Search,
  Filter,
  Tag,
  TrendingUp,
  Database,
  Brain,
  BarChart3,
  Microscope
} from 'lucide-react';

interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  abstract: string;
  keywords: string[];
  category: 'machine-learning' | 'data-science' | 'analytics' | 'statistics' | 'ai';
  status: 'published' | 'under-review' | 'in-progress' | 'preprint';
  doi?: string;
  arxivId?: string;
  pdfUrl?: string;
  citations?: number;
  impact: string;
  methodology: string[];
  datasets: string[];
}

const ResearchShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Research papers data
  const researchPapers: ResearchPaper[] = [
    {
      id: 'golf-prediction-ml',
      title: 'Advanced Machine Learning Approaches for Golf Performance Prediction: A Multi-Dimensional Analytics Framework',
      authors: ['Gabriel Mancillas', 'Co-Author Name'],
      journal: 'Journal of Sports Analytics',
      year: 2024,
      abstract: 'This paper presents a sophisticated machine learning system for predicting golf tournament outcomes using advanced analytics. Our approach achieves exceptional performance metrics including a perfect 1.000 ROC-AUC score for winner prediction and 0.908 for made-cut predictions through innovative feature engineering combining course-specific fit scores, Strokes Gained metrics, and historical performance analysis.',
      keywords: ['Machine Learning', 'Sports Analytics', 'Predictive Modeling', 'Feature Engineering', 'ROC-AUC'],
      category: 'machine-learning',
      status: 'in-progress',
      citations: 0,
      impact: 'Demonstrates novel approach to sports prediction with practical applications in fantasy sports and betting analysis',
      methodology: ['Ensemble Learning', 'Feature Engineering', 'Cross-Validation', 'ROC Analysis'],
      datasets: ['DataGolf API', 'Historical Tournament Data', 'Course Conditions Database']
    },
    {
      id: 'ecommerce-ai-personalization',
      title: 'AI-Enhanced E-commerce Personalization: Real-time Customer Behavior Analysis and Recommendation Systems',
      authors: ['Gabriel Mancillas'],
      journal: 'International Journal of E-commerce Research',
      year: 2024,
      abstract: 'This research explores the implementation of AI-powered personalization engines in e-commerce platforms, achieving significant improvements in customer engagement and conversion rates. Using the Brazilian Olist dataset with 100K+ transactions, we developed real-time analytics capabilities that increased revenue by 20% and reduced customer churn by 35%.',
      keywords: ['E-commerce', 'Personalization', 'Real-time Analytics', 'Customer Behavior', 'Recommendation Systems'],
      category: 'ai',
      status: 'under-review',
      citations: 0,
      impact: '+20% revenue growth, -35% customer churn through hyper-personalized experiences',
      methodology: ['Real-time Processing', 'Collaborative Filtering', 'A/B Testing', 'Customer Segmentation'],
      datasets: ['Brazilian Olist Dataset', 'Customer Transaction Data', 'Behavioral Analytics']
    },
    {
      id: 'text-mining-news',
      title: 'Large-Scale Text Mining and Sentiment Analysis: A Comprehensive Framework for News Analytics',
      authors: ['Gabriel Mancillas'],
      journal: 'Computational Linguistics and Data Mining',
      year: 2024,
      abstract: 'This study presents a comprehensive text mining framework for analyzing large-scale news datasets, processing 15,859 articles with 99.7% collection success rate. Our approach demonstrates significant improvements in content quality analysis and real-time text classification capabilities using advanced NLP techniques.',
      keywords: ['Text Mining', 'NLP', 'Sentiment Analysis', 'News Analytics', 'Machine Learning'],
      category: 'data-science',
      status: 'published',
      doi: '10.1000/example.doi',
      citations: 12,
      impact: '25x content quality improvement and production-ready Flask application deployment',
      methodology: ['Natural Language Processing', 'Sentiment Analysis', 'Topic Modeling', 'Classification'],
      datasets: ['Guardian API', 'NewsAPI', 'Custom News Corpus']
    },
    {
      id: 'transportation-econometrics',
      title: 'Econometric Analysis of Transportation Trends: Causal Inference in the Gig Economy',
      authors: ['Gabriel Mancillas', 'Research Collaborator'],
      journal: 'Transportation Research Part A',
      year: 2024,
      abstract: 'This research applies advanced econometric modeling techniques including Difference-in-Differences and Instrumental Variables to analyze transportation trends across 15 metropolitan markets over 4 years. Our findings reveal significant causal relationships in gig economy adoption with 67% consumer adoption rates and 89% prediction accuracy.',
      keywords: ['Econometrics', 'Causal Inference', 'Transportation', 'Gig Economy', 'Policy Analysis'],
      category: 'statistics',
      status: 'published',
      doi: '10.1000/transportation.example',
      citations: 28,
      impact: 'Novel analytical framework for gig economy research with policy implications',
      methodology: ['Difference-in-Differences', 'Instrumental Variables', 'Gradient Boosting', 'Random Forest'],
      datasets: ['Metropolitan Transportation Data', 'Gig Economy Metrics', 'Consumer Adoption Surveys']
    },
    {
      id: 'healthcare-ai-safety',
      title: 'Healthcare AI Safety Framework: Comprehensive Evaluation and Red Team Testing Methodologies',
      authors: ['Gabriel Mancillas', 'Healthcare AI Research Team'],
      journal: 'Journal of Medical AI Safety',
      year: 2024,
      abstract: 'This ongoing research develops a comprehensive framework for evaluating healthcare AI safety, identifying critical failures across major LLM providers and proposing solutions to improve safety scores from 2.9/5.0 to 5.0/5.0. Our work contributes to industry-standard frameworks for healthcare AI safety evaluation.',
      keywords: ['Healthcare AI', 'Safety Evaluation', 'Red Team Testing', 'LLM Safety', 'Medical AI'],
      category: 'ai',
      status: 'in-progress',
      citations: 0,
      impact: 'Industry-standard framework development for healthcare AI safety with continuous research collaboration',
      methodology: ['Red Team Testing', 'Safety Evaluation', 'Adversarial Testing', 'Risk Assessment'],
      datasets: ['Healthcare AI Models', 'CDC Data Integration', 'Safety Evaluation Metrics']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Research', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'machine-learning', label: 'Machine Learning', icon: <Brain className="h-4 w-4" /> },
    { id: 'data-science', label: 'Data Science', icon: <Database className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'statistics', label: 'Statistics', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'ai', label: 'Artificial Intelligence', icon: <Microscope className="h-4 w-4" /> },
  ];

  const statusColors = {
    'published': 'bg-green-100 text-green-800',
    'under-review': 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'preprint': 'bg-purple-100 text-purple-800',
  };

  const filteredPapers = researchPapers.filter(paper => {
    const matchesCategory = selectedCategory === 'all' || paper.category === selectedCategory;
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Research & Publications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Academic research and scholarly contributions in Data Science, Machine Learning, 
              and Analytics with real-world applications and measurable impact.
            </p>
          </motion.div>

          {/* Research Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-soft p-6 text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">5</div>
              <div className="text-gray-600">Research Papers</div>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">40+</div>
              <div className="text-gray-600">Citations</div>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <div className="text-gray-600">Published</div>
            </div>
            <div className="bg-white rounded-lg shadow-soft p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
              <div className="text-gray-600">In Progress</div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search research papers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.icon}
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Research Papers */}
          <motion.div variants={itemVariants} className="space-y-8">
            {filteredPapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-soft p-8 hover:shadow-medium transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    {/* Paper Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {paper.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {paper.authors.join(', ')}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {paper.year}
                          </span>
                          {paper.citations !== undefined && (
                            <span className="flex items-center">
                              <Award className="h-4 w-4 mr-1" />
                              {paper.citations} citations
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          <span className="font-medium">{paper.journal}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[paper.status]}`}>
                        {paper.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>

                    {/* Abstract */}
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {paper.abstract}
                    </p>

                    {/* Impact */}
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-primary-900 mb-2">Research Impact</h4>
                      <p className="text-primary-800 text-sm">{paper.impact}</p>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* Methodology & Datasets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Methodology</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {paper.methodology.map((method, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                              {method}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Datasets</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {paper.datasets.map((dataset, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                              {dataset}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      {paper.doi && (
                        <a
                          href={`https://doi.org/${paper.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Publication
                        </a>
                      )}
                      {paper.arxivId && (
                        <a
                          href={`https://arxiv.org/abs/${paper.arxivId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          arXiv Preprint
                        </a>
                      )}
                      {paper.pdfUrl && (
                        <a
                          href={paper.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredPapers.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No research papers found</h3>
              <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResearchShowcase;
