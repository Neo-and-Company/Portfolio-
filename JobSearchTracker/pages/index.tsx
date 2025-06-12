import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import DashboardOverview from '../src/components/Dashboard/DashboardOverview';
import { useAuth } from '../src/hooks/useAuth';
import LoginForm from '../src/components/Auth/LoginForm';

const HomePage: NextPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Head>
          <title>Job Search Tracker - Login</title>
          <meta name="description" content="Track your job applications with AI-powered insights" />
        </Head>
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Job Search Tracker - Dashboard</title>
        <meta name="description" content="Track your job applications with AI-powered insights" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardOverview />
    </>
  );
};

export default HomePage;
