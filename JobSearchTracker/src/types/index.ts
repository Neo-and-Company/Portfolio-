// Core Types for Job Search Tracker

export interface JobApplication {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  jobDescription?: string;
  applicationDate: Date;
  status: ApplicationStatus;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    state?: string;
    country: string;
    remote: boolean;
  };
  jobUrl?: string;
  source: JobSource;
  priority: Priority;
  notes: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  
  // Contact Information
  contacts: Contact[];
  
  // Documents
  documents: Document[];
  
  // AI Analysis
  aiAnalysis?: AIAnalysis;
  
  // Follow-up tracking
  followUps: FollowUp[];
  
  // Interview tracking
  interviews: Interview[];
}

export type ApplicationStatus = 
  | 'draft'
  | 'applied'
  | 'under_review'
  | 'phone_screen'
  | 'technical_interview'
  | 'onsite_interview'
  | 'final_interview'
  | 'offer_received'
  | 'offer_accepted'
  | 'offer_declined'
  | 'rejected'
  | 'withdrawn'
  | 'ghosted';

export type JobSource = 
  | 'linkedin'
  | 'indeed'
  | 'glassdoor'
  | 'company_website'
  | 'referral'
  | 'recruiter'
  | 'job_board'
  | 'networking'
  | 'other';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Contact {
  id: string;
  name: string;
  role: string;
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  notes?: string;
  lastContactDate?: Date;
  contactType: 'recruiter' | 'hiring_manager' | 'employee' | 'hr' | 'other';
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
  uploadDate: Date;
  size: number;
  mimeType: string;
}

export type DocumentType = 
  | 'resume'
  | 'cover_letter'
  | 'portfolio'
  | 'transcript'
  | 'certificate'
  | 'reference'
  | 'other';

export interface AIAnalysis {
  skillsMatch: {
    matched: string[];
    missing: string[];
    score: number;
  };
  resumeOptimization: {
    suggestions: string[];
    keywords: string[];
    score: number;
  };
  coverLetterSuggestions: string[];
  salaryEstimate?: {
    min: number;
    max: number;
    confidence: number;
  };
  companyInsights?: {
    culture: string[];
    benefits: string[];
    workLifeBalance: number;
  };
  applicationTips: string[];
  lastAnalyzed: Date;
}

export interface FollowUp {
  id: string;
  type: FollowUpType;
  scheduledDate: Date;
  completed: boolean;
  completedDate?: Date;
  notes?: string;
  result?: string;
}

export type FollowUpType = 
  | 'application_confirmation'
  | 'status_inquiry'
  | 'thank_you'
  | 'interview_follow_up'
  | 'offer_follow_up'
  | 'networking'
  | 'custom';

export interface Interview {
  id: string;
  type: InterviewType;
  scheduledDate: Date;
  duration: number; // in minutes
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  interviewers: string[];
  status: InterviewStatus;
  notes?: string;
  feedback?: string;
  questions: InterviewQuestion[];
}

export type InterviewType = 
  | 'phone_screen'
  | 'technical'
  | 'behavioral'
  | 'panel'
  | 'onsite'
  | 'virtual'
  | 'final'
  | 'informal';

export type InterviewStatus = 
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'rescheduled'
  | 'no_show';

export interface InterviewQuestion {
  id: string;
  question: string;
  answer?: string;
  category: QuestionCategory;
  difficulty: 'easy' | 'medium' | 'hard';
}

export type QuestionCategory = 
  | 'technical'
  | 'behavioral'
  | 'situational'
  | 'company_culture'
  | 'experience'
  | 'problem_solving'
  | 'leadership'
  | 'other';

// Dashboard and Analytics Types
export interface DashboardStats {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  offersReceived: number;
  responseRate: number;
  averageResponseTime: number;
  topCompanies: CompanyStats[];
  statusDistribution: StatusDistribution[];
  applicationTrends: TrendData[];
  monthlyGoals: MonthlyGoal;
}

export interface CompanyStats {
  companyName: string;
  applications: number;
  interviews: number;
  offers: number;
}

export interface StatusDistribution {
  status: ApplicationStatus;
  count: number;
  percentage: number;
}

export interface TrendData {
  date: string;
  applications: number;
  interviews: number;
  offers: number;
}

export interface MonthlyGoal {
  target: number;
  current: number;
  percentage: number;
}

// User and Settings Types
export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  preferences: UserPreferences;
  subscription: SubscriptionPlan;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserPreferences {
  notifications: NotificationSettings;
  dashboard: DashboardSettings;
  privacy: PrivacySettings;
  integrations: IntegrationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  followUpReminders: boolean;
  interviewReminders: boolean;
  weeklyReports: boolean;
  applicationDeadlines: boolean;
}

export interface DashboardSettings {
  defaultView: 'grid' | 'list' | 'kanban';
  itemsPerPage: number;
  showCompletedApplications: boolean;
  defaultSortBy: string;
  defaultSortOrder: 'asc' | 'desc';
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'private';
  shareAnalytics: boolean;
  allowDataExport: boolean;
}

export interface IntegrationSettings {
  linkedin: boolean;
  indeed: boolean;
  glassdoor: boolean;
  calendar: boolean;
  email: boolean;
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface JobApplicationForm {
  companyName: string;
  position: string;
  jobDescription?: string;
  applicationDate: string;
  status: ApplicationStatus;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: string;
  city: string;
  state?: string;
  country: string;
  remote: boolean;
  jobUrl?: string;
  source: JobSource;
  priority: Priority;
  notes: string;
  tags: string[];
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  status?: ApplicationStatus[];
  source?: JobSource[];
  priority?: Priority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  salaryRange?: {
    min: number;
    max: number;
  };
  location?: string[];
  tags?: string[];
  hasInterview?: boolean;
  hasOffer?: boolean;
}

export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}
