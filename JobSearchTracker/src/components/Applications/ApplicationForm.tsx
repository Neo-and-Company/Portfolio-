import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { 
  Save, 
  X, 
  Upload, 
  Sparkles, 
  MapPin, 
  DollarSign,
  Calendar,
  Tag,
  Building2
} from 'lucide-react';
import { JobApplicationForm, ApplicationStatus, JobSource, Priority } from '../../types';
import { useJobApplications } from '../../hooks/useJobApplications';
import { useAI } from '../../hooks/useAI';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { toast } from 'react-hot-toast';

interface ApplicationFormProps {
  applicationId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  applicationId,
  onClose,
  onSuccess
}) => {
  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<JobApplicationForm>();
  const { createApplication, updateApplication, getApplication } = useJobApplications();
  const { analyzeJobDescription, generateCoverLetter } = useAI();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const watchedJobDescription = watch('jobDescription');
  const watchedCompanyName = watch('companyName');
  const watchedPosition = watch('position');

  // Status options
  const statusOptions = [
    { value: 'draft', label: 'Draft', color: '#6B7280' },
    { value: 'applied', label: 'Applied', color: '#3B82F6' },
    { value: 'under_review', label: 'Under Review', color: '#F59E0B' },
    { value: 'phone_screen', label: 'Phone Screen', color: '#8B5CF6' },
    { value: 'technical_interview', label: 'Technical Interview', color: '#EC4899' },
    { value: 'onsite_interview', label: 'Onsite Interview', color: '#10B981' },
    { value: 'final_interview', label: 'Final Interview', color: '#F97316' },
    { value: 'offer_received', label: 'Offer Received', color: '#22C55E' },
    { value: 'offer_accepted', label: 'Offer Accepted', color: '#16A34A' },
    { value: 'offer_declined', label: 'Offer Declined', color: '#DC2626' },
    { value: 'rejected', label: 'Rejected', color: '#EF4444' },
    { value: 'withdrawn', label: 'Withdrawn', color: '#6B7280' },
    { value: 'ghosted', label: 'Ghosted', color: '#9CA3AF' },
  ];

  const sourceOptions = [
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'indeed', label: 'Indeed' },
    { value: 'glassdoor', label: 'Glassdoor' },
    { value: 'company_website', label: 'Company Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'recruiter', label: 'Recruiter' },
    { value: 'job_board', label: 'Job Board' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', color: '#6B7280' },
    { value: 'medium', label: 'Medium', color: '#F59E0B' },
    { value: 'high', label: 'High', color: '#EF4444' },
    { value: 'urgent', label: 'Urgent', color: '#DC2626' },
  ];

  // Load existing application if editing
  useEffect(() => {
    if (applicationId) {
      const loadApplication = async () => {
        try {
          const application = await getApplication(applicationId);
          if (application) {
            // Populate form with existing data
            Object.keys(application).forEach(key => {
              setValue(key as any, application[key as keyof typeof application]);
            });
          }
        } catch (error) {
          toast.error('Failed to load application');
        }
      };
      loadApplication();
    }
  }, [applicationId, getApplication, setValue]);

  // AI Analysis
  const handleAIAnalysis = async () => {
    if (!watchedJobDescription) {
      toast.error('Please enter a job description first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeJobDescription(watchedJobDescription);
      setAiSuggestions(analysis);
      toast.success('AI analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze job description');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSubmit = async (data: JobApplicationForm) => {
    try {
      const applicationData = {
        ...data,
        applicationDate: new Date(data.applicationDate),
        tags: typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()) : data.tags,
        salaryRange: data.salaryMin && data.salaryMax ? {
          min: data.salaryMin,
          max: data.salaryMax,
          currency: data.salaryCurrency || 'USD'
        } : undefined,
        location: {
          city: data.city,
          state: data.state,
          country: data.country,
          remote: data.remote
        }
      };

      if (applicationId) {
        await updateApplication(applicationId, applicationData);
        toast.success('Application updated successfully!');
      } else {
        await createApplication(applicationData);
        toast.success('Application created successfully!');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Failed to save application');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {applicationId ? 'Edit Application' : 'New Job Application'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 className="h-4 w-4 inline mr-1" />
                Company Name *
              </label>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: 'Company name is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                )}
              />
              {errors.companyName && (
                <p className="text-danger-600 text-sm mt-1">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position Title *
              </label>
              <Controller
                name="position"
                control={control}
                rules={{ required: 'Position is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter position title"
                  />
                )}
              />
              {errors.position && (
                <p className="text-danger-600 text-sm mt-1">{errors.position.message}</p>
              )}
            </div>
          </div>

          {/* Job Description with AI Analysis */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <button
                type="button"
                onClick={handleAIAnalysis}
                disabled={isAnalyzing || !watchedJobDescription}
                className="flex items-center space-x-2 px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isAnalyzing ? 'Analyzing...' : 'AI Analysis'}</span>
              </button>
            </div>
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Paste the job description here for AI analysis..."
                />
              )}
            />
          </div>

          {/* AI Suggestions */}
          {aiSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary-50 border border-primary-200 rounded-lg p-4"
            >
              <h3 className="font-medium text-primary-900 mb-2">AI Analysis Results</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Skills Match:</span> {aiSuggestions.skillsMatch?.score}%
                </div>
                <div>
                  <span className="font-medium">Missing Skills:</span> {aiSuggestions.skillsMatch?.missing?.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Salary Estimate:</span> 
                  ${aiSuggestions.salaryEstimate?.min} - ${aiSuggestions.salaryEstimate?.max}
                </div>
              </div>
            </motion.div>
          )}

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <Controller
                name="status"
                control={control}
                rules={{ required: 'Status is required' }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={statusOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select status"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <Controller
                name="source"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={sourceOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select source"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={priorityOptions}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select priority"
                  />
                )}
              />
            </div>
          </div>

          {/* Application Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Application Date
              </label>
              <Controller
                name="applicationDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date?.toISOString().split('T')[0])}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholderText="Select date"
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job URL
              </label>
              <Controller
                name="jobUrl"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="url"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                )}
              />
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="h-4 w-4 inline mr-1" />
              Salary Range
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name="salaryMin"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Min salary"
                  />
                )}
              />
              <Controller
                name="salaryMax"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Max salary"
                  />
                )}
              />
              <Controller
                name="salaryCurrency"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                  </select>
                )}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 inline mr-1" />
              Location
            </label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="City"
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="State/Province"
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Country"
                  />
                )}
              />
              <div className="flex items-center">
                <Controller
                  name="remote"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Remote</span>
                    </label>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="h-4 w-4 inline mr-1" />
              Tags
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter tags separated by commas (e.g., frontend, react, remote)"
                />
              )}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Add any additional notes about this application..."
                />
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>{isSubmitting ? 'Saving...' : 'Save Application'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ApplicationForm;

// Custom styles for react-select
const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.5)' : 'none',
    '&:hover': {
      borderColor: '#3B82F6',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? '#3B82F6'
      : state.isFocused
      ? '#EBF4FF'
      : 'white',
    color: state.isSelected ? 'white' : '#1F2937',
  }),
};
