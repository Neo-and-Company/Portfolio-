import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  Users,
  BarChart3
} from 'lucide-react';
import { DashboardStats, ApplicationStatus } from '../../types';
import { useDashboardStats } from '../../hooks/useDashboardStats';
import StatsCard from './StatsCard';
import ApplicationChart from './ApplicationChart';
import StatusDistribution from './StatusDistribution';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

const DashboardOverview: React.FC = () => {
  const { stats, loading, error } = useDashboardStats();
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
        <p className="text-danger-800">Error loading dashboard: {error}</p>
      </div>
    );
  }

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your job search progress and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats?.totalApplications || 0}
          icon={<Briefcase className="h-6 w-6" />}
          trend={{ value: 12, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Active Applications"
          value={stats?.activeApplications || 0}
          icon={<Clock className="h-6 w-6" />}
          trend={{ value: 5, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Interviews Scheduled"
          value={stats?.interviewsScheduled || 0}
          icon={<Calendar className="h-6 w-6" />}
          trend={{ value: 8, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Offers Received"
          value={stats?.offersReceived || 0}
          icon={<Award className="h-6 w-6" />}
          trend={{ value: 2, isPositive: true }}
          color="orange"
        />
      </motion.div>

      {/* Secondary Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.responseRate ? `${stats.responseRate.toFixed(1)}%` : '0%'}
              </p>
            </div>
            <div className="p-3 bg-success-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-success-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats?.responseRate || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Response Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.averageResponseTime ? `${stats.averageResponseTime} days` : 'N/A'}
              </p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Clock className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Goal</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.monthlyGoals?.current || 0} / {stats?.monthlyGoals?.target || 0}
              </p>
            </div>
            <div className="p-3 bg-warning-100 rounded-full">
              <Target className="h-6 w-6 text-warning-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats?.monthlyGoals?.percentage || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <ApplicationChart 
            data={stats?.applicationTrends || []} 
            timeRange={selectedTimeRange}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatusDistribution 
            data={stats?.statusDistribution || []} 
          />
        </motion.div>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <RecentActivity />
        </motion.div>
        <motion.div variants={itemVariants}>
          <QuickActions />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardOverview;
