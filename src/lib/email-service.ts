// Email Service Configuration
// This file handles all email delivery for your portfolio

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface SubscriptionData {
  email: string;
  timestamp: string;
}

// =============================================================================
// OPTION 1: RESEND (Recommended - Professional & Reliable)
// =============================================================================
// Install: npm install resend
// Sign up at: https://resend.com (Free tier: 3,000 emails/month)

export async function sendContactEmailWithResend(data: ContactFormData) {
  try {
    // Uncomment and configure when you set up Resend
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data: emailData, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@yourdomain.com>', // Use your domain
      to: ['gabrielleolukotun@gmail.com'],
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, messageId: emailData?.id };
    */

    // Temporary fallback - remove when Resend is configured
    console.log('📧 CONTACT FORM - Would send via Resend:', data);
    return { success: true, messageId: 'dev-mode' };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// OPTION 2: EMAILJS (Easy Setup - No Backend Required)
// =============================================================================
// Sign up at: https://www.emailjs.com (Free tier: 200 emails/month)
// This runs in the browser and sends emails directly

export async function sendContactEmailWithEmailJS(data: ContactFormData) {
  try {
    // Uncomment and configure when you set up EmailJS
    /*
    const emailjs = require('@emailjs/browser');

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: 'gabrielleolukotun@gmail.com',
    };

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    return { success: true, messageId: result.text };
    */

    // Temporary fallback - remove when EmailJS is configured
    console.log('📧 CONTACT FORM - Would send via EmailJS:', data);
    return { success: true, messageId: 'dev-mode' };
  } catch (error) {
    console.error('EmailJS sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// OPTION 3: NODEMAILER (Full Control - Requires SMTP)
// =============================================================================
// Use with Gmail, Outlook, or any SMTP provider

export async function sendContactEmailWithNodemailer(data: ContactFormData) {
  try {
    // Uncomment and configure when you set up Nodemailer
    /*
    const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransporter({
      service: 'gmail', // or 'outlook', 'yahoo', etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_APP_PASSWORD, // App-specific password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'gabrielleolukotun@gmail.com',
      subject: `Portfolio Contact: ${data.name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
    */

    // Temporary fallback - remove when Nodemailer is configured
    console.log('📧 CONTACT FORM - Would send via Nodemailer:', data);
    return { success: true, messageId: 'dev-mode' };
  } catch (error) {
    console.error('Nodemailer sending failed:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

// =============================================================================
// EMAIL SUBSCRIPTION MANAGEMENT
// =============================================================================

export async function addEmailSubscription(email: string) {
  try {
    // Import your chosen storage method
    const { saveEmailSubscription } = await import('./local-storage');
    // Alternative options:
    // const { saveEmailSubscription } = await import('./database-storage');
    // const { saveSubscriptionToGoogleSheetsWebhook: saveEmailSubscription } = await import('./google-sheets-storage');

    const result = await saveEmailSubscription(email);

    if (!result.success) {
      return { success: false, error: result.error };
    }

    // OPTION: Also add to email marketing service
    /*
    // Example with Mailchimp, ConvertKit, etc.
    try {
      const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['portfolio-contact', 'employment-opportunities'],
        }),
      });

      if (!response.ok) {
        console.warn('Mailchimp subscription failed, but local storage succeeded');
      }
    } catch (marketingError) {
      console.warn('Email marketing service failed:', marketingError);
      // Don't fail the whole operation if marketing service fails
    }
    */

    return { success: true, data: { email, id: result.id } };
  } catch (error) {
    console.error('Subscription storage failed:', error);
    return { success: false, error: 'Failed to store subscription' };
  }
}

// =============================================================================
// EMAIL VALIDATION
// =============================================================================

export function validateEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function verifyEmailExists(email: string): Promise<boolean> {
  // Basic format check
  if (!validateEmailFormat(email)) {
    return false;
  }

  // You can integrate with email verification services like:
  // - Hunter.io
  // - ZeroBounce
  // - EmailListVerify

  // For now, we'll do basic validation
  const disposableEmailDomains = [
    '10minutemail.com',
    'tempmail.org',
    'guerrillamail.com',
    'mailinator.com',
  ];

  const domain = email.split('@')[1]?.toLowerCase();
  return !disposableEmailDomains.includes(domain);
}

// =============================================================================
// MAIN EMAIL SERVICE FUNCTION
// =============================================================================

export async function sendContactEmail(data: ContactFormData) {
  try {
    // First, save the contact to storage
    const { saveContactSubmission } = await import('./local-storage');
    // Alternative options:
    // const { saveContactSubmission } = await import('./database-storage');
    // const { saveContactToGoogleSheetsWebhook: saveContactSubmission } = await import('./google-sheets-storage');

    const storageResult = await saveContactSubmission(data);

    if (!storageResult.success) {
      console.warn('Contact storage failed:', storageResult.error);
      // Continue with email sending even if storage fails
    }

    // Then, send the email notification
    // Choose your preferred email service here:
    // return await sendContactEmailWithResend(data);
    // return await sendContactEmailWithEmailJS(data);
    const emailResult = await sendContactEmailWithNodemailer(data);

    // Return combined result
    return {
      success: emailResult.success,
      messageId: emailResult.messageId,
      storageId: storageResult.success ? storageResult.id : null,
      error: emailResult.error,
    };
  } catch (error) {
    console.error('Contact email processing failed:', error);
    return { success: false, error: 'Failed to process contact form' };
  }
}
