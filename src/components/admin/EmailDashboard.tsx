"use client";

import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUsers, FaEye, FaDownload } from 'react-icons/fa';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface EmailSubscription {
  id: string;
  email: string;
  timestamp: string;
  source: string;
}

const EmailDashboard: React.FC = () => {
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [activeTab, setActiveTab] = useState<'contacts' | 'subscriptions'>('contacts');

  // Mock data for demonstration - replace with real data fetching
  useEffect(() => {
    // This would normally fetch from your database/API
    const mockContacts: ContactSubmission[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@techcorp.com',
        message: 'Hi! We\'re looking for a data scientist to join our team. Would love to discuss opportunities.',
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@startup.io',
        message: 'Interested in partnering on a machine learning project. Let\'s connect!',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        read: true,
      },
    ];

    const mockSubscriptions: EmailSubscription[] = [
      {
        id: '1',
        email: 'investor@vc.com',
        timestamp: new Date().toISOString(),
        source: 'Portfolio Newsletter',
      },
      {
        id: '2',
        email: 'recruiter@bigtech.com',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        source: 'Portfolio Newsletter',
      },
    ];

    setContactSubmissions(mockContacts);
    setEmailSubscriptions(mockSubscriptions);
  }, []);

  const markAsRead = (id: string) => {
    setContactSubmissions(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, read: true } : contact
      )
    );
  };

  const exportData = (type: 'contacts' | 'subscriptions') => {
    const data = type === 'contacts' ? contactSubmissions : emailSubscriptions;
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${type}_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          📧 Email Dashboard
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
          Manage your portfolio contact forms and email subscriptions
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaEnvelope style={{ color: '#3b82f6', fontSize: '24px' }} />
            <div>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                {contactSubmissions.length}
              </p>
              <p style={{ color: '#6b7280', margin: 0 }}>Contact Forms</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaUsers style={{ color: '#10b981', fontSize: '24px' }} />
            <div>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                {emailSubscriptions.length}
              </p>
              <p style={{ color: '#6b7280', margin: 0 }}>Email Subscribers</p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FaEye style={{ color: '#f59e0b', fontSize: '24px' }} />
            <div>
              <p style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                {contactSubmissions.filter(c => !c.read).length}
              </p>
              <p style={{ color: '#6b7280', margin: 0 }}>Unread Messages</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'contacts' ? '#3b82f6' : '#6b7280',
              borderBottom: activeTab === 'contacts' ? '2px solid #3b82f6' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Contact Forms ({contactSubmissions.length})
          </button>
          <button
            onClick={() => setActiveTab('subscriptions')}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === 'subscriptions' ? '#3b82f6' : '#6b7280',
              borderBottom: activeTab === 'subscriptions' ? '2px solid #3b82f6' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Email Subscriptions ({emailSubscriptions.length})
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'contacts' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              Contact Form Submissions
            </h2>
            <button
              onClick={() => exportData('contacts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <FaDownload /> Export
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {contactSubmissions.map((contact) => (
              <div
                key={contact.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: `1px solid ${contact.read ? '#e5e7eb' : '#3b82f6'}`,
                  position: 'relative'
                }}
              >
                {!contact.read && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#3b82f6',
                    borderRadius: '50%'
                  }} />
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                      {contact.name}
                    </h3>
                    <p style={{ color: '#6b7280', margin: '0 0 4px 0' }}>{contact.email}</p>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                      {formatDate(contact.timestamp)}
                    </p>
                  </div>
                  {!contact.read && (
                    <button
                      onClick={() => markAsRead(contact.id)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#10b981',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
                
                <div style={{
                  backgroundColor: '#f8fafc',
                  padding: '16px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #3b82f6'
                }}>
                  <p style={{ margin: 0, lineHeight: '1.6', color: '#374151' }}>
                    {contact.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
              Email Subscriptions
            </h2>
            <button
              onClick={() => exportData('subscriptions')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.875rem'
              }}
            >
              <FaDownload /> Export
            </button>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Email</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Source</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {emailSubscriptions.map((subscription, index) => (
                  <tr key={subscription.id} style={{ borderTop: index > 0 ? '1px solid #e5e7eb' : 'none' }}>
                    <td style={{ padding: '16px', color: '#374151' }}>{subscription.email}</td>
                    <td style={{ padding: '16px', color: '#6b7280' }}>{subscription.source}</td>
                    <td style={{ padding: '16px', color: '#6b7280' }}>{formatDate(subscription.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div style={{
        marginTop: '48px',
        padding: '24px',
        backgroundColor: '#fef3c7',
        borderRadius: '12px',
        border: '1px solid #f59e0b'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#92400e', margin: '0 0 12px 0' }}>
          📋 Setup Instructions
        </h3>
        <p style={{ color: '#92400e', margin: '0 0 12px 0' }}>
          This is a demo dashboard. To see real data:
        </p>
        <ol style={{ color: '#92400e', margin: 0, paddingLeft: '20px' }}>
          <li>Set up email delivery (see EMAIL_SETUP_GUIDE.md)</li>
          <li>Connect to a database to store submissions</li>
          <li>Replace mock data with real API calls</li>
          <li>Add authentication to protect this dashboard</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailDashboard;
