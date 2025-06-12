import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './useAuth';
import { JobApplication, JobApplicationForm, SearchFilters, SortOptions } from '../types';

export const useJobApplications = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get all applications for the current user
  const {
    data: applications = [],
    isLoading,
    error,
    refetch
  } = useQuery(
    ['applications', user?.uid],
    async () => {
      if (!user?.uid) return [];
      
      const applicationsRef = collection(db, 'applications');
      const q = query(
        applicationsRef,
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        applicationDate: doc.data().applicationDate?.toDate(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as JobApplication[];
    },
    {
      enabled: !!user?.uid,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Create new application
  const createApplicationMutation = useMutation(
    async (applicationData: Partial<JobApplicationForm>) => {
      if (!user?.uid) throw new Error('User not authenticated');

      const applicationsRef = collection(db, 'applications');
      const now = Timestamp.now();
      
      const newApplication = {
        ...applicationData,
        userId: user.uid,
        applicationDate: applicationData.applicationDate 
          ? Timestamp.fromDate(new Date(applicationData.applicationDate))
          : now,
        createdAt: now,
        updatedAt: now,
        contacts: [],
        documents: [],
        followUps: [],
        interviews: [],
      };

      const docRef = await addDoc(applicationsRef, newApplication);
      return { id: docRef.id, ...newApplication };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['applications', user?.uid]);
        queryClient.invalidateQueries(['dashboard-stats', user?.uid]);
      },
    }
  );

  // Update application
  const updateApplicationMutation = useMutation(
    async ({ id, data }: { id: string; data: Partial<JobApplicationForm> }) => {
      if (!user?.uid) throw new Error('User not authenticated');

      const applicationRef = doc(db, 'applications', id);
      const updateData = {
        ...data,
        updatedAt: Timestamp.now(),
        applicationDate: data.applicationDate 
          ? Timestamp.fromDate(new Date(data.applicationDate))
          : undefined,
      };

      await updateDoc(applicationRef, updateData);
      return { id, ...updateData };
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['applications', user?.uid]);
        queryClient.invalidateQueries(['dashboard-stats', user?.uid]);
      },
    }
  );

  // Delete application
  const deleteApplicationMutation = useMutation(
    async (id: string) => {
      if (!user?.uid) throw new Error('User not authenticated');

      const applicationRef = doc(db, 'applications', id);
      await deleteDoc(applicationRef);
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['applications', user?.uid]);
        queryClient.invalidateQueries(['dashboard-stats', user?.uid]);
      },
    }
  );

  // Get single application
  const getApplication = async (id: string): Promise<JobApplication | null> => {
    if (!user?.uid) return null;

    const applicationRef = doc(db, 'applications', id);
    const snapshot = await getDoc(applicationRef);
    
    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    return {
      id: snapshot.id,
      ...data,
      applicationDate: data.applicationDate?.toDate(),
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    } as JobApplication;
  };

  // Search and filter applications
  const searchApplications = async (
    filters: SearchFilters,
    sortOptions: SortOptions,
    pageSize: number = 20,
    lastDoc?: any
  ) => {
    if (!user?.uid) return { applications: [], hasMore: false };

    const applicationsRef = collection(db, 'applications');
    let q = query(
      applicationsRef,
      where('userId', '==', user.uid)
    );

    // Apply filters
    if (filters.status && filters.status.length > 0) {
      q = query(q, where('status', 'in', filters.status));
    }

    if (filters.source && filters.source.length > 0) {
      q = query(q, where('source', 'in', filters.source));
    }

    if (filters.priority && filters.priority.length > 0) {
      q = query(q, where('priority', 'in', filters.priority));
    }

    if (filters.dateRange) {
      q = query(
        q,
        where('applicationDate', '>=', Timestamp.fromDate(filters.dateRange.start)),
        where('applicationDate', '<=', Timestamp.fromDate(filters.dateRange.end))
      );
    }

    // Apply sorting
    q = query(q, orderBy(sortOptions.field, sortOptions.order));

    // Apply pagination
    q = query(q, limit(pageSize));
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const applications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      applicationDate: doc.data().applicationDate?.toDate(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as JobApplication[];

    return {
      applications,
      hasMore: snapshot.docs.length === pageSize,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  };

  // Get applications by status
  const getApplicationsByStatus = (status: string) => {
    return applications.filter(app => app.status === status);
  };

  // Get recent applications
  const getRecentApplications = (count: number = 5) => {
    return applications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, count);
  };

  // Get applications with upcoming interviews
  const getUpcomingInterviews = () => {
    const now = new Date();
    return applications
      .filter(app => 
        app.interviews && 
        app.interviews.some(interview => 
          new Date(interview.scheduledDate) > now && 
          interview.status === 'scheduled'
        )
      )
      .sort((a, b) => {
        const aNextInterview = a.interviews
          ?.filter(i => new Date(i.scheduledDate) > now && i.status === 'scheduled')
          .sort((x, y) => new Date(x.scheduledDate).getTime() - new Date(y.scheduledDate).getTime())[0];
        const bNextInterview = b.interviews
          ?.filter(i => new Date(i.scheduledDate) > now && i.status === 'scheduled')
          .sort((x, y) => new Date(x.scheduledDate).getTime() - new Date(y.scheduledDate).getTime())[0];
        
        if (!aNextInterview) return 1;
        if (!bNextInterview) return -1;
        
        return new Date(aNextInterview.scheduledDate).getTime() - new Date(bNextInterview.scheduledDate).getTime();
      });
  };

  return {
    // Data
    applications,
    isLoading,
    error,
    
    // Actions
    createApplication: createApplicationMutation.mutate,
    updateApplication: (id: string, data: Partial<JobApplicationForm>) => 
      updateApplicationMutation.mutate({ id, data }),
    deleteApplication: deleteApplicationMutation.mutate,
    getApplication,
    searchApplications,
    refetch,
    
    // Helpers
    getApplicationsByStatus,
    getRecentApplications,
    getUpcomingInterviews,
    
    // Loading states
    isCreating: createApplicationMutation.isLoading,
    isUpdating: updateApplicationMutation.isLoading,
    isDeleting: deleteApplicationMutation.isLoading,
  };
};
